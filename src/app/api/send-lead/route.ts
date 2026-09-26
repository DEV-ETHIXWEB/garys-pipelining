import { NextRequest, NextResponse } from "next/server";
import { validateAttachment } from "@/lib/mail/attachment";
import { leadPayloadSchema, SOURCE_LABELS } from "@/lib/mail/lead-schema";
import { sanitizeHeaderValue } from "@/lib/mail/sanitize";
import { MailNotConfiguredError, sendLeadEmails } from "@/lib/mail/send";
import { assessLead } from "@/lib/mail/spam";
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
    return NextResponse.json({ success: true });
  }

  // Scored content/behaviour check (see src/lib/mail/spam.ts). Obvious junk is
  // dropped silently; borderline leads are delivered but flagged "[Review]".
  // Logs carry the reasons and IP, never the submitted content.
  const verdict = assessLead(data);
  if (verdict.action === "drop") {
    console.warn(
      `[send-lead] Dropped spam ip=${ip} source=${data.source} score=${verdict.score} reasons=${JSON.stringify(verdict.reasons)}`,
    );
    return NextResponse.json({ success: true });
  }
  if (verdict.action === "review") {
    console.info(
      `[send-lead] Flagged for review ip=${ip} source=${data.source} score=${verdict.score} reasons=${JSON.stringify(verdict.reasons)}`,
    );
  }

  // Rate limiting only counts submissions that got past the honeypot and spam
  // checks, so bot traffic can't use up the quota of real customers who share
  // its IP (offices, apartment wifi).
  const rate = checkRateLimit(`lead:${ip}`, { windowMs: 10 * 60_000, max: 6 });
  const dailyRate = checkRateLimit(`lead-day:${ip}`, { windowMs: 24 * 60 * 60_000, max: 15 });
  const blocked = !rate.allowed ? rate : !dailyRate.allowed ? dailyRate : null;
  if (blocked) {
    return jsonError("Too many requests. Please try again in a few minutes.", 429, {
      "Retry-After": String(blocked.retryAfterSeconds),
    });
  }

  // Turnstile is an additional layer on top of the honeypot/rate-limit/spam
  // checks above, not a replacement for any of them. `turnstileToken` isn't
  // part of leadPayloadSchema (that schema is shared by every lead source),
  // so it's read directly off the raw, not-yet-validated body.
  //
  // The chatbot is exempt: it's a multi-turn conversational flow with no
  // natural place for a checkbox widget, and it's already covered by the
  // honeypot/rate-limit/spam checks above. Every form-based source (estimate,
  // partnership, and any future contact/careers form) still requires a
  // verified token.
  if (data.source !== "chatbot") {
    const turnstileToken =
      typeof rawBody === "object" && rawBody !== null && "turnstileToken" in rawBody
        ? (rawBody as { turnstileToken?: unknown }).turnstileToken
        : undefined;
    const turnstile = await verifyTurnstile(turnstileToken, request);
    if (!turnstile.ok) {
      if (turnstile.reason === "not_configured") {
        return jsonError("Submissions are temporarily unavailable. Please try again later.", 503);
      }
      return jsonError("Verification failed. Please try again.", 403);
    }
  }

  // The same person (or bot) resubmitting the same contact details shouldn't
  // produce a fresh email each time. Report success so a real customer who
  // double-clicked isn't confused, but don't send again.
  const contactKey = (data.email || "").toLowerCase() || (data.phone || "").replace(/\D/g, "");
  const contactBucket = contactKey ? `lead-contact:${contactKey}` : null;
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
    spamFlags: verdict.action === "review" ? verdict.reasons : undefined,
  };

  try {
    const result = await sendLeadEmails(normalized);
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
