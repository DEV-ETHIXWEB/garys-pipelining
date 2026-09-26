import { z } from "zod";

// Every lead-producing surface on the site (forms, chatbot, and anything
// added later) funnels into this one shape. Source-specific data lives in
// `fields`, a flat label/value list, so adding a new form or a new chatbot
// question never requires touching the API route or the email templates.
export const LEAD_SOURCES = ["estimate", "contact", "partnership", "careers", "chatbot"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const SOURCE_LABELS: Record<LeadSource, string> = {
  estimate: "Estimate request",
  contact: "Contact form",
  partnership: "Contractor partnership request",
  careers: "Careers application",
  chatbot: "Chatbot conversation",
};

const trimmed = (max: number, min = 0, minMessage?: string) => {
  const base = z.string().trim().max(max);
  return min > 0 ? base.min(min, minMessage) : base;
};

const transcriptMessageSchema = z.object({
  from: z.enum(["bot", "user"]),
  text: trimmed(2000, 1),
});

const fieldSchema = z.object({
  label: trimmed(120, 1),
  value: trimmed(4000),
});

export const leadPayloadSchema = z
  .object({
    source: z.enum(LEAD_SOURCES),
    name: trimmed(120, 1, "Enter your name so we know who to follow up with."),
    email: z
      .union([z.string().trim().toLowerCase().email("Enter a valid email address.").max(254), z.literal("")])
      .optional(),
    phone: z.union([trimmed(40, 7, "Enter a valid phone number."), z.literal("")]).optional(),
    fields: z.array(fieldSchema).max(40).default([]),
    transcript: z.array(transcriptMessageSchema).max(200).optional(),
    urgent: z.boolean().optional(),
    pageUrl: z.union([z.string().trim().max(500), z.literal("")]).optional(),
    // Hidden checkbox every form ships already; real visitors never touch it.
    botcheck: z.boolean().optional(),
    // Hidden text input, moved off-screen. Bots that fill every input they
    // find populate it; people can't see it, so they never do.
    hp: z.string().max(500).optional(),
    // Milliseconds the form was open before submitting. Bots submit instantly.
    fillMs: z.number().int().min(0).max(86_400_000).optional(),
  })
  .refine((data) => Boolean(data.email) || Boolean(data.phone), {
    message: "Provide an email or phone number so we can respond.",
    path: ["phone"],
  });

export type LeadPayloadInput = z.infer<typeof leadPayloadSchema>;
