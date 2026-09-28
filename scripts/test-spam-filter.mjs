// Regression test for the lead spam filter (src/lib/mail/spam.ts).
// Run with: npm run test:spam
//
// Two directions matter:
//  1. The junk that actually reached the inbox must be dropped.
//  2. Real customers, including awkward-but-legitimate ones, must never be dropped.
import assert from "node:assert/strict";
import { assessLead, isConsonantSoup, isKeyboardMash, isRandomCased, isUnbrokenText } from "../src/lib/mail/spam.ts";

const form = (over) => ({
  source: "estimate",
  name: "Jane Smith",
  email: "jane@example.com",
  fields: [
    { label: "Address", value: "123 Main St, Seattle" },
    { label: "Service needed", value: "Drain Cleaning" },
    { label: "Describe the issue", value: "Slow drain in the kitchen sink" },
    { label: "Commercial property", value: "No" },
    { label: "SMS consent", value: "No" },
  ],
  fillMs: 20_000,
  ...over,
});

const issueFields = (address, issue) => [
  { label: "Address", value: address },
  { label: "Service needed", value: "" },
  { label: "Describe the issue", value: issue },
  { label: "Commercial property", value: "No" },
  { label: "SMS consent", value: "No" },
];

// Real submissions copied from the inbox screenshots (six separate leads).
const REAL_SPAM = [
  ["MGtfDzDtBYkmbMAzHJhwRXBh", "bo.ne.h.am.510@gmail.com", "Flaewa", "gMMDGildInbyVnnxJnSU"],
  ["BThBAEBomxVVururC", "renee.guzman@live.com", "Exkpzn", "vRgMnDTwMSjwZlkegS"],
  ["gvYNgyYlwTCypdnJYktqMH", "tanja.eblinghaus@avenga.com", "Tpbtfzqt", "FSgmDQLJmJgUDCYgUPpfeoX"],
  ["fZCDvHeWpEoTtBQCugljUIKX", "flippl@yahoo.com", "Jbezrhklnw", "zjUfiBygQaFZFXViV"],
  ["hXnCyMdavQCoktpNUPtSJ", "patrick.lane@mindshareworld.com", "Eigsii", "tqZjmHMGpdPQPTHIoIuSU"],
  ["XgjpuyTwXzcMADRBSUTONS", "q.ay.u.j.u.mu70@gmail.com", "Rumqfnjgu", "PSAiVgvTXtnIkOQDBg"],
];

let passed = 0;
const check = (label, fn) => {
  fn();
  passed++;
  console.log(`  ok  ${label}`);
};

console.log("Real spam is quarantined (never deleted)");
for (const [name, email, address, issue] of REAL_SPAM) {
  // Worst case for us: a bot that waits a human-plausible time before submitting.
  const v = assessLead(form({ name, email, fields: issueFields(address, issue), fillMs: 9000 }));
  check(`${name.slice(0, 12)}… (score ${v.score})`, () => assert.equal(v.action, "quarantine", v.reasons.join("; ")));
}

