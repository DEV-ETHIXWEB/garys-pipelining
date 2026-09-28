/**
 * Turns the contact details on a lead into a stable key, so the same person
 * (or the same bot wearing different addresses) is recognised across
 * submissions.
 *
 * Gmail ignores dots and anything after a "+", so c.t.f.u.n@gmail.com,
 * ctfun.n@gmail.com and ctfun+quote@gmail.com are all one inbox. Bots vary the
 * dots to look like new people. Other providers are left alone, because there
 * dots are significant and stripping them would merge two real customers.
 */
const GMAIL_DOMAINS = new Set(["gmail.com", "googlemail.com"]);

export function normalizeEmail(email: string | undefined | null): string {
  const trimmed = (email ?? "").trim().toLowerCase();
  const at = trimmed.lastIndexOf("@");
  if (at <= 0) return trimmed;

  let local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);

  const plus = local.indexOf("+");
  if (plus > 0) local = local.slice(0, plus);
  if (GMAIL_DOMAINS.has(domain)) local = local.replace(/\./g, "");

  return `${local}@${domain}`;
}

/** Digits only, so "(206) 535-8460" and "206-535-8460" are the same number. */
export function normalizePhone(phone: string | undefined | null): string {
  return (phone ?? "").replace(/\D/g, "");
}

/**
 * The key used for repeat detection and the manual block list. Prefers the
 * normalised email, falls back to the phone.
 */
export function contactIdentity(lead: { email?: string | null; phone?: string | null }): string {
  return normalizeEmail(lead.email) || normalizePhone(lead.phone);
}

/**
 * Manual block list, set as LEAD_BLOCKLIST: a comma-separated list of email
 * addresses, phone numbers, or IPs. Entries are compared after the same
 * normalisation, so listing one spelling of a Gmail address blocks them all.
 */
export function isBlocked(values: Array<string | undefined | null>): boolean {
  const raw = process.env.LEAD_BLOCKLIST;
  if (!raw) return false;

  const blocked = new Set(
    raw
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => (entry.includes("@") ? normalizeEmail(entry) : /^[\d+\-() .]+$/.test(entry) ? normalizePhone(entry) : entry.toLowerCase())),
  );
  if (blocked.size === 0) return false;

  return values.some((value) => {
    if (!value) return false;
    const v = value.trim();
    if (!v) return false;
    return (
      blocked.has(v.toLowerCase()) ||
      (v.includes("@") && blocked.has(normalizeEmail(v))) ||
      (normalizePhone(v).length >= 7 && blocked.has(normalizePhone(v)))
    );
  });
}
