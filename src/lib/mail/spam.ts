import type { LeadPayloadInput } from "./lead-schema";

// Cheap, dependency-free scoring that runs after schema validation and the
// honeypot checks. It targets the junk that actually reaches the inbox: bots
// that pass Turnstile and fill every field with random characters
// ("MGtfDzDtBYkmbMAzHJhwRXBh", "Tpbtfzqt") plus real-looking emails and phones.
//
// Signals fall into two kinds:
//  - CONTENT: what was typed looks machine-made (random text, junk links).
//  - BEHAVIOUR: how it was submitted looks machine-made (instant, no timing).
// Behaviour alone can never drop a lead (fillMs is client-reported and a fast
// autofill is normal), it can only tip a lead that already looks odd. A lead
// is dropped silently only when the content itself is clearly junk; the middle
// band is still delivered, flagged "[Review]", so a false positive costs the
// team a glance instead of a customer.
export type SpamAction = "allow" | "review" | "drop";
export type SpamVerdict = { action: SpamAction; score: number; reasons: string[] };

export const REVIEW_AT = 2;
export const DROP_AT = 4;

export type SpamInput = Pick<LeadPayloadInput, "source" | "name" | "email" | "fields" | "transcript" | "fillMs">;

// A person can't read, fill, and submit a form in under this.
const MIN_HUMAN_FILL_MS = 2500;
// Nobody produces a submit this soon after the form appeared.
const IMPOSSIBLE_FILL_MS = 300;