console.log("Legitimate leads are never dropped or flagged");
const LEGIT = [
  form({}),
  form({ name: "McDonald", fields: issueFields("Tukwila", "backup") }),
  form({ name: "DeShawn Marcus", email: "deshawn.m@gmail.com" }),
  form({ name: "LeBron James" }),
  form({ name: "Christopher Schwartzkopf" }),
  form({ name: "Krzysztof Przybylski", fields: issueFields("14101 Interurban Ave S, Unit 78-B", "Sewer smell in the basement") }),
  form({ name: "Mary-Jane Watson-Smith" }),
  form({ name: "O'Brien" }),
  form({ name: "Nguyen Thi Lan" }),
  form({ name: "MacKenzieRose" }),
  form({ name: "DeAndreMontgomery" }),
  form({ name: "Bartholomew" }),
  form({ fields: issueFields("Seattle", "ASAP") }),
  form({ fields: issueFields("Bellevue WA 98004", "HELP") }),
  form({ fields: issueFields("", "EMERGENCYSEWERBACKUPINBASEMENT") }),
  form({ fields: issueFields("Renton", "Photos here https://drive.google.com/file/abc123") }),
  form({ email: "john.a.smith.jr.1990@gmail.com" }),
  form({ fillMs: 3000 }),
  form({ fields: issueFields("Strengths Rd", "Wright Street property, bought a Kohler K-3999") }),
  form({ fields: [{ label: "Service needed", value: "Hydro Jetting" }], fillMs: 45_000 }),
  form({ source: "contact", fields: [{ label: "Message", value: "Do you service Federal Way? Need a quote for a sump pump." }] }),
  form({ source: "partnership", name: "Rivera Plumbing", fields: [{ label: "Company name", value: "Rivera & Sons Plumbing" }, { label: "Company website", value: "https://riveraplumbing.com" }] }),
  {
    source: "chatbot",
    name: "Mike",
    email: undefined,
    fields: [{ label: "Topics discussed", value: "Pricing, Emergency" }],
    transcript: [
      { from: "bot", text: "Greeted the visitor" },
      { from: "user", text: "my basement is flooding from the main drain" },
      { from: "user", text: "Mike" },
    ],
    fillMs: undefined,
  },
];
LEGIT.forEach((lead, i) => {
  const v = assessLead(lead);
  check(`legit #${i + 1} ${lead.name} (score ${v.score})`, () => assert.equal(v.action, "allow", v.reasons.join("; ")));
});

console.log("Cases an independent reviewer showed used to drop or over-flag real customers");
const NEVER_DROP = [
  ["chat: customer pastes 4 photo links from one drive", { source: "chatbot", name: "Ann Lee", email: "a@example.com", fields: [], transcript: [{ from: "bot", text: "Greeted the visitor" }, { from: "user", text: "https://drive.google.com/1 https://drive.google.com/2 https://drive.google.com/3 https://drive.google.com/4" }] }],
  ["chat: customer mentions 4 listing sites", { source: "chatbot", name: "Ann Lee", email: "a@example.com", fields: [], transcript: [{ from: "bot", text: "Greeted the visitor" }, { from: "user", text: "I saw https://a.com https://b.com https://c.com https://d.com listings" }] }],
  ["estimate: 4 different links", form({ fields: issueFields("x", "https://a.com https://b.com https://c.com https://d.com pics") })],
  ["casino customer, normal pace", form({ fillMs: 20_000, fields: issueFields("Reno", "Casino kitchen grease trap backed up") })],
  ["crypto office, normal pace", form({ fillMs: 20_000, fields: issueFields("Seattle", "Crypto startup office, toilets clogged") })],
  ["mid-length no-space name + odd address", form({ name: "KwabenaOwusuAnsah", fillMs: 20_000, fields: issueFields("Strngths", "slow drain") })],
  ["no-space camel name + odd address", form({ name: "DeShawnMarcusJr", fillMs: 3000, fields: issueFields("Tsktsk", "slow drain") })],
  ["no-space camel name, stale page", form({ name: "LaQuitaJoAnnDeShawn", fillMs: undefined })],
  ["dotted email, normal pace", form({ name: "D'Shawn", email: "a.b.c.d.e@gmail.com", fillMs: 20_000 })],
  ["message typed with no spaces", form({ fields: issueFields("Seattle", "SlowDrainInKitchenSinkAndShower") })],
];
for (const [label, lead] of NEVER_DROP) {
  const v = assessLead(lead);
  check(`${label} (score ${v.score})`, () => assert.notEqual(v.action, "quarantine", v.reasons.join("; ")));
}

console.log("Bot variants seen in review that used to score 0-1 now get flagged");
const EVASIONS = [
  ["digit-only name", form({ name: "1234567890", fields: issueFields("Seattle", "help me please") })],
  ["repeated-character message", form({ fields: issueFields("Seattle", "ffffffffff") })],
  ["digits-only message", form({ fields: issueFields("Seattle", "84729183746") })],
  ["realistic text, impossible fillMs (0)", form({ fillMs: 0 })],
  ["realistic text, no timing at all", form({ fillMs: undefined })],
];
for (const [label, lead] of EVASIONS) {
  const v = assessLead(lead);
  check(`${label} (score ${v.score})`, () => assert.notEqual(v.action, "allow", v.reasons.join("; ")));
}
check("obfuscated spam pitch (b@cklinks + C a s i n o) is caught", () =>
  assert.equal(assessLead(form({ fillMs: 200, fields: issueFields("x", "Cheap b@cklinks and C a s i n o bonus") })).action, "quarantine"),
);

