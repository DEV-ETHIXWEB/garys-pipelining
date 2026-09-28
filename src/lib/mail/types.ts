import type { LeadSource } from "./lead-schema";

export type TranscriptMessage = {
  from: "bot" | "user";
  text: string;
};

export type LeadField = {
  label: string;
  value: string;
};

export type LeadAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

/** Validated, trimmed, ready to hand to the templates and the transporter. */
export type NormalizedLead = {
  source: LeadSource;
  sourceLabel: string;
  name: string;
  email?: string;
  phone?: string;
  fields: LeadField[];
  transcript?: TranscriptMessage[];
  urgent?: boolean;
  pageUrl?: string;
  submittedAt: Date;
  attachment?: LeadAttachment;
  /** Set when the spam filter found weak signals but not enough to quarantine the lead. */
  spamFlags?: string[];
  /**
   * Quarantined: delivered to MAIL_QUARANTINE only, never to the client and
   * never confirmed to the customer. Nothing is deleted, so a wrongly flagged
   * real enquiry can still be recovered from that mailbox.
   */
  quarantined?: boolean;
};
