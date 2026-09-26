import { LOGO_CID, mailBrand } from "./brand";
import { LOGO_EMAIL_PNG_BASE64 } from "./logo-asset";
import { renderAdminLeadEmail, renderCustomerConfirmationEmail } from "./templates";
import { getTransporter, isMailConfigured } from "./transport";
import type { NormalizedLead } from "./types";

type MailAttachment = { filename: string; content: Buffer; contentType: string; cid?: string };

/** The logo ships as a base64 JS constant (see logo-asset.ts), not a runtime fs read: Vercel's serverless functions don't reliably expose public/ on disk to route handlers. */
function getLogoAttachment(): MailAttachment | null {
  if (mailBrand.logoSrc !== `cid:${LOGO_CID}`) return null; // a remote MAIL_BRAND_LOGO_URL is in use instead
  return { filename: "logo.png", content: Buffer.from(LOGO_EMAIL_PNG_BASE64, "base64"), contentType: "image/png", cid: LOGO_CID };
}

export class MailNotConfiguredError extends Error {
  constructor() {
    super("SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and MAIL_TO.");
    this.name = "MailNotConfiguredError";
  }
}

function resolveFromAddress(): string {
  const configured = process.env.MAIL_FROM;
  if (!configured) {
    const host = (() => {
      try {
        return new URL(mailBrand.siteUrl).hostname;
      } catch {
        return "example.com";
      }
    })();
    return `"${mailBrand.companyName}" <no-reply@${host}>`;
  }
  // Allow either a bare address ("leads@x.com") or a pre-formatted
  // "Name <leads@x.com>", only wrap it with the brand name if it's bare.
  return /<.+>/.test(configured) ? configured : `"${mailBrand.companyName}" <${configured}>`;
}

export type SendLeadEmailsResult = { admin: true; customer: boolean };

export async function sendLeadEmails(lead: NormalizedLead): Promise<SendLeadEmailsResult> {
  if (!isMailConfigured()) {
    throw new MailNotConfiguredError();
  }
  const mailTo = process.env.MAIL_TO;
  if (!mailTo) {
    throw new MailNotConfiguredError();
  }
  const mailBcc = process.env.MAIL_BCC;

  const transporter = getTransporter();
  const from = resolveFromAddress();
  const logoAttachment = getLogoAttachment();

  const admin = renderAdminLeadEmail(lead);
  await transporter.sendMail({
    from,
    to: mailTo,
    bcc: mailBcc || undefined,
    replyTo: lead.email || undefined,
    subject: admin.subject,
    html: admin.html,
    text: admin.text,
    attachments: [
      ...(logoAttachment ? [logoAttachment] : []),
      ...(lead.attachment
        ? [{ filename: lead.attachment.filename, content: lead.attachment.content, contentType: lead.attachment.contentType }]
        : []),
    ],
  });

  let customerSent = false;
  // Never send a confirmation to an address on a lead the spam filter doubts:
  // spam bots submit real people's addresses, and mailing strangers from the
  // company domain damages its sender reputation for the real emails.
  const suspicious = Boolean(lead.spamFlags && lead.spamFlags.length > 0);
  if (lead.email && !suspicious) {
    try {
      const customer = renderCustomerConfirmationEmail(lead);
      await transporter.sendMail({
        from,
        to: lead.email,
        replyTo: mailBrand.email,
        subject: customer.subject,
        html: customer.html,
        text: customer.text,
        attachments: logoAttachment ? [logoAttachment] : undefined,
      });
      customerSent = true;
    } catch (err) {
      // The admin already has the lead at this point; a failed courtesy
      // confirmation to the customer shouldn't make the whole request fail.
      console.error("[send-lead] Failed to send customer confirmation email", err);
    }
  }

  return { admin: true, customer: customerSent };
}
