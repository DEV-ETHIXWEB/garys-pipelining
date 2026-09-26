import { mailBrand } from "./brand";
import { escapeAndBreak, escapeHtml } from "./sanitize";
import type { NormalizedLead } from "./types";

type RenderedEmail = { subject: string; html: string; text: string };

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Los_Angeles",
  }).format(date) + " PT";
}

function emailShell({ preheader, bodyHtml }: { preheader: string; bodyHtml: string }): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${escapeHtml(mailBrand.companyName)}</title>
    <style>
      @media (max-width: 620px) {
        .container { width: 100% !important; }
        .px { padding-left: 20px !important; padding-right: 20px !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#f2f4f8; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f8; padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:100%; background-color:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 2px 12px rgba(15,23,42,0.08);">
            <tr>
              <td class="px" style="background:linear-gradient(135deg, ${mailBrand.primaryColor}, ${mailBrand.primaryDeepColor}); padding:28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="middle">
                      <img src="${escapeHtml(mailBrand.logoSrc)}" alt="${escapeHtml(mailBrand.companyName)}" height="72" style="height:72px; display:block;" />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td height="4" style="background-color:${mailBrand.accentColor}; line-height:4px; font-size:1px;">&nbsp;</td>
            </tr>
            <tr>
              <td class="px" style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td class="px" style="padding:24px 32px; background-color:#f8fafc; border-top:1px solid #e5e9f0;">
                <p style="margin:0 0 4px; font-size:12px; line-height:1.6; color:#64748b;">${escapeHtml(mailBrand.companyName)} &middot; ${escapeHtml(mailBrand.address)}</p>
                <p style="margin:0; font-size:12px; line-height:1.6; color:#64748b;">${escapeHtml(mailBrand.phone)} &middot; ${escapeHtml(mailBrand.email)} &middot; ${escapeHtml(mailBrand.hours)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function pill(label: string, color: string): string {
  return `<span style="display:inline-block; padding:4px 12px; border-radius:999px; background-color:${color}1a; color:${color}; font-size:12px; font-weight:600; letter-spacing:0.02em;">${escapeHtml(label)}</span>`;
}

function contactRow(label: string, value: string, href?: string): string {
  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:${mailBrand.primaryColor}; text-decoration:none; font-weight:600;">${escapeHtml(value)}</a>`
    : `<span style="font-weight:600; color:#0f172a;">${escapeHtml(value)}</span>`;
  return `
    <tr>
      <td style="padding:6px 0; font-size:13px; color:#64748b; width:90px; vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:6px 0; font-size:14px;">${content}</td>
    </tr>`;
}

function fieldsTable(fields: { label: string; value: string }[]): string {
  if (fields.length === 0) return "";
  const rows = fields
    .map(
      (f) => `
    <tr>
      <td style="padding:10px 0; border-top:1px solid #eef1f6; font-size:13px; color:#64748b; width:170px; vertical-align:top;">${escapeHtml(f.label)}</td>
      <td style="padding:10px 0; border-top:1px solid #eef1f6; font-size:14px; color:#0f172a;">${escapeAndBreak(f.value)}</td>
    </tr>`
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">${rows}</table>`;
}

function transcriptBlock(transcript: NormalizedLead["transcript"]): string {
  if (!transcript || transcript.length === 0) return "";
  const bubbles = transcript
    .map((m) => {
      const isUser = m.from === "user";
      return `
      <tr>
        <td style="padding:4px 0;">
          <div style="display:inline-block; max-width:85%; padding:8px 14px; border-radius:14px; font-size:13px; line-height:1.5; ${
            isUser
              ? `background-color:${mailBrand.primaryColor}; color:#ffffff;`
              : "background-color:#f1f5f9; color:#0f172a;"
          }">
            <strong style="display:block; font-size:10px; text-transform:uppercase; letter-spacing:0.04em; opacity:0.7; margin-bottom:2px;">${isUser ? "Visitor" : "Assistant"}</strong>
            ${escapeAndBreak(m.text)}
          </div>
        </td>
      </tr>`;
    })
    .join("");
  return `
    <h3 style="margin:24px 0 8px; font-size:13px; text-transform:uppercase; letter-spacing:0.04em; color:#64748b;">Conversation transcript</h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${bubbles}</table>`;
}

export function renderAdminLeadEmail(lead: NormalizedLead): RenderedEmail {
  const flagged = lead.spamFlags && lead.spamFlags.length > 0;
  // Stable prefix so a single mail filter (subject:"[Review]") can label or archive these.
  const subject = `${flagged ? "[Review] " : ""}${lead.urgent ? "URGENT: " : ""}New ${lead.sourceLabel.toLowerCase()} from ${lead.name}`;

  const spamBanner = flagged
    ? `<div style="margin-bottom:16px; padding:10px 12px; border-radius:8px; background-color:#fef3c7; color:#92400e; font-size:13px; line-height:1.5;"><strong>Possible spam, please review before calling.</strong> ${escapeHtml(
        (lead.spamFlags ?? []).join("; "),
      )}. No confirmation email was sent to the customer.</div>`
    : "";

  const bodyHtml = `
    ${spamBanner}
    <div style="margin-bottom:20px;">
      ${pill(lead.sourceLabel, mailBrand.primaryColor)}
      ${lead.urgent ? ` ${pill("Urgent", "#dc2626")}` : ""}
    </div>
    <h1 style="margin:0 0 4px; font-size:20px; color:#0f172a;"><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background-color:${mailBrand.accentColor}; margin-right:8px;">&nbsp;</span>New lead: ${escapeHtml(lead.name)}</h1>
    <p style="margin:0 0 20px; font-size:13px; color:#64748b;">Submitted ${escapeHtml(formatTimestamp(lead.submittedAt))}${
      lead.pageUrl ? ` from <span style="word-break:break-all;">${escapeHtml(lead.pageUrl)}</span>` : ""
    }</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
      ${lead.phone ? contactRow("Phone", lead.phone, `tel:${lead.phone.replace(/[^\d+]/g, "")}`) : ""}
      ${lead.email ? contactRow("Email", lead.email, `mailto:${lead.email}`) : ""}
    </table>
    ${fieldsTable(lead.fields)}
    ${transcriptBlock(lead.transcript)}
  `;

  const textLines = [
    flagged ? `POSSIBLE SPAM, please review: ${(lead.spamFlags ?? []).join("; ")}` : "",
    `New ${lead.sourceLabel}${lead.urgent ? " (URGENT)" : ""}`,
    `Name: ${lead.name}`,
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.email ? `Email: ${lead.email}` : "",
    lead.pageUrl ? `Page: ${lead.pageUrl}` : "",
    `Submitted: ${formatTimestamp(lead.submittedAt)}`,
    "",
    ...lead.fields.map((f) => `${f.label}: ${f.value}`),
    ...(lead.transcript && lead.transcript.length > 0
      ? ["", "Transcript:", ...lead.transcript.map((m) => `${m.from === "user" ? "Visitor" : "Assistant"}: ${m.text}`)]
      : []),
  ].filter(Boolean);

  return { subject, html: emailShell({ preheader: `New ${lead.sourceLabel.toLowerCase()} from ${lead.name}`, bodyHtml }), text: textLines.join("\n") };
}

const CONFIRMATION_COPY: Record<NormalizedLead["source"], { subject: string; heading: string; body: string }> = {
  estimate: {
    subject: `We got your request, ${"{{name}}"}`,
    heading: "Thanks, we've got it.",
    body: `We've received your estimate request and typically respond within one business hour during business hours. If this is urgent, call us any time, day or night.`,
  },
  contact: {
    subject: `We got your message, ${"{{name}}"}`,
    heading: "Thanks for reaching out.",
    body: `We've received your message and someone will get back to you shortly. If this is urgent, call us any time, day or night.`,
  },
  partnership: {
    subject: `We got your partnership request, ${"{{name}}"}`,
    heading: "Thanks for your interest in partnering with us.",
    body: `We've received your partnership request and a member of our team will reach out within one business day.`,
  },
  careers: {
    subject: `We got your application, ${"{{name}}"}`,
    heading: "Thanks for applying.",
    body: `We've received your application and our team will review it and follow up if it looks like a good fit.`,
  },
  chatbot: {
    subject: `Thanks for chatting with us, ${"{{name}}"}`,
    heading: "Great chatting with you.",
    body: `Here's a copy of what you shared. A member of our team will follow up shortly. If this is urgent, call us any time, day or night.`,
  },
};

export function renderCustomerConfirmationEmail(lead: NormalizedLead): RenderedEmail {
  const copy = CONFIRMATION_COPY[lead.source];
  const firstName = lead.name.split(" ")[0] || lead.name;
  const subject = copy.subject.replace("{{name}}", firstName);

  const recapFields = [
    lead.phone ? { label: "Phone", value: lead.phone } : null,
    lead.email ? { label: "Email", value: lead.email } : null,
    ...lead.fields,
  ].filter((f): f is { label: string; value: string } => Boolean(f));

  const bodyHtml = `
    <h1 style="margin:0 0 12px; font-size:22px; color:#0f172a;">${escapeHtml(copy.heading)}</h1>
    <p style="margin:0 0 20px; font-size:15px; line-height:1.6; color:#334155;">Hi ${escapeHtml(firstName)}, ${escapeHtml(copy.body)}</p>
    ${fieldsTable(recapFields)}
    <div style="margin-top:28px;">
      <a href="${escapeHtml(mailBrand.phoneHref)}" style="display:inline-block; padding:11px 21px; border-radius:999px; border:2px solid ${mailBrand.accentColor}; background-color:${mailBrand.primaryColor}; color:#ffffff; font-size:14px; font-weight:600; text-decoration:none;">Call ${escapeHtml(mailBrand.phone)}</a>
    </div>
  `;

  const text = [
    copy.heading,
    `Hi ${firstName}, ${copy.body}`,
    "",
    ...recapFields.map((f) => `${f.label}: ${f.value}`),
    "",
    `Call us: ${mailBrand.phone}`,
  ].join("\n");

  return { subject, html: emailShell({ preheader: copy.heading, bodyHtml }), text };
}
