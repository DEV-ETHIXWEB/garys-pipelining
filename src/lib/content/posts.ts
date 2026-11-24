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
  /** FAQ section heading; defaults to "Questions we hear most". */
  faqTitle?: string;
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
        phone: { label: "SPU (206) 386-1800", href: "tel:+12063861800" },
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
    faqTitle: "Side sewer questions we hear most",
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
  {
    slug: "tree-roots-sewer-line-seattle",
    title: "Tree Roots in Your Sewer Line: Why Seattle Homes Get Them and How to Stop Them for Good",
    metaTitle: "Tree Roots in Sewer Line Seattle: Causes and Permanent Fix",
    metaDescription:
      "Mature trees and aging pipe joints are a bad combination. Here is how roots get into a Seattle sewer line, and what actually keeps them out.",
    excerpt:
      "A root cannot punch through a sound pipe. It follows moisture into a loose joint, and cutting it out does not close the way in.",
    category: "Homeowner guide",
    publishedAt: "2026-11-17",
    cover: {
      src: "/blog/tree-roots-sewer-line-seattle/roots-find-the-gap.webp",
      alt: "Illustration of a tree root growing down into a loose joint in a sewer pipe, with the headline roots do not break your sewer pipe, they find the gap",
    },
    shareImage: "/blog/tree-roots-sewer-line-seattle/roots-find-the-gap-share.jpg",
    takeaways: [
      "Roots follow moisture into a loose joint or hairline crack. They do not punch through sound pipe.",
      "A rooter machine clears a blocked line fast, but it does not close the joint the roots came through.",
      "A cured-in-place liner leaves a jointless pipe inside the old one, so there is nothing left for a root to follow.",
    ],
    keywords: [
      "tree roots in sewer line Seattle",
      "tree roots sewer line",
      "root intrusion sewer pipe",
      "sewer line roots Seattle",
      "trenchless sewer lining Seattle",
      "rooter service Seattle",
    ],
    relatedServices: ["sewer-inspection", "rooter-service", "hydro-jetting", "trenchless-sewer-repair"],
    relatedLocations: ["seattle-wa", "tukwila-wa", "renton-wa", "bellevue-wa", "tacoma-wa", "federal-way-wa"],
    body: [
      {
        type: "p",
        text: "Most homeowners do not think about tree roots until a plumber pulls the cable back wrapped in them. A drain that was fine last week starts gurgling, slows down, and then backs up outright, and somewhere under the yard a sewer line has roots growing straight through a joint.",
      },
      {
        type: "p",
        text: "Root intrusion is one of the common reasons a sewer line backs up, and Seattle has the ingredients: mature trees, older clay and cast iron pipe, and plenty of rain. Here is how roots get in, the warning signs, and what actually keeps them out.",
      },
      { type: "h2", id: "how-roots-get-in", text: "Why roots find the pipe in the first place" },
      {
        type: "p",
        text: "A root does not punch through a solid pipe wall. What it follows is moisture and air leaking out through a joint, a hairline crack, or an old seal that has loosened with age. Once a fine root finds that gap it grows in, and the joint keeps widening to let a thicker root in behind it. Left alone, the root mass keeps filling the pipe.",
      },
      {
        type: "figure",
        src: "/blog/tree-roots-sewer-line-seattle/how-roots-get-in.webp",
        alt: "Three steps: a loose joint leaks moisture, a fine root follows it in and the joint widens, and the root mass fills the pipe and restricts the flow",
        caption: "A pipe with tight, sound joints gives roots nowhere to start. The pipe's condition and the roots are the same conversation.",
      },
      { type: "h2", id: "why-seattle", text: "Why older Seattle lines are exposed" },
      {
        type: "p",
        text: "A lot of Seattle was built before PVC was standard, so many homes still run on clay or cast iron under yards with mature trees. Clay pipe has rigid joints every two to three feet, and ground movement can work them loose. Older cast iron corrodes and cracks. Each of those is a gap a root can follow. Our guide to [what is under older Seattle homes](/blog/clay-cast-iron-orangeburg-pipe-seattle) covers each material.",
      },
      {
        type: "p",
        text: "Wet weather matters too. Rain saturates the soil, so roots have moisture to follow, and heavy flow through a partly blocked line is when a backup tends to show itself.",
      },
      { type: "h2", id: "warning-signs", text: "The warning signs worth paying attention to" },
      {
        type: "p",
        text: "A line with root intrusion rarely fails all at once. It usually tells you first: a drain that gurgles when another fixture runs, a toilet that is slower to clear than it used to be, or the same drain backing up every few months in roughly the same spot. None of those symptoms prove it is roots, but they are exactly the pattern a [camera inspection](/services/sewer-inspection) is built to check.",
      },
      { type: "h2", id: "cutting-roots", text: "Why cutting the roots out does not fix the real problem" },
      {
        type: "p",
        text: "A [rooter machine](/services/rooter-service), a motorized cable with a rotating cutting head, clears a blocked line fast, often the same day. That matters when a line is backed up right now.",
      },
      {
        type: "p",
        text: "What it does not do is fix the joint the roots came in through. Unless that entry point is sealed, the roots can grow back, and the same callout happens again. A line that backs up at the same spot over and over is telling you the joint is the problem, not the roots.",
      },
      {
        type: "figure",
        src: "/blog/tree-roots-sewer-line-seattle/rooter-or-liner.webp",
        alt: "Comparison: a rooter machine clears the line fast but leaves the joint the roots came through, while a cured-in-place liner leaves a jointless pipe with nothing for a root to follow",
        caption: "The camera decides which one fits, not a guess from the curb.",
      },
      { type: "h2", id: "permanent-fix", text: "The permanent fix: a liner with no joints left to find" },
      {
        type: "p",
        text: "The alternative is to stop giving roots a place to start. [Trenchless lining](/services/trenchless-sewer-repair) rebuilds the pipe from the inside: a resin-saturated liner is pulled or inverted through the existing line and cured hard against the pipe wall, leaving a smooth, jointless pipe inside the old one. With no joints, there is nothing for a root to follow in. Most residential laterals are inspected, lined and cured in a single visit, through one or two small access points rather than a trench across the yard.",
      },
      {
        type: "p",
        text: "Before any lining, the line is camera-inspected and [hydro jetted](/services/hydro-jetting) clean, so the repair is based on what is actually in the pipe, and a final camera pass confirms the result. Lining needs a pipe that still holds its shape. If a section has collapsed, the answer is [pipe bursting](/services/pipe-bursting) or a [full replacement](/services/sewer-replacement), and the camera settles which.",
      },
      { type: "h2", id: "if-roots-recur", text: "If roots keep coming back at your place" },
      {
        type: "p",
        text: "A one-off root clear is a reasonable fix for a one-time problem. A line that backs up at the same spot every year is telling you something different.",
      },
      {
        type: "p",
        text: "Gary's Pipelining works on root-related sewer problems across [Seattle](/service-area/seattle-wa), [Tukwila](/service-area/tukwila-wa), [Renton](/service-area/renton-wa), [Bellevue](/service-area/bellevue-wa), [Tacoma](/service-area/tacoma-wa) and [Federal Way](/service-area/federal-way-wa). The camera comes first, so you know whether a rooter visit will hold or whether it is time to line the pipe. Call **(206) 535-8460** for a free estimate, or any time at all if a line is backing up now.",
      },
    ],
    faqs: [
      {
        q: "How do tree roots get into a sewer line?",
        a: "Roots follow moisture and air leaking out through a loose joint, a hairline crack or an old seal. They do not punch through sound pipe. Once a fine root finds a gap it grows in, and the joint widens to let a thicker root follow.",
      },
      {
        q: "Does a rooter machine fix tree roots in a sewer line?",
        a: "It clears the blockage fast, often the same day, which matters when a line is backed up. It does not seal the joint the roots came through, so the roots can come back.",
      },
      {
        q: "How do you stop tree roots from coming back?",
        a: "Close the way in. A cured-in-place liner leaves a smooth, jointless pipe inside the old one, so there are no joints left for roots to follow. A camera inspection first confirms the pipe is a good fit for lining.",
      },
      {
        q: "Is lining a sewer line a one-day job?",
        a: "On most residential laterals the line is inspected, lined and cured in a single visit, through one or two small access points. If a section has collapsed, pipe bursting or a full replacement is the straightforward answer.",
      },
    ],
  },
  {
    slug: "sewer-camera-inspection-seattle",
    title: "What a Sewer Camera Inspection Actually Shows You",
    metaTitle: "Sewer Camera Inspection Seattle: What the Camera Shows",
    metaDescription:
      "A sewer camera inspection in Seattle shows what is wrong under your yard: roots, cracks and bellies, before you pay to fix the wrong thing.",
    excerpt:
      "A camera goes down the line, records what is there, and marks each defect above ground. Here is what it shows and what usually happens next.",
    category: "Homeowner guide",
    publishedAt: "2026-11-18",
    cover: {
      src: "/blog/sewer-camera-inspection-seattle/camera-shows-the-defect.webp",
      alt: "Illustration of a sewer camera in a pipe with a locator marker above ground, with the headline know what is wrong before you pay to fix the wrong thing",
    },
    shareImage: "/blog/sewer-camera-inspection-seattle/camera-shows-the-defect-share.jpg",
    takeaways: [
      "A camera records the whole line, and a sonde locator marks each defect above ground.",
      "Roots, offset joints, bellies, cracks, corrosion and buildup are the six findings that show up again and again.",
      "What fixes the line depends on the footage, so the repair matches the problem instead of a guess.",
    ],
    keywords: [
      "sewer camera inspection Seattle",
      "sewer scope Seattle",
      "sewer line camera inspection",
      "sewer inspection before buying a house",
      "sewer line problems Seattle",
    ],
    relatedServices: ["sewer-inspection", "hydro-jetting", "trenchless-sewer-repair", "sewer-replacement"],
    relatedLocations: ["seattle-wa", "tukwila-wa", "renton-wa", "bellevue-wa", "tacoma-wa", "federal-way-wa"],
    body: [
      {
        type: "p",
        text: "A drain that clears after a plunge and then slows again a few weeks later. A gurgle from the tub whenever the washing machine drains. A backup that seems to come out of nowhere and then clears on its own. These are the moments most homeowners call a plumber, and a snake or a round of hydro jetting is often exactly the right fix.",
      },
      {
        type: "p",
        text: "The problem is paying for that fix without knowing what is actually wrong under the yard. A line that keeps backing up for a structural reason will keep backing up no matter how many times it gets cleared. A sewer camera inspection answers the question directly: a camera goes down the line, records what is there, and shows the defect on video instead of leaving it to a theory.",
      },
      { type: "h2", id: "how-it-works", text: "How a sewer camera inspection works" },
      {
        type: "p",
        text: "The process is simple. A technician feeds a self-leveling HD camera through an existing cleanout or access point and records the full length of the line, narrating defects as they appear. A sonde transmitter travels with the camera and locates each defect from above ground, so a problem seen on camera can be marked on the lawn. No digging happens at this stage. You get the video and a plain-language written report, and any repair recommendation follows from what the footage shows.",
      },
      { type: "h2", id: "what-the-camera-shows", text: "What the camera actually shows" },
      {
        type: "p",
        text: "Six things show up on a sewer camera again and again, and a line can have more than one at once:",
      },
      {
        type: "figure",
        src: "/blog/sewer-camera-inspection-seattle/six-things-a-camera-finds.webp",
        alt: "Six sewer line defects a camera finds: root intrusion, offset joints, bellies, cracks and fractures, corrosion, and blockages and buildup",
        caption: "A line can have more than one at once. Each one is seen on video, not guessed at.",
      },
      {
        type: "p",
        text: "**Root intrusion** is a root that has worked into a joint or hairline crack and fanned out inside the pipe, often restricting flow long before a backup. **Offset or separated joints** are sections that have shifted apart, letting soil and roots in and sewage out. **Bellies** are low spots where the pipe has sagged and waste pools instead of draining. **Cracks and fractures** are damage in the pipe wall from ground movement, age or roots. **Corrosion** is old pipe material, most often cast iron or Orangeburg, breaking down rather than just blocked. **Blockages and buildup** are grease, sediment or scale narrowing the usable width of the pipe.",
      },
      {
        type: "p",
        text: "Roots deserve their own explanation, because they are the finding most often behind a repeat backup. Our guide to [tree roots in sewer lines](/blog/tree-roots-sewer-line-seattle) explains how they get in and what keeps them out.",
      },
      { type: "h2", id: "older-seattle-homes", text: "Why it matters in older Seattle homes" },
      {
        type: "p",
        text: "Many Seattle homes were built before the 1970s, when clay and cast iron were standard sewer pipe materials, not PVC. Those are also the materials where root intrusion and corrosion show up most. Our guide to [what is under older Seattle homes](/blog/clay-cast-iron-orangeburg-pipe-seattle) covers each one.",
      },
      {
        type: "p",
        text: "A camera also helps tell two situations apart. Parts of Seattle have combined sewer systems, and heavy rain can overload them and cause a backup that has little to do with your own line. Looking inside the line shows whether the problem is yours or not, instead of assuming the worst, or the best, about a line nobody has looked at. If you are not sure where your responsibility ends, see [who owns the pipe under your yard](/blog/side-sewer-seattle-who-owns-it).",
      },
      { type: "h2", id: "when-to-scope", text: "When it is worth scoping the line" },
      {
        type: "p",
        text: "**A drain or backup that keeps coming back,** even after clearing it. That usually means the cause is structural rather than a simple clog.",
      },
      {
        type: "p",
        text: "**Buying or selling a home with an older sewer line** and no inspection history. A pre-purchase scope can catch problems no walkthrough would, and you keep the footage for the purchase decision or an insurance claim.",
      },
      {
        type: "p",
        text: "**Major tree or landscaping work near the line,** since roots can shift or re-enter even after a tree is removed.",
      },
      {
        type: "p",
        text: "**An older home with no known inspection history,** simply to know what is down there before it becomes a weekend emergency.",
      },
      { type: "h2", id: "what-it-costs", text: "What a sewer camera inspection costs" },
      {
        type: "p",
        text: "The price depends mostly on the length of the line, the pipe material, and how hard the access point is to reach. A short, straightforward run is the simplest case, while a long or older line, or an access point that takes work to reach, adds to it. Call for a quote for your property. Whatever the inspection finds is quoted separately, since the inspection and the repair are two different jobs.",
      },
      { type: "h2", id: "after-the-inspection", text: "What happens after the inspection" },
      {
        type: "p",
        text: "You get the video and the written report first, and there is no obligation to book a repair with us. What fixes a line depends on what the camera found. Buildup and light root intrusion are usually a [hydro jetting](/services/hydro-jetting) job. A cracked, offset or root-damaged section in an otherwise sound line is often a candidate for [trenchless repair](/services/trenchless-sewer-repair), which relines the pipe through the existing access point instead of digging up the yard. A line with collapse or damage across a long stretch is where [full replacement](/services/sewer-replacement) is the honest answer.",
      },
      {
        type: "figure",
        src: "/blog/sewer-camera-inspection-seattle/match-the-fix.webp",
        alt: "Each camera finding matched to its repair: buildup or light roots to hydro jetting, a cracked or offset section to trenchless lining, and collapse over a long stretch to full replacement",
        caption: "The point is not paying for the wrong fix twice. What fits depends entirely on the footage.",
      },
      {
        type: "p",
        text: "Gary's Pipelining offers sewer camera inspections across [Seattle](/service-area/seattle-wa), [Tacoma](/service-area/tacoma-wa), [Bellevue](/service-area/bellevue-wa), [Renton](/service-area/renton-wa), [Tukwila](/service-area/tukwila-wa) and [Federal Way](/service-area/federal-way-wa). See [what a sewer inspection includes](/services/sewer-inspection), then call **(206) 535-8460** to schedule.",
      },
    ],
    faqs: [
      {
        q: "What does a sewer camera inspection show?",
        a: "Root intrusion, offset or separated joints, bellies, cracks and fractures, corrosion in old pipe, and blockages or buildup. A line can have more than one at once, and a sonde locator marks each defect above ground.",
      },
      {
        q: "Do I need to be home for a sewer camera inspection?",
        a: "Not necessarily. The technician needs access to a cleanout or other entry point, and the video report can be sent directly to you.",
      },
      {
        q: "Should I scope the sewer line before buying a house?",
        a: "Yes, on an older home especially. A sewer scope before closing can catch problems a visual walkthrough never would, and you keep the footage.",
      },
      {
        q: "Am I obligated to book a repair after the inspection?",
        a: "No. The inspection is the deliverable. You get the footage and a written report, and what you do with the findings is up to you.",
      },
    ],
  },
  {
    slug: "signs-failing-sewer-line-seattle",
    title: "8 Signs of a Failing Sewer Line in Seattle (And What to Do Before It Backs Up)",
    metaTitle: "8 Signs of a Failing Sewer Line in Seattle",
    metaDescription:
      "Discover 8 signs of a failing sewer line in Seattle, what causes them, and when to schedule a professional sewer inspection.",
    excerpt:
      "Slow drains, gurgling toilets and clogs that keep coming back can point to the main line. Here are the 8 signs to watch for and what to do next.",
    category: "Homeowner guide",
    publishedAt: "2026-11-23",
    cover: {
      src: "/blog/signs-failing-sewer-line-seattle/beneath-your-home.webp",
      alt: "Illustration of the sewer line beneath a Seattle home showing root intrusion at a damaged joint, a separated pipe connection, a sagging belly and a cracked pipe before the public sewer main",
    },
    shareImage: "/blog/signs-failing-sewer-line-seattle/beneath-your-home-share.jpg",
    takeaways: [
      "Several slow drains at once, gurgling and clogs that keep returning point further down the line than one fixture.",
      "Sewage backing up into a tub or floor drain is urgent: stop using water and call for help.",
      "A camera inspection finds the cause first, so the fix matches the problem instead of a guess.",
    ],
    keywords: [
      "failing sewer line Seattle",
      "signs of a failing sewer line",
      "sewer line problems Seattle",
      "main sewer line symptoms",
      "sewer line inspection Seattle",
      "sewer backup warning signs",
      "side sewer Seattle",
      "trenchless sewer repair Seattle",
    ],
    relatedServices: ["sewer-inspection", "drain-cleaning", "trenchless-sewer-repair", "sewer-replacement"],
    relatedLocations: ["seattle-wa", "tukwila-wa", "renton-wa", "bellevue-wa", "tacoma-wa", "federal-way-wa"],
    body: [
      {
        type: "p",
        text: "A sewer line can develop problems long before wastewater enters your home. Early clues may include a toilet that bubbles after a flush, several slow drains, or an unpleasant smell that keeps returning.",
      },
      {
        type: "p",
        text: "These symptoms have several possible causes, but when they recur together, they may point to a main sewer line problem. Recognizing them early can help Seattle homeowners limit damage.",
      },
      { type: "h2", id: "eight-signs", text: "8 signs of a failing sewer line" },
      {
        type: "p",
        text: "**1. Multiple drains are slowing down.** One slow sink may have a local clog. If several fixtures, such as a shower, toilets, and sinks, begin draining slowly around the same time, the restriction may be farther down the drainage system. A shared drain or main sewer line could be involved.",
      },
      {
        type: "figure",
        src: "/blog/signs-failing-sewer-line-seattle/one-drain-or-the-main.webp",
        alt: "Illustration comparing one slow drain in a single bathroom, which is usually a local or branch clog, with several slow and gurgling fixtures across the house that point to a shared drain or the main sewer line, and wastewater backing up into a basement",
        caption: "One slow drain is usually a local clog. Several at once point further down the line.",
      },
      {
        type: "p",
        text: "**2. Toilets and drains gurgle.** Bubbling after a flush or gurgling when the washing machine drains can indicate trapped air or restricted wastewater flow. Repeated noises across fixtures deserve attention, particularly with slow drains or recurring clogs.",
      },
      {
        type: "p",
        text: "**3. Clogs keep coming back.** A drain that repeatedly clogs after being cleared may have an underlying problem. Tree roots, damaged joints, or sagging pipe sections can create places where waste and debris collect. Clearing the immediate blockage may not fix the cause. If the same problem returns, consider a professional [sewer inspection](/services/sewer-inspection).",
      },
      {
        type: "p",
        text: "**4. You notice persistent sewer odors.** A lingering sewage smell in a basement, bathroom, or yard deserves investigation. Damaged connections, dry plumbing traps, and ventilation problems can all cause odors, so smell alone cannot confirm underground pipe damage.",
      },
      {
        type: "p",
        text: "**5. Your yard has unusually wet or green patches.** A patch of grass that stays greener than the surrounding lawn, or ground that remains unusually wet, may indicate an underground leak. However, irrigation problems, poor drainage, and leaking water lines can cause similar changes. Have persistent changes along the suspected sewer route checked.",
      },
      {
        type: "p",
        text: "**6. Wastewater backs up into tubs or floor drains.** This is an urgent warning sign. Wastewater rising in a bathtub when a toilet is flushed, or sewage appearing in a basement floor drain, can indicate a serious blockage or sewer problem.",
      },
      {
        type: "callout",
        title: "Sewage coming back up? Stop using water",
        text: "Stop using water throughout the home. Keep children and pets away, avoid contact with sewage, and contact a plumbing professional. Follow [Seattle Public Utilities' sewer backup guidance](https://www.seattle.gov/utilities/your-services/sewer-and-drainage/side-sewers/backups) and take precautions around electrical hazards.",
      },
      {
        type: "p",
        text: "**7. The ground above your sewer line starts settling.** An unexplained depression or sunken patch along the suspected sewer route deserves investigation. In some cases, damaged joints allow surrounding soil to enter a pipe. Soil movement can contribute to voids beneath the surface and ground settlement. Not every sunken area indicates sewer damage. Keep people and vehicles away until unstable ground is assessed.",
      },
      {
        type: "p",
        text: "**8. Your older home has no sewer inspection history.** This is not proof of sewer failure, but it is a reason to consider an inspection. Older Seattle properties may have clay, cast-iron, or Orangeburg pipe, and some lines contain a mix of materials from previous repairs. Age alone does not determine pipe condition. A camera inspection can help identify visible defects, root intrusion, and other concerns. Read our guide to [older sewer pipe materials in Seattle homes](/blog/clay-cast-iron-orangeburg-pipe-seattle).",
      },
      { type: "h2", id: "side-sewer", text: "Why Seattle homeowners should understand their side sewer" },
      {
        type: "p",
        text: "A side sewer carries wastewater from a property to the public sewer main. Seattle Public Utilities says property owners are generally responsible for their side sewer up to its connection with the public main. Shared side sewers can involve additional maintenance responsibilities.",
      },
      {
        type: "figure",
        src: "/blog/side-sewer-seattle/where-your-side-sewer-ends.webp",
        alt: "Diagram showing a side sewer running from the house, past the property line, under the sidewalk and street to the city sewer main. Everything up to the main is the owner's; only the main belongs to SPU.",
        caption: "It does not stop at the property line. It runs all the way to the city main under the street.",
      },
      {
        type: "p",
        text: "Learn more about responsibilities from [Seattle Public Utilities' side sewer resource](https://www.seattle.gov/utilities/your-services/sewer-and-drainage/side-sewers), or read our guide to [who owns the side sewer in Seattle](/blog/side-sewer-seattle-who-owns-it).",
      },
      { type: "h2", id: "what-to-do", text: "What should you do if you notice these warning signs?" },
      {
        type: "p",
        text: "Symptoms do not automatically mean the entire line needs replacing. First, identify the cause. A camera inspection lets a technician look for cracks, root intrusion, offset joints, blockages, and sagging sections. Gary's Pipelining & Drain Cleaning offers [sewer inspection services](/services/sewer-inspection).",
      },
      {
        type: "p",
        text: "Depending on the findings, possible solutions include [drain cleaning](/services/drain-cleaning), which removes debris and obstructions that restrict wastewater flow; [trenchless sewer repair](/services/trenchless-sewer-repair), where pipe lining or pipe bursting may repair certain pipes while reducing excavation, when conditions allow; and [sewer replacement](/services/sewer-replacement) for severely damaged or collapsed sections.",
      },
      {
        type: "p",
        text: "The right approach depends on pipe condition and site layout. Trenchless repair is not suitable for every line. For more on sewage exposure risks, see the [EPA's sanitary sewer overflow guidance](https://www.epa.gov/npdes/sanitary-sewer-overflow-sso-frequent-questions).",
      },
      {
        type: "callout",
        title: "Get your sewer line checked before it backs up",
        text: "Investigate recurring symptoms before wastewater enters your home. Gary's Pipelining & Drain Cleaning provides sewer inspections, trenchless repairs, and sewer replacement in the Seattle area. Call or [request your free estimate](/contact).",
        phone: { label: "(206) 535-8460", href: "tel:+12065358460" },
      },
    ],
    faqTitle: "Sewer line questions we hear most",
    faqs: [
      {
        q: "How do I know if my main sewer line is failing?",
        a: "Several slow drains, recurring clogs, gurgling toilets, persistent odors, and wastewater backups can indicate a main sewer line problem. These symptoms are not conclusive; an inspection can help identify the cause.",
      },
      {
        q: "Can a sewer line fail without warning?",
        a: "Yes. A line can become blocked or collapse unexpectedly. Recurring drainage problems, unusual odors, and changes in your yard may provide earlier clues.",
      },
      {
        q: "How often should a sewer line be inspected?",
        a: "No schedule fits every home. Pipe material, age, repair history, and recurring symptoms all matter.",
      },
      {
        q: "Does sewer line repair always require digging?",
        a: "No. Trenchless methods can reduce excavation when the pipe and site conditions are suitable. Severely damaged or collapsed sections may require traditional excavation.",
      },
    ],
  },
  {
    slug: "water-service-line-repair-seattle",
    title: "Water Service Line Repair in Seattle: Who Pays for the Pipe From the Meter to Your House?",
    metaTitle: "Seattle Water Service Line Repair: Who Pays?",
    metaDescription:
      "Learn who pays for a leaking Seattle water service line, where SPU responsibility ends, and what to do before repairs are covered.",
    excerpt:
      "A high bill, a wet patch of lawn, low pressure everywhere. Before anyone digs, find out whether the leak is on your side of the city's union or SPU's.",
    category: "Homeowner guide",
    publishedAt: "2026-11-25",
    cover: {
      src: "/blog/water-service-line-repair-seattle/meter-to-house-whose-pipe.webp",
      alt: "Diagram of a Seattle water service: the water main under the street feeds the meter, SPU's side ends at the city union beside the meter, and the private line from the union to the house belongs to the homeowner",
    },
    shareImage: "/blog/water-service-line-repair-seattle/meter-to-house-whose-pipe-share.jpg",
    takeaways: [
      "SPU's water service ends at the city's union by the meter. The private line from there to the house is the owner's to maintain.",
      "A 30-minute meter test with everything off tells you whether a leak is inside the house or underground.",
      "SPU must inspect any repaired or replaced line before it is covered, and won't accept photos instead.",
    ],
    keywords: [
      "water service line repair Seattle",
      "Seattle water line leak repair",
      "private water line repair Seattle",
      "Seattle water service line replacement",
      "SPU water service union",
      "water meter leak detection",
      "trenchless water line replacement",
      "water main repair Seattle",
    ],
    relatedServices: ["water-main-repair", "pipe-bursting", "trenchless-sewer-repair"],
    relatedLocations: ["seattle-wa", "tukwila-wa", "renton-wa", "bellevue-wa", "tacoma-wa", "federal-way-wa"],
    body: [
      {
        type: "p",
        text: "A water bill jumps. A patch of lawn stays wet. Pressure drops all over the house. Before anyone digs, Seattle homeowners need to know whether the leak is on their side or on Seattle Public Utilities' (SPU's) side.",
      },
      {
        type: "p",
        text: "The water service line brings drinking water in from the public main. It is a different pipe from the side sewer, which carries wastewater out. For that one, see our guide to [Seattle side sewer responsibility](/blog/side-sewer-seattle-who-owns-it).",
      },
      { type: "h2", id: "where-spu-ends", text: "Where does SPU's water service end?" },
      {
        type: "p",
        text: "SPU's service runs from the water main, through the meter, to the **city's union**, the fitting where private pipe is allowed to connect. From that union to the building's plumbing, the line is private and the property owner maintains it.",
      },
      {
        type: "p",
        text: "So \"from the meter to the house\" is useful shorthand, but the official boundary is the union. SPU's [private water line requirements](https://www.seattle.gov/utilities/construction-resources/water/water-line-inspections) say the customer's pipe must connect to the city's union only. If you are unsure where it sits on your property, ask SPU.",
      },
      { type: "h2", id: "who-pays", text: "Who pays for a water service line leak?" },
      {
        type: "p",
        text: "Leaks past the city union are generally the owner's to repair. If you suspect the leak is on SPU's side, contact SPU.",
      },
      {
        type: "p",
        text: "SPU offers billing adjustments for most types of leaks, but approval is not automatic. Under its [leak adjustment requirements](https://www.seattle.gov/utilities/your-services/accounts-and-payments/bills-and-payments/my-bill-seems-too-high/leak-adjustments), the repair must be completed within 60 days of the first high bill. For an underground leak between the meter and the house, an inspection is required, so contact SPU before the repair is covered. Call **(206) 684-5800** to ask about eligibility.",
      },
      { type: "h2", id: "four-signs", text: "Four signs your water service line may be leaking" },
      {
        type: "p",
        text: "No single symptom confirms a service line leak, but these are the clues to watch for.",
      },
      {
        type: "p",
        text: "**1. An unexplained high water bill.** Compare usage with your normal pattern for the same season.",
      },
      {
        type: "p",
        text: "**2. A meter that moves with the water off.** Turn off faucets and water-using appliances, note the meter dial, and check it again after 30 minutes.",
      },
      {
        type: "p",
        text: "**3. Ground that stays wet.** Damp or soft soil along the route between the meter and the house can point to a buried leak.",
      },
      {
        type: "p",
        text: "**4. Low pressure throughout the home.** A whole-house pressure drop can point to a supply problem, though it has other possible causes.",
      },
      {
        type: "figure",
        src: "/blog/water-service-line-repair-seattle/thirty-minute-meter-test.webp",
        alt: "Three-step meter test: turn all water off and note the 1 cubic foot dial, wait 30 minutes and read again, then close the building shut-off. If the dial stops the leak is inside; if it keeps moving the leak is underground between the meter and the shut-off valve.",
        caption: "SPU's meter test narrows it down: inside the house, or underground between the meter and the shut-off.",
      },
      {
        type: "p",
        text: "If the dial has moved, close the building's main shut-off valve. If the dial then stops, the leak is inside. If it keeps moving, SPU says the leak is underground, between the meter and the shut-off valve. Follow [SPU's leak detection steps](https://www.seattle.gov/utilities/your-services/water/metering/detect-leaks). Treat it as a screening check, not a diagnosis.",
      },
      { type: "h2", id: "repair-or-replace", text: "Should you repair one section or replace the line?" },
      {
        type: "p",
        text: "A spot repair can suit an isolated leak when the rest of the pipe is sound. Replacement makes more sense when corrosion, failing joints or repeat leaks affect a longer stretch.",
      },
      {
        type: "p",
        text: "We locate the failure with pressure testing and acoustic or visual methods, then repair the affected section or replace the full line based on its age, material and condition. When the site allows, a full replacement can be done trenchless, though [pipe bursting](/services/pipe-bursting) still needs an access pit at each end. See our [water main repair service](/services/water-main-repair).",
      },
      { type: "h2", id: "before-backfill", text: "What must happen before the trench is covered?" },
      {
        type: "p",
        text: "Before any digging, request an underground utility locate through 811. Washington's [Dig Law](https://www.utc.wa.gov/public-safety/pipeline-safety/call-you-dig/dig-law) asks excavators for two to ten full business days' notice before the work-to-begin date. Since January 1, 2026, digging cannot start until every operator with underground facilities in the area has responded.",
      },
      {
        type: "p",
        text: "SPU must [inspect all water service piping outside the building](https://www.seattle.gov/utilities/construction-resources/water/water-line-inspections) before it is covered, whether it is new, repaired or replaced. If it is covered before approval, the whole line has to be uncovered again. SPU does not accept photos or videos instead.",
      },
      {
        type: "figure",
        src: "/blog/water-service-line-repair-seattle/before-the-trench-is-covered.webp",
        alt: "Four steps: call 811 two to ten full business days before work begins, wait for every operator to respond, repair or replace the line, then have SPU inspect it before covering. SPU inspection lines are (206) 684-5803 from 8 to 9 a.m. and (206) 684-5800 after 9 a.m.",
        caption: "Locate before you dig. Inspect before you cover.",
      },
      {
        type: "callout",
        title: "Book the SPU inspection before you backfill",
        text: "Call **(206) 684-5803** between 8 and 9 a.m., or **(206) 684-5800** after 9 a.m., for a same-day inspection. Keep the inspection report the inspector leaves. For water coming from the street or flooding the street, call SPU's 24/7 Operations Response Center.",
        phone: { label: "SPU (206) 386-1800", href: "tel:+12063861800" },
      },
      { type: "h2", id: "get-help", text: "Need help with a water line leak in Seattle?" },
      {
        type: "callout",
        title: "Find the leak before anyone digs",
        text: "Gary's Pipelining & Drain Cleaning locates, repairs and replaces water service lines across [Seattle](/service-area/seattle-wa) from our Tukwila base, with 24/7 emergency dispatch. Call or [request your free estimate](/contact).",
        phone: { label: "(206) 535-8460", href: "tel:+12065358460" },
      },
    ],
    faqTitle: "Water line questions we hear most",
    faqs: [
      {
        q: "Is the water pipe from the meter to my house my responsibility?",
        a: "Yes, from SPU's city union to the building's plumbing. The union is the fitting by the meter where private pipe connects. Confirm the boundary for your property with SPU.",
      },
      {
        q: "Will SPU lower my bill after an underground leak?",
        a: "SPU offers adjustments for most leaks, but you have to meet its requirements, including finishing the repair within 60 days of the first high bill. For an underground leak, contact SPU before the repair is covered.",
      },
      {
        q: "How can I tell whether a leak is inside or outside?",
        a: "With all water off, compare two meter readings 30 minutes apart. If the dial moved, close the building shut-off. If it keeps moving, the leak is underground between the meter and that valve.",
      },
      {
        q: "Can a water service line be replaced without digging up the whole yard?",
        a: "Often, yes. Trenchless methods can cut down excavation, but whether they fit depends on the pipe's condition, route, access and site conditions.",
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
