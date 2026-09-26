// Thin client for POST /api/send-lead, the one place every form and the
// chatbot go through to reach SMTP. See src/app/api/send-lead/route.ts and
// src/lib/mail/ for the server side.
export type LeadSource = "estimate" | "contact" | "partnership" | "careers" | "chatbot";

export type LeadField = { label: string; value: string };
export type TranscriptMessage = { from: "bot" | "user"; text: string };

export type LeadSubmission = {
  source: LeadSource;
  name: string;
  email?: string;
  phone?: string;
  fields?: LeadField[];
  transcript?: TranscriptMessage[];
  urgent?: boolean;
  pageUrl?: string;
  /** Hidden honeypot checkbox; leave unset/false on real submissions. */
  botcheck?: boolean;
  /** Hidden honeypot text input; must be empty on real submissions. */
  hp?: string;
  /** Milliseconds the form was open before submit (bots submit instantly). */
  fillMs?: number;
  /** Cloudflare Turnstile response token, when the widget is configured. */
  turnstileToken?: string | null;
};

type SendLeadResponse = { success: boolean; message?: string; customerEmailSent?: boolean };

async function parseResponse(res: Response): Promise<SendLeadResponse> {
  try {
    return (await res.json()) as SendLeadResponse;
  } catch {
    return { success: res.ok };
  }
}

export async function submitLead(payload: LeadSubmission, file?: File | null): Promise<SendLeadResponse> {
  const body: LeadSubmission = {
    ...payload,
    pageUrl: payload.pageUrl ?? (typeof window !== "undefined" ? window.location.href : undefined),
  };

  const res = file
    ? await fetch("/api/send-lead", {
        method: "POST",
        body: (() => {
          const formData = new FormData();
          formData.append("payload", JSON.stringify(body));
          formData.append("attachment", file);
          return formData;
        })(),
      })
    : await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

  const data = await parseResponse(res);
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong submitting your request.");
  }
  return data;
}
