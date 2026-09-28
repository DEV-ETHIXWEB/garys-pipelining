import { NextRequest, NextResponse } from "next/server";
import { validateAttachment } from "@/lib/mail/attachment";
import { leadPayloadSchema, SOURCE_LABELS } from "@/lib/mail/lead-schema";
import { sanitizeHeaderValue } from "@/lib/mail/sanitize";
import { MailNotConfiguredError, sendLeadEmails } from "@/lib/mail/send";
import { contactIdentity, isBlocked } from "@/lib/mail/identity";
import { assessLead, type SpamVerdict } from "@/lib/mail/spam";
import type { LeadAttachment, NormalizedLead } from "@/lib/mail/types";
import { checkRateLimit, getClientIp, refundRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

// Every lead source on the site (Estimate, Contact, Contractor Partnership,
// Careers, and the chatbot) POSTs here. This is the only place that talks to
// SMTP, so validation, sanitization, spam filtering, and rate limiting only
// ever need to be written once.
export const runtime = "nodejs";
// Two sequential SMTP sends (admin, then customer) against the timeouts set
// in transport.ts can take up to ~25s in the worst case; this keeps Vercel
// from killing the function before that resolves. Within Hobby plan limits.
export const maxDuration = 30;

function jsonError(message: string, status: number, extraHeaders?: HeadersInit) {
  return NextResponse.json({ success: false, message }, { status, headers: extraHeaders });
}

/**
 * Every rejection path answers the visitor identically, so a bot learns nothing
 * about which rule caught it and a wrongly flagged customer still sees the
 * normal thank-you screen.
 */
function silentSuccess() {
  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  let rawBody: unknown;
  // Validated by name/size up front, but only read into memory once the
  // submission has passed every check below, so junk posts can't make us
  // buffer files.
  let pendingFile: File | undefined;

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const payloadRaw = form.get("payload");
      if (typeof payloadRaw !== "string") {
        return jsonError("Missing form payload.", 400);
      }
      rawBody = JSON.parse(payloadRaw);

      const file = form.get("attachment");
      if (file instanceof File && file.size > 0) {
        const check = validateAttachment(file.name, file.size);
        if (!check.ok) return jsonError(check.message, 400);
        pendingFile = file;
      }
    } else {
      rawBody = await request.json();
    }
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const parsed = leadPayloadSchema.safeParse(rawBody);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "That submission didn't look right.";
    return jsonError(message, 400);
  }
  const data = parsed.data;

  const ip = getClientIp(request);

  // Honeypots: real visitors never see or fill these fields. Report success
  // without sending anything so bots get no signal they were caught.
  if (data.botcheck || (data.hp && data.hp.trim())) {
    console.warn(`[send-lead] Honeypot filled ip=${ip} source=${data.source}`);
    return silentSuccess();
  }

  // Manual block list (LEAD_BLOCKLIST): a specific repeat offender, by email,
  // phone or IP. Gmail dots and plus-tags are normalised, so one spelling
  // blocks every variant of the same inbox.
  if (isBlocked([data.email, data.phone, ip])) {
    console.warn(`[send-lead] Blocked sender ip=${ip} source=${data.source}`);
    return silentSuccess();
  }

  // Scored content/behaviour check (see src/lib/mail/spam.ts). Obvious junk is
  // dropped silently; borderline leads are delivered but flagged "[Review]".
  // Logs carry the reasons and IP, never the submitted content.
  //
  // Run first on content alone: junk gets dropped without spending a network
  // round-trip on Cloudflare, and Turnstile only gets asked about submissions
  // that might be real.
  // Has this exact inbox or phone just submitted? Checked before scoring so it
  // can feed in, and recorded whatever the outcome, so a bot spraying Gmail dot
  // variants is recognised on its second attempt.
  const identity = contactIdentity(data);
  const seenRecently = identity
    ? !checkRateLimit(`lead-identity:${identity}`, { windowMs: 30 * 60_000, max: 1 }).allowed
    : false;

  let verdict: SpamVerdict = assessLead({ ...data, seenRecently });
  let quarantined = verdict.action === "quarantine";
  // Turnstile is an additional layer on top of the honeypot/rate-limit/spam
  // checks above, not a replacement for any of them. `turnstileToken` isn't
  // part of leadPayloadSchema (that schema is shared by every lead source),
  // so it's read directly off the raw, not-yet-validated body.
  //
  // The chatbot is exempt: it's a multi-turn conversational flow with no
  // natural place for a checkbox widget, and it's already covered by the
  // honeypot/rate-limit/spam checks above.
  //
  // A form submission that doesn't verify is NOT rejected. Turnstile breaks for
  // real visitors for reasons they can't do anything about (a hostname missing
  // from the widget's allow-list, a Cloudflare incident, an extension or
  // network blocking the script), and a plumbing emergency that can't reach the
  // company is worse than one more junk email. Such leads are instead scored as
  // unverified, which flags them "[Review]", and held to a tighter rate limit.
  if (data.source !== "chatbot") {
    const turnstileToken =
      typeof rawBody === "object" && rawBody !== null && "turnstileToken" in rawBody
        ? (rawBody as { turnstileToken?: unknown }).turnstileToken
        : undefined;
    const turnstile = await verifyTurnstile(turnstileToken, request);
    if (!turnstile.ok) {
      console.warn(`[send-lead] Turnstile did not verify ip=${ip} source=${data.source} reason=${turnstile.reason}`);
      // Re-score with the missing verification counted in: clearly junk content
      // paired with no token is dropped, a clean-looking lead is flagged.
      verdict = assessLead({ ...data, seenRecently, unverified: true });
      quarantined = verdict.action === "quarantine";
      // Tight per-IP cap so an unverified endpoint can't be used as a firehose.
      const unverifiedRate = checkRateLimit(`lead-unverified:${ip}`, { windowMs: 60 * 60_000, max: 3 });
      if (!unverifiedRate.allowed) {
        return jsonError("Too many requests. Please try again in a few minutes.", 429, {
          "Retry-After": String(unverifiedRate.retryAfterSeconds),
        });
      }
    }
  }

  if (quarantined) {
    console.warn(
      `[send-lead] Quarantined ip=${ip} source=${data.source} score=${verdict.score} reasons=${JSON.stringify(verdict.reasons)}`,
    );
  } else if (verdict.action === "review") {
    console.info(
      `[send-lead] Flagged for review ip=${ip} source=${data.source} score=${verdict.score} reasons=${JSON.stringify(verdict.reasons)}`,
    );
  }

  // Rate limiting only counts submissions that got past the honeypot and spam
  // checks, so bot traffic can't use up the quota of real customers who share
  // its IP (offices, apartment wifi). Quarantined leads skip the limiter
  // entirely: they never reach the client, and they must not eat the quota of
  // a real customer on the same network.
  const rate = quarantined ? { allowed: true as const } : checkRateLimit(`lead:${ip}`, { windowMs: 60 * 60_000, max: 3 });
  const dailyRate = quarantined ? { allowed: true as const } : checkRateLimit(`lead-day:${ip}`, { windowMs: 24 * 60 * 60_000, max: 15 });
  const blocked = !rate.allowed ? rate : !dailyRate.allowed ? dailyRate : null;
  if (blocked) {
    return jsonError("Too many requests. Please try again in a few minutes.", 429, {
      "Retry-After": String(blocked.retryAfterSeconds),
    });
  }

  // The same person (or bot) resubmitting the same contact details shouldn't
  // produce a fresh email each time. Report success so a real customer who
  // double-clicked isn't confused, but don't send again.
  const contactBucket = identity && !quarantined ? `lead-contact:${identity}` : null;
  if (contactBucket) {
    const repeat = checkRateLimit(contactBucket, { windowMs: 60 * 60_000, max: 3 });
    if (!repeat.allowed) {
      console.info(`[send-lead] Ignored repeat submission for the same contact ip=${ip} source=${data.source}`);
      return NextResponse.json({ success: true });
    }
  }

  let attachment: LeadAttachment | undefined;
  if (pendingFile) {
    attachment = {
      filename: pendingFile.name,
      content: Buffer.from(await pendingFile.arrayBuffer()),
      contentType: pendingFile.type || "application/octet-stream",
    };
  }

  const normalized: NormalizedLead = {
    source: data.source,
    sourceLabel: SOURCE_LABELS[data.source],
    name: sanitizeHeaderValue(data.name),
    email: data.email || undefined,
    phone: data.phone ? sanitizeHeaderValue(data.phone) : undefined,
    fields: data.fields
      .map((f) => ({ label: sanitizeHeaderValue(f.label), value: f.value.trim() }))
      .filter((f) => f.value.length > 0),
    transcript: data.transcript,
    urgent: data.urgent,
    pageUrl: data.pageUrl || undefined,
    submittedAt: new Date(),
    attachment,
    spamFlags: verdict.action === "allow" ? undefined : verdict.reasons,
    quarantined,
  };

  try {
    const result = await sendLeadEmails(normalized);
    // Quarantined leads answer exactly like accepted ones.
    return NextResponse.json({ success: true, customerEmailSent: result.customer });
  } catch (err) {
    // The lead never went out, so don't let this attempt count against the
    // customer's retry.
    if (contactBucket) refundRateLimit(contactBucket);
    if (err instanceof MailNotConfiguredError) {
      console.error(`[send-lead] ${err.message}`);
      return jsonError("Email delivery isn't configured yet. Please call us instead.", 503);
    }
    console.error("[send-lead] Failed to send lead email", err);
    return jsonError("Something went wrong sending your request. Please call us instead.", 502);
  }
}