// Distinct link targets, not raw link count: a customer pasting five photo
// links from one drive is normal, a pitch pointing at many sites is not.
const HOST_PATTERN = /(?:https?:\/\/|(?:^|\s)www\.)([^\s/:?#]+)/gi;
const REVIEW_HOSTS = 3;
const DROP_HOSTS = 6;

// High-precision phrases only, matched after undoing common obfuscation
// ("b@cklinks", "Bit-coin"). This is not a general keyword filter.
const SPAM_PHRASES = [
  /\bbacklinks?\b/,
  /\bseo (?:services?|expert|agency|ranking|package)/,
  /\bcasino\b/,
  /\b(?:viagra|cialis)\b/,
  /\bcrypto(?:currency)?\b/,
  /\bbitcoin\b/,
  /\bforex\b/,
  /\bguest posts?\b/,
  /\bmake money online\b/,
];

const LEET: Record<string, string> = { "@": "a", "0": "o", "1": "i", "3": "e", $: "s", "5": "s" };

/** Lowercase, undo leetspeak, and rejoin words broken by hyphens or single spaces between letters. */
function normalizeForPhrases(text: string): string {
  const lowered = text.toLowerCase().replace(/[@0135$]/g, (c) => LEET[c] ?? c);
  const dehyphenated = lowered.replace(/(?<=[a-z])[-_.](?=[a-z])/g, "");
  // "c a s i n o" -> "casino" (single letters separated by single spaces)
  return dehyphenated.replace(/\b(?:[a-z] ){2,}[a-z]\b/g, (m) => m.replace(/ /g, ""));
}

const isLower = (c: string) => c >= "a" && c <= "z";
const isUpper = (c: string) => c >= "A" && c <= "Z";

function caseFlips(token: string): number {
  let flips = 0;
  for (let i = 1; i < token.length; i++) {
    if (isLower(token[i - 1]) && isUpper(token[i])) flips++;
  }
  return flips;
}

/**
 * One unbroken run of letters/digits whose casing jumps lower->upper again
 * and again mid-word ("gMMDGildInbyVnnxJnSU"). Real names and words flip at
 * most twice (McDonald, iPhone, DeShawn), so 3+ in a 10+ character run is
 * random text.
 */
export function isRandomCased(value: string): boolean {
  const t = value.trim();
  return t.length >= 10 && /^[A-Za-z0-9]+$/.test(t) && caseFlips(t) >= 3;
}

const VOWELS = "aeiouy";

function longestConsonantRun(word: string): number {
  let longest = 0;
  let run = 0;
  for (const ch of word.toLowerCase()) {
    if (VOWELS.includes(ch)) {
      run = 0;
    } else {
      run++;
      if (run > longest) longest = run;
    }
  }
  return longest;
}

/** A single word with 5+ consonants in a row ("Tpbtfzqt", "Exkpzn"). Weak on its own. */
export function isKeyboardMash(value: string): boolean {
  const t = value.trim();
  return t.length >= 6 && /^[A-Za-z]+$/.test(t) && longestConsonantRun(t) >= 5;
}

/**
 * A long single word with 7+ consonants in a row ("mgtfdzdtbykmbmazhj"). Catches
 * random text typed in one case, which isRandomCased can't see. Real words and
 * place names stay under this ("Knightsbridge" is 6, "strengths" is 5).
 */
export function isConsonantSoup(value: string): boolean {
  const t = value.trim();
  return t.length >= 10 && /^[A-Za-z]+$/.test(t) && longestConsonantRun(t) >= 7;
}

/** Random-looking single token, in any casing. */
function isRandomText(value: string): boolean {
  return isRandomCased(value) || isConsonantSoup(value);
}

/** A single token that is one character over and over ("ffffffff"). */
function isRepeatedChar(value: string): boolean {
  const t = value.trim();
  return t.length >= 5 && !/\s/.test(t) && /(.)\1{4,}/.test(t);
}

function hasNoLetters(value: string): boolean {
  const t = value.trim();
  return t.length >= 6 && !/\p{L}/u.test(t);
}

function distinctHosts(text: string): number {
  const hosts = new Set<string>();
  for (const m of text.matchAll(HOST_PATTERN)) hosts.add(m[1].toLowerCase().replace(/^www\./, ""));
  return hosts.size;
}

const MESSAGE_LABEL = /issue|message|describe|details|notes|comments/i;

export function assessLead(data: SpamInput): SpamVerdict {
  let content = 0;
  let behaviour = 0;
  let hard = 0; // rules that are conclusive by themselves
  const reasons: string[] = [];

  const userTranscript = (data.transcript ?? []).filter((m) => m.from === "user").map((m) => m.text);

  // Name
  if (isRandomText(data.name)) {
    content += 2;
    reasons.push("name looks like random characters");
  } else if (hasNoLetters(data.name) || isRepeatedChar(data.name)) {
    content += 2;
    reasons.push("name has no real letters");
  } else if (isKeyboardMash(data.name)) {
    content += 1;
    reasons.push("name looks like keyboard mashing");
  }
  if (distinctHosts(data.name) > 0) {
    content += 3;
    reasons.push("link in the name field");
  }

  // Form fields, capped so two junk fields reach the drop line but no single
  // field can do it alone.
  let fieldPoints = 0;
  for (const f of data.fields) {
    const v = f.value.trim();
    if (!v) continue;
    if (isRandomText(v)) {
      fieldPoints += 2;
      reasons.push(`random-looking text in "${f.label}"`);
    } else if (MESSAGE_LABEL.test(f.label) && (hasNoLetters(v) || isRepeatedChar(v))) {
      fieldPoints += 2;
      reasons.push(`no real words in "${f.label}"`);
    } else if (/address|company|city/i.test(f.label) && isKeyboardMash(v)) {
      fieldPoints += 1;
      reasons.push(`nonsense word in "${f.label}"`);
    }
  }
  content += Math.min(fieldPoints, 4);

  // Chatbot transcripts: the visitor's own messages get the same scrutiny.
  let transcriptPoints = 0;
  for (const text of userTranscript) {
    if (isRandomText(text)) transcriptPoints += 2;
  }
  if (transcriptPoints > 0) {
    content += Math.min(transcriptPoints, 4);
    reasons.push("random-looking text in the chat messages");
  }

  // Gmail "dot trick" spray addresses: bo.ne.h.am.510@gmail.com
  const local = (data.email ?? "").split("@")[0] ?? "";
  if ((local.match(/\./g)?.length ?? 0) >= 4) {
    content += 1;
    reasons.push("email address with an unusual number of dots");
  }

  // Links: distinct targets in the typed fields (not the chat transcript).
  const typed = [data.name, ...data.fields.map((f) => f.value)].join("\n");
  const hosts = distinctHosts(typed);
  if (hosts >= DROP_HOSTS) {
    hard += 4;
    reasons.push("links to many different sites");
  } else if (hosts > REVIEW_HOSTS) {
    content += 2;
    reasons.push("links to several different sites");
  }

  // Spam phrases: one hit is a nudge (a casino or crypto-firm customer is
  // real), two different ones is a pitch.
  const normalized = normalizeForPhrases([typed, ...userTranscript].join("\n"));
  const phraseHits = SPAM_PHRASES.filter((p) => p.test(normalized)).length;
  if (phraseHits >= 2) {
    content += 3;
    reasons.push("several common spam phrases");
  } else if (phraseHits === 1) {
    content += 1;
    reasons.push("contains a common spam phrase");
  }

  // Behaviour: how long the form was open. Capped, and never enough to drop.
  if (typeof data.fillMs === "number") {
    if (data.fillMs < IMPOSSIBLE_FILL_MS) {
      behaviour += 3;
      reasons.push("submitted instantly");
    } else if (data.fillMs < MIN_HUMAN_FILL_MS) {
      behaviour += 2;
      reasons.push("submitted faster than a person could fill the form");
    }
  } else if (data.source !== "chatbot") {
    behaviour += 2;
    reasons.push("no form timing (direct API post or a stale page)");
  }
  behaviour = Math.min(behaviour, 3);

  // The chatbot skips Turnstile (there's no widget in a conversation), so a
  // "chatbot" lead has to actually contain a conversation.
  if (data.source === "chatbot" && userTranscript.length === 0) {
    hard += 4;
    reasons.push("chatbot lead with no visitor messages");
  }

  const score = content + behaviour + hard;
  const drop = hard >= DROP_AT || content >= DROP_AT || (content >= 3 && score >= 5);
  const action: SpamAction = drop ? "drop" : score >= REVIEW_AT ? "review" : "allow";
  return { action, score, reasons };
}