console.log("Weak or partial signals are flagged for review, not dropped");
const REVIEW = [
  // Junk in one field only.
  ["random message only", form({ fields: issueFields("123 Main St", "gMMDGildInbyVnnxJnSU") })],
  // Instant submit but otherwise normal looking.
  // Direct API post with realistic text (no timing) + spam-dotted email + nonsense address.
  ["realistic text, no timing, dotted email", form({ fillMs: undefined, email: "a.b.c.d.e@gmail.com" })],
];
for (const [label, lead] of REVIEW) {
  const v = assessLead(lead);
  check(`${label} (score ${v.score})`, () => assert.equal(v.action, "review", v.reasons.join("; ")));
}

console.log("Turnstile failure must not lose real leads (form falls back to unverified)");
check("clean lead with no Turnstile verification is delivered, flagged", () => {
  const v = assessLead(form({ unverified: true }));
  assert.equal(v.action, "review", v.reasons.join("; "));
});
check("chatbot is unaffected by the unverified flag", () => {
  const v = assessLead({
    source: "chatbot",
    name: "Mike",
    fields: [{ label: "Topics discussed", value: "Pricing" }],
    transcript: [{ from: "bot", text: "Greeted the visitor" }, { from: "user", text: "basement is flooding" }],
  });
  assert.equal(v.action, "allow", v.reasons.join("; "));
});
check("junk content with no verification is still dropped", () => {
  const v = assessLead(form({ unverified: true, name: "MGtfDzDtBYkmbMAzHJhwRXBh", fillMs: 9000, fields: issueFields("Flaewa", "gMMDGildInbyVnnxJnSU") }));
  assert.equal(v.action, "quarantine", v.reasons.join("; "));
});
check("unverified alone can never drop a lead", () => {
  for (const lead of LEGIT) {
    const v = assessLead({ ...lead, unverified: true });
    assert.notEqual(v.action, "quarantine", `${lead.name}: ${v.reasons.join("; ")}`);
  }
});

console.log("Other hard drops");
check("pitch linking to 6+ different sites is quarantined", () =>
  assert.equal(
    assessLead(form({ fields: issueFields("x", "http://a.com http://b.com http://c.com http://d.com http://e.com http://f.com") })).action,
    "quarantine",
  ),
);
check("chat leads with no conversation AND random text are quarantined", () =>
  assert.equal(
    assessLead({
      source: "chatbot",
      name: "MGtfDzDtBYkmbMAzHJhwRXBh",
      email: "x@example.com",
      fields: [],
      transcript: [{ from: "bot", text: "Greeted the visitor" }, { from: "user", text: "gMMDGildInbyVnnxJnSU" }],
    }).action,
    "quarantine",
  ),
);
check("chatbot post with no conversation (Turnstile bypass attempt)", () =>
  assert.equal(
    assessLead({ source: "chatbot", name: "Bob Jones", email: "bob@example.com", fields: [], transcript: [{ from: "bot", text: "Greeted the visitor" }] }).action,
    "quarantine",
  ),
);
check("chatbot post with no transcript at all", () =>
  assert.equal(assessLead({ source: "chatbot", name: "Bob Jones", email: "bob@example.com", fields: [] }).action, "quarantine"),
);
check("SEO spam pitch, instant submit", () =>
  assert.equal(assessLead(form({ fillMs: 300, fields: issueFields("x", "Cheap backlinks and seo services for your site") })).action, "quarantine"),
);

