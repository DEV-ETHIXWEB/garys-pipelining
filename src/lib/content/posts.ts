import type { FaqItem } from "./services";

// Blog posts. Inline text supports **bold** and [label](href); hrefs starting
// with "/" stay on-site, anything else opens in a new tab.
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "figure"; src: string; alt: string; caption: string }
  | { type: "callout"; title: string; text: string; phone?: { label: string; href: string } };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  cover: { src: string; alt: string };
  updatedAt?: string;
  keywords: string[];
  takeaways: string[];
  relatedServices: string[];
  relatedLocations: string[];
  body: PostBlock[];
  faqs: FaqItem[];
};

export const posts: Post[] = [
  {
    slug: "side-sewer-seattle-who-owns-it",
    title: "Side Sewer in Seattle: Who Actually Owns the Pipe Under Your Yard",
    metaTitle: "Side Sewer Seattle: Who Owns the Pipe Under Your Yard",
    metaDescription:
      "In Seattle you own your side sewer all the way to the main under the street. Here is what that means, who pays for repairs, and how to check yours.",
    excerpt:
      "Water stops being yours at the meter. Power stops at the weatherhead. In Seattle, your sewer line runs all the way to the city main under the street, and every foot of it is yours.",
    category: "Homeowner guide",
    publishedAt: "2026-10-29",
    cover: {
      src: "/blog/side-sewer-seattle/who-owns-the-pipe.webp",
      alt: "Illustration of a Seattle house with its side sewer running from the foundation to the city sewer main under the street, labelled all of this is yours",
    },
    takeaways: [
      "In Seattle you own your side sewer all the way to the public main, usually under the street.",
      "On many older blocks the line is shared with neighbors past the point where the pipes meet.",
      "A camera inspection is the only way to know what shape a buried line is in.",
    ],
    keywords: [
      "side sewer Seattle",
      "side sewer repair Seattle",
      "who owns the sewer line Seattle",
      "Seattle side sewer responsibility",
      "shared side sewer",
      "SPU side sewer",
      "sewer camera inspection Seattle",
      "trenchless sewer repair Seattle",
    ],
    relatedServices: ["sewer-inspection", "trenchless-sewer-repair", "pipe-bursting", "sewer-replacement"],
    relatedLocations: ["seattle-wa", "tukwila-wa", "renton-wa", "bellevue-wa", "tacoma-wa", "federal-way-wa"],
    body: [
      {
        type: "p",
        text: 'Most people in Seattle hear the words "side sewer" for the first time on a bad day. A toilet backs up and will not clear. Someone runs a camera down the line, turns the screen around, and points at a cracked section about forty feet out under the front lawn. Then they tell you it is yours to fix.',
      },
      {
        type: "p",
        text: "That lands badly, because it does not match how people assume utilities work. Water stops being your problem at the meter. Power stops at the weatherhead. Sewer does not work that way here, and the difference can be expensive.",
      },
      { type: "h2", id: "where-your-responsibility-ends", text: "Where your responsibility actually ends" },
      {
        type: "p",
        text: "[Seattle Public Utilities](https://www.seattle.gov/utilities/your-services/sewer-and-drainage/side-sewers) states it plainly: if you own your home or building, **you own your side sewer all the way to the public sewer main**. That main usually runs under the street out front. Everything between your house and that connection point is private pipe, and in Seattle the responsibility for maintaining and repairing it is written into the Municipal Code, Chapter 21.16.",
      },
      {
        type: "p",
        text: "So the line does not stop being yours at the property line. It does not stop at the sidewalk. It carries on under the planting strip, past the curb, and often under the street itself until it reaches the city's main. All of it is yours.",
      },
      {
        type: "p",
        text: "That is the part worth sitting with. A failure thirty feet out in the parking strip, under a tree the city planted, is still a private repair.",
      },
      {
        type: "figure",
        src: "/blog/side-sewer-seattle/where-your-side-sewer-ends.webp",
        alt: "Diagram showing a side sewer running from the house, past the property line, under the sidewalk and street to the city sewer main. Everything up to the main is the owner's; only the main belongs to SPU.",
        caption: "It does not stop at the property line. It carries on under the sidewalk, past the curb and under the street.",
      },
      { type: "h2", id: "shared-side-sewers", text: "The part that catches people out: shared side sewers" },
      {
        type: "p",
        text: "On a lot of older Seattle blocks, your pipe does not run on its own all the way to the main. It joins a neighbor's pipe first, and the combined line continues from there.",
      },
      {
        type: "p",
        text: "From the point where those pipes meet, you and your neighbors share responsibility for the rest of the run. The city treats everyone connected to that shared section as a responsible party. In practice, a failure on the shared stretch is a conversation with the people next door before it is a repair you book on your own.",
      },
      {
        type: "p",
        text: "If you do not know whether yours is shared, you do not have to guess. SPU keeps mapping records, and their side sewer team will help work out whether a repair is yours, shared, or theirs. They can also check whether the city already holds inspection footage of your connection.",
      },
      {
        type: "figure",
        src: "/blog/side-sewer-seattle/shared-side-sewers.webp",
        alt: "Diagram of two houses whose side sewers meet before reaching the city main. Each pipe is owned alone up to the meeting point; everything past it is shared responsibility.",
        caption: "A repair on the shared stretch is a conversation with the neighbors first. SPU keeps the mapping records and will help work out whose it is.",
      },
      { type: "h2", id: "check-your-side-sewer", text: "How to find out what shape yours is in" },
      {
        type: "p",
        text: "There is no way to judge a buried pipe from the surface. Slow drains, [gurgling from a floor drain](/services/drain-cleaning), a patch of lawn that stays green through a dry spell, or a smell near the cleanout are all worth taking seriously, but none of them tell you what is actually wrong.",
      },
      {
        type: "p",
        text: "A [camera inspection](/services/sewer-inspection) does. A self-leveling HD camera goes down the line and shows you the inside of the pipe in real time, including what it is made of, where the damage is, and how far out it sits. That last part matters, because depth and distance are what drive the cost of any repair.",
      },
      { type: "h2", id: "what-the-city-will-help-with", text: "What the city will actually help with" },
      {
        type: "p",
        text: "Side sewer work is not cheap, and anyone who quotes a number before looking inside the pipe is guessing. The real cost depends on how deep the line sits, how long the damaged run is, what the pipe is made of, and whether you are fixing one bad joint or the whole lateral.",
      },
      {
        type: "p",
        text: "Two things are worth knowing before you spend anything. SPU recommends getting **at least three bids** before you commit to repair work, which is sensible advice even though we are one of the people bidding. And if cost is the obstacle, the city offers interest-free loans for side sewer repair to low and fixed income customers.",
      },
      { type: "h2", id: "digging-is-not-the-only-option", text: "Digging up the yard is not the only option" },
      {
        type: "p",
        text: "The old approach was to open a trench along the length of the pipe, which means torn-up lawn, broken driveway, and several days of work. On most residential lines that is no longer necessary.",
      },
      {
        type: "p",
        text: "[Cured-in-place lining](/services/trenchless-sewer-repair) rebuilds the pipe from the inside. A resin-saturated liner is pulled or inverted through the existing line and cured hard against the pipe wall, leaving a smooth, jointless pipe inside the old one. Because there are no joints, there is nothing for roots to get into. Most residential laterals are inspected, lined and cured in a single visit, through one or two small access points rather than a trench across the garden.",
      },
      {
        type: "p",
        text: "Lining is not right for every pipe. If a line has collapsed, or the joints have shifted too far out of line, the honest answer is [pipe bursting](/services/pipe-bursting) or a [full replacement](/services/sewer-replacement) instead. That is a decision the camera footage makes for you, not something anyone should be guessing at over the phone.",
      },
      { type: "h2", id: "if-it-is-backing-up", text: "If it is backing up right now" },
      {
        type: "callout",
        title: "Call Seattle Public Utilities first",
        text: "Before you call anyone, report an active backup, flooding or spill to Seattle Public Utilities. They can tell you whether the problem sits on the city's side of the connection, and if it does, it is not your repair and not your bill.",
        phone: { label: "(206) 386-1800", href: "tel:+12063861800" },
      },
      { type: "p", text: "If it turns out to be on your side, that is the point to bring in a crew." },
      {
        type: "p",
        text: "Gary's Pipelining is based in [Tukwila](/service-area/tukwila-wa) and works on side sewers across [Seattle](/service-area/seattle-wa), [Renton](/service-area/renton-wa), [Bellevue](/service-area/bellevue-wa), [Tacoma](/service-area/tacoma-wa) and [Federal Way](/service-area/federal-way-wa). Every job starts with an HD camera inspection, so you see the same footage we do before anyone talks about a repair. If the line can be lined, we line it, and your yard stays where it is.",
      },
      {
        type: "p",
        text: "Call **(206) 535-8460** for a free estimate, or any time at all if a line is backing up now.",
      },
    ],
    faqs: [
      {
        q: "Who is responsible for the side sewer in Seattle?",
        a: "The property owner. Seattle Public Utilities states that if you own your home or building, you own your side sewer all the way to the public sewer main, which usually runs under the street. The responsibility to maintain and repair it is set out in Seattle Municipal Code Chapter 21.16.",
      },
      {
        q: "Does my side sewer stop being mine at the property line or sidewalk?",
        a: "No. It stays yours under the planting strip, past the curb and often under the street until it reaches the city's main. A failure thirty feet out in the parking strip is still a private repair.",
      },
      {
        q: "Who pays to fix a shared side sewer?",
        a: "From the point where your pipe joins a neighbor's, everyone connected to the shared section is a responsible party, so a failure there is a conversation with the neighbors first. SPU keeps mapping records and its side sewer team will help work out whether a repair is yours, shared or the city's.",
      },
      {
        q: "How much does side sewer repair cost in Seattle?",
        a: "It depends on how deep the line sits, how long the damaged run is, what the pipe is made of and whether you are fixing one joint or the whole lateral, which is why a camera inspection comes before any price. SPU recommends getting at least three bids, and the city offers interest-free side sewer repair loans to low and fixed income customers.",
      },
      {
        q: "Can a side sewer be repaired without digging up the yard?",
        a: "On most residential lines, yes. Cured-in-place lining rebuilds the pipe from the inside through one or two small access points, usually in a single visit. If the line has collapsed or the joints have shifted too far, pipe bursting or a full replacement is the honest answer.",
      },
      {
        q: "What should I do if my sewer is backing up right now?",
        a: "Report an active backup, flooding or spill to Seattle Public Utilities on (206) 386-1800 first. If the problem is on the city's side of the connection, it is not your repair or your bill. If it is on your side, call Gary's Pipelining on (206) 535-8460, any time.",
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function postsForService(slug: string) {
  return posts.filter((p) => p.relatedServices.includes(slug));
}

export function postsForLocation(slug: string) {
  return posts.filter((p) => p.relatedLocations.includes(slug));
}

export function postHeadings(post: Post) {
  return post.body.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : []));
}

export function readingMinutes(post: Post) {
  return Math.max(1, Math.round(postWordCount(post) / 220));
}

export function postWordCount(post: Post) {
  return post.body
    .map((b) => ("text" in b ? b.text : ""))
    .join(" ")
    .split(/\s+/).length;
}

export function formatPostDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
