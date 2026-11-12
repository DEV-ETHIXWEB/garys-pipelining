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
  /** 1200x675 JPG for link previews; LinkedIn and some messengers skip WebP. */
  shareImage: string;
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
    shareImage: "/blog/side-sewer-seattle/who-owns-the-pipe-share.jpg",
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
  {
    slug: "clay-cast-iron-orangeburg-pipe-seattle",
    title: "Clay, Cast Iron and Orangeburg: What's Actually Under Older Seattle Homes",
    metaTitle: "Orangeburg Pipe Seattle: Clay, Cast Iron and Your Sewer",
    metaDescription:
      "Most pre-1970 Seattle homes have clay, cast iron, or Orangeburg pipe under the yard, not PVC. Here is how each fails and how to find out which is yours.",
    excerpt:
      "Almost no pre-1970 Seattle sewer line is PVC. It is clay, cast iron, or a wood fiber pipe called Orangeburg, and which one you have changes how soon you need to act.",
    category: "Homeowner guide",
    publishedAt: "2026-11-12",
    cover: {
      src: "/blog/clay-cast-iron-orangeburg-pipe-seattle/whats-under-older-seattle-homes.webp",
      alt: "Illustration of a sewer line under a pre-1970 house, patched from clay, Orangeburg and cast iron sections, with the headline under a pre-1970 house the pipe is not PVC",
    },
    shareImage: "/blog/clay-cast-iron-orangeburg-pipe-seattle/whats-under-older-seattle-homes-share.jpg",
    takeaways: [
      "Pre-1970 Seattle sewer lines are clay, cast iron or Orangeburg, and one line can be all three patched together.",
      "Orangeburg was rated for about 50 years and starts to lose its round shape near 30, so most of what is left is past its service life.",
      "A camera inspection is the only way to know which pipe you have and whether lining or replacement fits.",
    ],
    keywords: [
      "orangeburg pipe Seattle",
      "clay sewer pipe Seattle",
      "cast iron sewer pipe Seattle",
      "old sewer line Seattle",
      "sewer camera inspection Seattle",
      "trenchless sewer repair Seattle",
      "pipe bursting Seattle",
    ],
    relatedServices: ["sewer-inspection", "trenchless-sewer-repair", "pipe-bursting", "sewer-replacement"],
    relatedLocations: ["seattle-wa", "tukwila-wa", "renton-wa", "bellevue-wa", "tacoma-wa", "federal-way-wa"],
    body: [
      {
        type: "p",
        text: "Every Seattle home built before the 1970s has a sewer line running from the house to the street, and almost none of it is PVC. It is clay, cast iron, or a wood fiber pipe called Orangeburg, and which one you have changes how worried you should be and how soon you need to deal with it.",
      },
      {
        type: "p",
        text: "None of the three were built to last forever, and at least one of them is already well past the service life it was built for. A camera run down the line is the only way to know for certain which material is under your yard, and that one answer usually decides everything else.",
      },
      { type: "h2", id: "age-does-not-tell-you", text: "Why your home's age does not tell you which pipe you have" },
      {
        type: "p",
        text: "A house built in 1925 does not necessarily still have its original 1925 pipe. Sewer lines get patched and partially replaced over decades, so it is common for one line to be clay near the street, cast iron near the house, and a section of Orangeburg in between from a repair done sometime in the 1950s or 60s. The build date tells you what is likely, not what is actually down there.",
      },
      {
        type: "figure",
        src: "/blog/clay-cast-iron-orangeburg-pipe-seattle/three-pipe-materials-fail.webp",
        alt: "Diagram of how each older sewer pipe fails: clay at its rigid joints, cast iron as the wall thins from wet soil outside and sewer gas inside, and Orangeburg as soil pressure flattens the bore",
        caption: "The build date tells you what is likely, not what is there. One line can be all three, patched together over decades.",
      },
      { type: "h2", id: "clay-pipe", text: "Clay pipe: the original material, and still common under pre-1960s homes" },
      {
        type: "p",
        text: "Vitrified clay was the standard sewer pipe for most of the 20th century, and the clay itself is genuinely durable, often good for 50 to 100 years. The weak point is not the pipe, it is the joints. Clay was laid in short two to three foot sections, each sealed into the next with mortar or a tar based compound that does not flex. Decades of ground movement and freeze and thaw cycles work those rigid joints loose just enough for roots to find their way in and for sections to shift out of line.",
      },
      { type: "h2", id: "cast-iron-pipe", text: "Cast iron pipe: strong, but Seattle's soil works on it from both sides" },
      {
        type: "p",
        text: "Cast iron shows up as drain stacks inside the house and often as the section of lateral closest to the foundation in homes built up through the early 1960s. It fails from the outside first. Seattle's clay heavy soil holds moisture for most of the year, and that constant dampness corrodes cast iron steadily at its joints and at any low point where water sits. It can fail from the inside too, since the gases in a sewer line combine with moisture to form a mild acid that thins the pipe wall over enough decades. Where a cast iron stack meets a clay or Orangeburg lateral is also usually the weakest joint in the whole run.",
      },
      { type: "h2", id: "orangeburg-pipe", text: "Orangeburg pipe: a wartime substitute that was never meant to be permanent" },
      {
        type: "p",
        text: "Orangeburg is layers of wood pulp fiber pressed together and bound with tar, named for the New York town where most of it was made. It became the standard sewer pipe for new homes from roughly the mid 1940s through the late 1960s, when a wartime cast iron shortage and a postwar building boom created demand for something cheap, light, and fast to install. It was also only ever rated for about 50 years of service under ideal conditions, and it starts to lose its round shape under the weight of the surrounding soil around the 30 year mark. A pipe installed during that boom is now 56 to 81 years old, which puts most of what is still in the ground well past the point it was built to handle.",
      },
      {
        type: "figure",
        src: "/blog/clay-cast-iron-orangeburg-pipe-seattle/orangeburg-clock.webp",
        alt: "Timeline showing Orangeburg installed in 1945 is now 81 years old and installed in 1970 is now 56 years old, both past its roughly 50 year service life",
        caption: "Good for about 50 years. Both ends of the install window are past that today.",
      },
      { type: "h2", id: "failing-line-signs", text: "What a failing line actually looks like day to day" },
      {
        type: "p",
        text: "A joint pulling apart or a pipe losing its shape rarely announces itself all at once. More often it shows up as slow drains in more than one fixture at the same time, gurgling from a toilet or floor drain when another fixture runs, a backup that clears on its own and returns within a few days, a sewer smell near a cleanout or a low spot in the yard, or a patch of grass that stays unusually green or soggy over where the line runs.",
      },
      { type: "h2", id: "find-out-which-pipe", text: "How to find out which sewer pipe you actually have" },
      {
        type: "p",
        text: "Guessing from the house's age, or from what a neighbor's line turned out to be, is not a plan. A [camera inspection](/services/sewer-inspection) settles it directly. Gary's runs a self-leveling HD camera through the existing cleanout or a small access point, records the full length of the line, and uses a sonde transmitter to mark the exact depth and position of anything it finds, whether that is a root intrusion, a cracked joint, or a flattened section of pipe. You get the footage and a plain language summary before anyone talks about a repair.",
      },
      { type: "h2", id: "after-the-camera", text: "What happens after the camera goes down" },
      {
        type: "p",
        text: "If the line is structurally sound and the problem is open joints or root intrusion, [lining it from the inside](/services/trenchless-sewer-repair) with a cured-in-place liner fixes it without digging up the yard, and a standard residential lateral is often inspected, lined, and cured in one visit. If an Orangeburg section has already flattened too far, or a cast iron or clay section has collapsed, lining will not hold, and [pipe bursting](/services/pipe-bursting) or a [full replacement](/services/sewer-replacement) is the straightforward answer. Either way, the camera decides it, not a guess from the curb.",
      },
      {
        type: "figure",
        src: "/blog/clay-cast-iron-orangeburg-pipe-seattle/line-or-pull-new-pipe.webp",
        alt: "Two repair options: a cured-in-place liner for a pipe that still holds its shape, or a bursting head that pulls a new pipe through a flattened or collapsed one",
        caption: "Lining needs a host pipe that still holds its shape. That is the first thing the camera has to settle.",
      },
      {
        type: "p",
        text: "Gary's Pipelining runs camera inspections across [Seattle](/service-area/seattle-wa), [Tukwila](/service-area/tukwila-wa), [Renton](/service-area/renton-wa), [Bellevue](/service-area/bellevue-wa), [Tacoma](/service-area/tacoma-wa) and [Federal Way](/service-area/federal-way-wa), and can tell you on the spot whether what is under your home is clay, cast iron, or Orangeburg, and what shape it is in. Call **(206) 535-8460** to get one scheduled.",
      },
    ],
    faqs: [
      {
        q: "What kind of sewer pipe is under a pre-1970 Seattle home?",
        a: "Almost always clay, cast iron or Orangeburg, not PVC. Lines are patched over decades, so one line can contain all three, and a camera inspection is the only way to know for certain.",
      },
      {
        q: "What is Orangeburg pipe?",
        a: "Layers of wood pulp fiber pressed together and bound with tar. It was the standard sewer pipe for new homes from roughly the mid 1940s through the late 1960s, was rated for about 50 years, and starts to lose its round shape around 30.",
      },
      {
        q: "Why do clay sewer pipes fail?",
        a: "The clay itself is durable, often 50 to 100 years, but the rigid joints every two to three feet work loose with ground movement, letting roots in and sections shift out of line.",
      },
      {
        q: "Can an old Orangeburg or clay sewer line be lined instead of replaced?",
        a: "If the pipe still holds its shape, a cured-in-place liner can seal the joints from the inside without digging up the yard. If a section has flattened or collapsed, pipe bursting or a full replacement is the straightforward answer. The camera footage decides which.",
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