console.log("Hard 3-second rule (content-independent, catches junk that is different every time)");
// Known, accepted tradeoff: a real customer using full browser autofill can
// submit inside 3s and will be quarantined. That is survivable only because
// quarantine delivers to a mailbox instead of deleting, so the enquiry is
// still recoverable. If that mailbox is ever not configured, this rule turns
// into data loss, which is why MAIL_QUARANTINE is documented as required.
check("a real customer on fast autofill is quarantined, NOT deleted (recoverable)", () => {
  const v = assessLead(form({ fillMs: 2600 }));
  assert.equal(v.action, "quarantine");
  assert.ok(v.reasons.some((r) => /faster than a person/.test(r)), v.reasons.join("; "));
});
check("submitted in 1.2s is quarantined even though the content looks perfect", () =>
  assert.equal(assessLead(form({ fillMs: 1200 })).action, "quarantine"),
);
check("submitted in 0s is quarantined", () => assert.equal(assessLead(form({ fillMs: 0 })).action, "quarantine"));
check("submitted at 2.9s is quarantined", () => assert.equal(assessLead(form({ fillMs: 2900 })).action, "quarantine"));
check("submitted at 3.1s with clean content is delivered", () =>
  assert.equal(assessLead(form({ fillMs: 3100 })).action, "allow"),
);
check("a slow, careful real customer is unaffected", () =>
  assert.equal(assessLead(form({ fillMs: 240_000 })).action, "allow"),
);

console.log("Repeat contact (Gmail dot-variants are one inbox)");
check("same inbox submitting again is flagged", () => {
  const v = assessLead(form({ seenRecently: true }));
  assert.notEqual(v.action, "allow", v.reasons.join("; "));
});
check("repeat contact plus one junk field is quarantined", () =>
  assert.equal(
    assessLead(form({ seenRecently: true, fields: issueFields("123 Main St", "gMMDGildInbyVnnxJnSU") })).action,
    "quarantine",
  ),
);

console.log("New content signals from the review of real spam");
check("issue text that is one long run with no spaces is flagged", () => {
  const v = assessLead(form({ fields: issueFields("123 Main St, Seattle", "DKErScwlGYOQHNQumrtbi") }));
  assert.notEqual(v.action, "allow", v.reasons.join("; "));
});
check("a customer who types only a city is never quarantined for it", () =>
  assert.equal(assessLead(form({ fields: issueFields("Seattle", "Slow drain in the kitchen") })).action, "allow"),
);
check("the SibwXBoLKIdFkVlu / Byreikounh style lead is quarantined", () =>
  assert.equal(
    assessLead(form({ name: "SibwXBoLKIdFkVlu", fillMs: 9000, fields: issueFields("Byreikounh", "DKErScwlGYOQHNQumrtbi") })).action,
    "quarantine",
  ),
);

console.log("Detector primitives");
check("isRandomCased", () => {
  assert.equal(isRandomCased("MGtfDzDtBYkmbMAzHJhwRXBh"), true);
  assert.equal(isRandomCased("McDonald"), false);
  assert.equal(isRandomCased("MacKenzieRose"), false);
  assert.equal(isRandomCased("Slow drain in the sink"), false);
});
check("isConsonantSoup", () => {
  assert.equal(isConsonantSoup("mgtfdzdtbykmbmazhj"), true);
  assert.equal(isConsonantSoup("Qzxwvbnmkjhgfd"), true);
  for (const w of ["Schwartzkopf", "Przybylski", "Krzyzanowski", "Strengthening", "Szczepanski", "Christchurch", "Knightsbridge", "Wojciechowski"])
    assert.equal(isConsonantSoup(w), false, w);
});
check("all-lowercase random bot (name+message) is quarantined", () =>
  assert.equal(
    assessLead(form({ name: "mgtfdzdtbykmbmazhj", fillMs: 8000, fields: issueFields("tpbtfzqt", "gmmdgildinbyvnnxjnsu") })).action,
    "quarantine",
  ),
);
check("isUnbrokenText", () => {
  assert.equal(isUnbrokenText("DKErScwlGYOQHNQumrtbi"), true);
  assert.equal(isUnbrokenText("Slow drain in the kitchen sink"), false);
  assert.equal(isUnbrokenText("EMERGENCY"), false);
  assert.equal(isUnbrokenText("https://drive.google.com/file/d/abc123def456"), false); // pasted links are normal
  assert.equal(isUnbrokenText("EMERGENCYSEWERBACKUPINBASEMENT"), false); // real words, shouted
});
check("isKeyboardMash", () => {
  assert.equal(isKeyboardMash("Tpbtfzqt"), true);
  assert.equal(isKeyboardMash("Seattle"), false);
  assert.equal(isKeyboardMash("Schwartzkopf"), false);
});

console.log(`\n${passed} checks passed`);
