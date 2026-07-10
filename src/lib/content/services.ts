export type FaqItem = { q: string; a: string };
export type BulletItem = { title: string; body: string };

export type ServiceCategory = "Pipelining" | "Drain Services" | "Inspection" | "Water Lines";

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  category: ServiceCategory;
  icon: string;
  heroImage: string;
  heroHeadline: string;
  heroSubheadline: string;
  problem: string;
  solution: string[];
  benefitsTagline?: string;
  benefits: BulletItem[];
  process: BulletItem[];
  technology?: string;
  faqs: FaqItem[];
  relatedSlugs: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "trenchless-sewer-repair",
    name: "Trenchless Sewer Repair",
    shortDescription: "Restore a damaged sewer line from the inside out, no excavation required.",
    category: "Pipelining",
    icon: "Cog",
    heroImage: "/photos/real/job-04.webp",
    heroHeadline: "Repair the line. Leave the yard alone.",
    heroSubheadline:
      "Cured-in-place pipe (CIPP) lining rebuilds a cracked, root-intruded, or offset sewer line through a single access point, no trench across your lawn or driveway.",
    problem:
      "A sewer line doesn't have to collapse to be a problem. Root intrusion, offset joints, bellies, and corroded cast iron or clay pipe all show up the same way: slow drains, gurgling, recurring backups, or a camera inspection report with bad news. The traditional fix, dig up the line and replace it, means torn-up landscaping, broken concrete, and days of work.",
    solution: [
      "We start every job with a full HD camera inspection so we know exactly where the damage is and how long the liner needs to be. A flexible, resin-saturated liner is then pulled or inverted into the existing pipe and inflated against the pipe wall, then cured in place, either with hot water, steam, or UV light depending on the line.",
      "Once cured, the result is a smooth, jointless pipe within a pipe, structurally rated to last decades, with no seams for roots to find. Most residential laterals are lined in a single day.",
    ],
    benefitsTagline: "no trench required.",
    benefits: [
      { title: "One or two access points", body: "No trench along the pipe run, just small excavations at the access pits." },
      { title: "Same-day in most homes", body: "A standard residential lateral is typically inspected, lined, and cured in a single visit." },
      { title: "No joints for roots", body: "A seamless liner removes the joints that root intrusion exploits in the first place." },
      { title: "Long service life", body: "Properly installed CIPP liners carry a multi-decade structural rating." },
    ],
    process: [
      { title: "Camera & locate", body: "We scope the full line and mark the access points." },
      { title: "Clean the host pipe", body: "Hydro jetting clears roots, scale, and debris so the liner bonds properly." },
      { title: "Install & cure the liner", body: "The resin-saturated liner is set and cured against the existing pipe wall." },
      { title: "Re-inspect & reconnect", body: "A final camera pass confirms the liner and any lateral reconnections." },
    ],
    technology:
      "We use cured-in-place lining systems rated for residential and light-commercial sewer laterals, paired with self-leveling HD camera equipment for pre- and post-install verification.",
    faqs: [
      {
        q: "Will lining work on my pipe?",
        a: "In most cases, yes, CIPP lining works on clay, cast iron, Orangeburg, and PVC lines with offset joints, cracks, or root intrusion. A fully collapsed or severely bellied section may need pipe bursting instead, which we'll tell you plainly after the camera inspection.",
      },
      {
        q: "How long does the liner last?",
        a: "Properly cured CIPP liners are rated for decades of service life under normal residential use.",
      },
      {
        q: "Do you need to dig up my whole yard?",
        a: "No. Lining only requires access at the existing cleanout or a small excavation at each end of the run, not a trench along its length.",
      },
    ],
    relatedSlugs: ["pipe-bursting", "sewer-inspection", "sewer-replacement"],
    featured: true,
  },
  {
    slug: "pipe-bursting",
    name: "Pipe Bursting",
    shortDescription: "Full pipe replacement pulled through two small access points, for lines too damaged to line.",
    category: "Pipelining",
    icon: "Hammer",
    heroImage: "/photos/real/job-02.webp",
    heroHeadline: "A full replacement, without the open trench.",
    heroSubheadline:
      "When a line is too collapsed, bellied, or undersized to line, pipe bursting pulls a brand-new pipe through the old one's path, trenchless, even for full replacement.",
    problem:
      "Some sewer and water lines are past the point lining can fix: a fully collapsed section, a severe belly that won't drain, or a line that needs to be upsized. The old answer was to excavate the entire run, which on a mature property usually means a fence, a tree, or a driveway in the way.",
    solution: [
      "Pipe bursting uses a bursting head, pneumatic or static, pulled through the existing pipe on a cable. As it travels, it fractures the old pipe outward into the surrounding soil while simultaneously pulling a new HDPE pipe into the space left behind.",
      "Because the new pipe is fused, jointless HDPE, you end up with a full-diameter (or larger) replacement line with none of the joint weaknesses of the original, accessed through pits at each end of the run instead of an open trench.",
    ],
    benefits: [
      { title: "True replacement, not a patch", body: "A new pipe, not a liner inside an old one, the right call for fully failed lines." },
      { title: "Can upsize the line", body: "Bursting can increase pipe diameter where capacity is the issue, not just condition." },
      { title: "Two access pits, not a trench", body: "Landscaping, hardscape, and structures along the run are left undisturbed." },
      { title: "Handles severe damage", body: "Works on collapsed, badly bellied, or root-shattered sections lining can't reach." },
    ],
    process: [
      { title: "Inspect & plan the pull", body: "Camera inspection confirms the line path, depth, and condition." },
      { title: "Dig two access pits", body: "One at each end of the section being replaced." },
      { title: "Burst & pull the new line", body: "The bursting head fractures the old pipe while pulling in fused HDPE." },
      { title: "Reconnect & test", body: "Connections are tied back in and the line is flow-tested before backfill." },
    ],
    faqs: [
      {
        q: "How is this different from lining?",
        a: "Lining rebuilds the inside of an existing, structurally intact pipe. Bursting replaces the pipe entirely, which is the right call when the existing line is too damaged or undersized to line.",
      },
      {
        q: "Will this disturb my landscaping?",
        a: "Only at the two access pits. The path between them is not excavated.",
      },
      {
        q: "Can pipe bursting increase my pipe size?",
        a: "Yes, within limits, bursting can pull in a larger-diameter replacement pipe in the same operation.",
      },
    ],
    relatedSlugs: ["trenchless-sewer-repair", "sewer-replacement", "water-main-repair"],
  },
  {
    slug: "sewer-replacement",
    name: "Sewer Replacement",
    shortDescription: "Trenchless or open-cut sewer line replacement, scoped honestly after a camera inspection.",
    category: "Pipelining",
    icon: "Wrench",
    heroImage: "/photos/real/job-01.webp",
    heroHeadline: "When the line needs to come out, not just be repaired.",
    heroSubheadline:
      "Some sewer laterals, badly bellied, fully collapsed, or simply at the end of their life, need full replacement. We'll tell you when that's the actual answer, and do it with the least disruption the site allows.",
    problem:
      "Not every failing sewer line can be saved with a liner. Aging clay and Orangeburg pipe, severe bellies that trap waste, or a line crushed by tree roots or settling soil sometimes needs to come out completely. The question isn't whether to replace it, it's how much of your property has to be torn up to do it.",
    solution: [
      "We default to trenchless replacement methods, primarily pipe bursting, whenever site conditions allow, replacing the line through two access pits instead of a full trench.",
      "Where trenchless isn't possible (utility conflicts, very shallow lines, structural obstructions) we'll scope a traditional open-cut replacement, with a clear written estimate before any digging starts.",
    ],
    benefits: [
      { title: "Camera-verified scope", body: "Every replacement estimate is based on what the camera actually shows, not a guess." },
      { title: "Trenchless by default", body: "We replace via pipe bursting whenever the site allows it." },
      { title: "Flat, written pricing", body: "The number we quote after inspection is the number you pay." },
      { title: "Code-compliant tie-ins", body: "New cleanouts and connections are installed to current code." },
    ],
    process: [
      { title: "Camera inspection", body: "Confirms condition, depth, and the best replacement method." },
      { title: "Written estimate", body: "Trenchless and open-cut options are scoped and priced." },
      { title: "Replacement", body: "New pipe is installed via bursting or excavation, per the agreed scope." },
      { title: "Test & restore", body: "Flow-tested, then the site is restored as close to original condition as possible." },
    ],
    faqs: [
      {
        q: "How do you decide between lining, bursting, and full replacement?",
        a: "It comes down to what the camera shows. Intact pipe with cracks or root intrusion gets lined. Collapsed or undersized pipe gets burst or replaced. We walk you through the footage and the reasoning, not just the price.",
      },
      {
        q: "Do I need a permit?",
        a: "Sewer lateral replacement in our service area typically requires a permit, which we pull and manage as part of the job.",
      },
    ],
    relatedSlugs: ["pipe-bursting", "trenchless-sewer-repair", "sewer-inspection"],
  },
  {
    slug: "water-main-repair",
    name: "Water Main Repair",
    shortDescription: "Leak detection and repair or replacement for failing water service lines.",
    category: "Water Lines",
    icon: "Droplets",
    heroImage: "/photos/cities/seattle.webp",
    heroHeadline: "A water line failure won't wait. Neither do we.",
    heroSubheadline:
      "Corroded galvanized service lines, joint leaks, and pressure loss all point to a failing water main. We diagnose it fast and repair or replace it with minimal disruption.",
    problem:
      "Dropping water pressure, an unexplained spike in your water bill, a wet spot in the yard that won't dry up, or a service line older than the house itself, all signs of a water main on its way out. Left alone, a small leak becomes a major one, often without warning.",
    solution: [
      "We locate the failure using pressure testing and acoustic/visual methods, then repair the affected section or replace the full service line depending on its age, material, and condition.",
      "For full replacements, we use trenchless methods where the site allows, minimizing excavation across driveways and landscaping.",
    ],
    benefits: [
      { title: "Fast leak isolation", body: "We pinpoint the failure before opening anything up." },
      { title: "Repair or replace, your call", body: "We'll tell you honestly when a patch makes sense versus a full line replacement." },
      { title: "Trenchless options", body: "Full service line replacement can often be done with minimal excavation." },
      { title: "Code-compliant materials", body: "Replacement lines meet current municipal code for size and material." },
    ],
    process: [
      { title: "Diagnose", body: "Pressure and leak testing locates the failure point." },
      { title: "Scope the fix", body: "Repair vs. replace, with a written estimate either way." },
      { title: "Repair or replace the line", body: "Trenchless where possible, open excavation where required." },
      { title: "Pressure test & restore", body: "The line is tested under pressure before the site is closed up." },
    ],
    faqs: [
      {
        q: "How do I know if it's my line or the city's?",
        a: "Generally, everything from the meter to your house is the property owner's responsibility, and everything before the meter is the utility's. We can help confirm which side a leak is on.",
      },
      {
        q: "Is this an emergency service?",
        a: "Yes, a failing water main can flood a basement or undermine a foundation fast. We run a 24/7 emergency line for exactly this.",
      },
    ],
    relatedSlugs: ["pipe-bursting", "sewer-replacement", "sewer-inspection"],
  },
  {
    slug: "sewer-inspection",
    name: "Sewer Inspection",
    shortDescription: "HD camera diagnosis of your full sewer line, see exactly what we see.",
    category: "Inspection",
    icon: "Camera",
    heroImage: "/photos/stock/tech-camera.jpg",
    heroHeadline: "Know what's actually wrong before you pay to fix it.",
    heroSubheadline:
      "A self-leveling HD camera travels the full length of your line, locating cracks, bellies, root intrusion, and blockages, on video, not guesswork.",
    problem:
      "Recurring clogs, slow drains, or a home-sale inspection contingency all raise the same question: what's actually going on inside the pipe? Without a real look, a repair quote is just a guess, and guesses lead to either overpaying or missing the real problem.",
    solution: [
      "We feed a self-leveling color camera through the cleanout or access point and record the full line, narrating defects as we find them, root intrusion, offset joints, bellies, cracks, or blockages, and locating each one to the foot using a sonde transmitter.",
      "You get the footage and a plain-language written report, so any recommendation that follows is backed by what the camera actually showed.",
    ],
    benefits: [
      { title: "Full video record", body: "You keep the footage, useful for real estate transactions and insurance claims alike." },
      { title: "Locating to the foot", body: "Sonde locating pinpoints defects precisely, so any dig is targeted, not exploratory." },
      { title: "No upsell pressure", body: "The inspection is the deliverable. What you do with the findings is up to you." },
      { title: "Pre-purchase peace of mind", body: "A sewer scope before closing can catch problems no visual walkthrough ever would." },
    ],
    process: [
      { title: "Access the line", body: "Through an existing cleanout, roof vent, or a small access point if needed." },
      { title: "Full-length camera pass", body: "The self-leveling camera records the entire run." },
      { title: "Locate any defects", body: "A sonde transmitter marks the exact depth and position of issues found." },
      { title: "Report & recommendations", body: "You receive the video and a written summary of what we found." },
    ],
    technology:
      "Self-leveling color sewer cameras with sonde locating, calibrated to give accurate depth and distance readings on every defect found.",
    faqs: [
      {
        q: "Do I need to be home for an inspection?",
        a: "Not necessarily, we just need access to a cleanout or other entry point. We're happy to send the video report directly to you.",
      },
      {
        q: "Can I get this done before buying a house?",
        a: "Yes, pre-purchase sewer scopes are one of the most common reasons we're called, and we can usually turn around same-day or next-day.",
      },
      {
        q: "What if you find a problem?",
        a: "We'll walk you through the footage and the realistic repair options, there's no obligation to book the repair with us.",
      },
    ],
    relatedSlugs: ["trenchless-sewer-repair", "sewer-replacement", "drain-cleaning"],
    featured: true,
  },
  {
    slug: "drain-cleaning",
    name: "Drain Cleaning",
    shortDescription: "Fast, lasting clearing for kitchen, bath, and main line clogs.",
    category: "Drain Services",
    icon: "Droplets",
    heroImage: "/photos/real/job-08.webp",
    heroHeadline: "Clear the clog. Find out why it happened.",
    heroSubheadline:
      "From a slow kitchen sink to a backed-up main line, we clear it with the right tool for the clog, and tell you if it's likely to come back.",
    problem:
      "Not all clogs are equal. A grease-clogged kitchen line, a hair-clogged bathroom drain, and a root-choked main sewer line all need different tools and techniques, and using the wrong one wastes time and money without fixing anything.",
    solution: [
      "We diagnose the clog type and location first, then clear it with mechanical cabling, hydro jetting, or both. For recurring clogs, we'll recommend a camera inspection so you're fixing the cause, not just the symptom.",
    ],
    benefits: [
      { title: "Right tool for the clog", body: "Cabling, jetting, or both, matched to what's actually causing the backup." },
      { title: "Whole-house coverage", body: "Kitchen, bath, laundry, and main line drains, all in one visit if needed." },
      { title: "Same-day availability", body: "Most drain clearing calls are handled same-day." },
      { title: "Honest follow-up advice", body: "If a clog is likely to recur, we'll say so and explain why." },
    ],
    process: [
      { title: "Diagnose", body: "We identify the likely clog type and location before reaching for a tool." },
      { title: "Clear the line", body: "Mechanical cabling or hydro jetting, depending on the blockage." },
      { title: "Verify flow", body: "We confirm water runs freely before calling the job done." },
      { title: "Recommend next steps", body: "If the clog points to a bigger issue, we'll tell you plainly." },
    ],
    faqs: [
      {
        q: "Is hydro jetting safe for my pipes?",
        a: "Yes, when done with pipe-appropriate pressure and nozzles, we adjust settings to the pipe material and condition.",
      },
      {
        q: "How do I know if I need cabling or jetting?",
        a: "Cabling is fast and effective for a single localized clog. Jetting is better for grease buildup, scale, or root intrusion along a longer run. We'll recommend based on what we find.",
      },
    ],
    relatedSlugs: ["hydro-jetting", "rooter-service", "sewer-inspection"],
    featured: true,
  },
  {
    slug: "hydro-jetting",
    name: "Hydro Jetting",
    shortDescription: "High-pressure water jetting that restores full pipe diameter.",
    category: "Drain Services",
    icon: "Droplets",
    heroImage: "/photos/stock/tech-hydrojet.jpg",
    heroHeadline: "Restore the pipe's full diameter, chemical-free.",
    heroSubheadline:
      "Controlled, high-pressure water jets scour grease, scale, sludge, and root intrusion off the pipe wall, clearing what cabling alone leaves behind.",
    problem:
      "A cable can punch a hole through a clog and get water moving again, but it often leaves grease and scale coating the pipe wall, which means the same clog comes back in a few months. That's especially common in kitchen lines and older cast iron mains.",
    solution: [
      "Hydro jetting uses a flexible hose with a specialized nozzle to send pressurized water, up to several thousand PSI, both forward and backward through the line, scouring the full diameter of the pipe clean rather than just punching through the blockage.",
      "We size the pressure and nozzle to the pipe's age and material so we clean effectively without stressing fragile older pipe.",
    ],
    benefits: [
      { title: "Cleans the whole pipe wall", body: "Not just a path through the clog, the full diameter, restored." },
      { title: "Chemical-free", body: "No corrosive drain chemicals, safe for septic systems and the environment." },
      { title: "Removes grease & scale", body: "Effective on buildup that cabling alone can't fully clear." },
      { title: "Pipe-appropriate pressure", body: "Settings are matched to pipe material and condition to avoid damage." },
    ],
    process: [
      { title: "Camera check first", body: "We confirm the pipe can safely handle jetting before starting." },
      { title: "Jet the full line", body: "Pressurized water clears buildup along the entire run." },
      { title: "Flush & verify", body: "A final flush and, if needed, camera pass confirms the line is clear." },
    ],
    technology: "Trailer- and truck-mounted jetting units rated up to 4,000 PSI, with nozzle options matched to pipe diameter and condition.",
    faqs: [
      {
        q: "Will jetting damage old pipes?",
        a: "We camera-inspect first and adjust pressure and nozzle choice accordingly. Severely deteriorated pipe may need lining or replacement instead, we'll tell you if that's the case before jetting.",
      },
      {
        q: "How often should main lines be jetted?",
        a: "It depends on tree root activity and pipe age, but many older homes benefit from a maintenance jetting every 1–2 years to stay ahead of buildup.",
      },
    ],
    relatedSlugs: ["drain-cleaning", "sewer-inspection", "rooter-service"],
  },
  {
    slug: "rooter-service",
    name: "Rooter Service",
    shortDescription: "Mechanical cabling to cut through roots and clear blocked lines fast.",
    category: "Drain Services",
    icon: "Wrench",
    heroImage: "/photos/real/job-06.webp",
    heroHeadline: "Roots in the line? We cut through them.",
    heroSubheadline:
      "Mechanical rooter/cabling service clears root intrusion and stubborn blockages quickly, often the fastest way to get a backed-up line flowing again.",
    problem:
      "Tree roots find their way into sewer lines through the smallest crack or joint gap, and once inside, they grow into a dense mass that blocks flow and gets worse every season. A backed-up line on a Friday night doesn't leave much time for anything but a fast, mechanical fix.",
    solution: [
      "A motorized cable with a rotating cutting head is fed through the line to cut through roots and break up blockages, restoring flow quickly. For lines with recurring root problems, we'll recommend a camera inspection and, where appropriate, trenchless lining to stop roots from coming back.",
    ],
    benefits: [
      { title: "Fast turnaround", body: "Often the quickest way to restore flow on a blocked line." },
      { title: "Effective on root masses", body: "Cutting heads are sized to the pipe diameter for a thorough clear." },
      { title: "Pairs well with jetting", body: "Cabling to clear, jetting to clean the pipe wall, when needed." },
      { title: "Available 24/7", body: "Root-caused backups don't wait for business hours, and neither do we." },
    ],
    process: [
      { title: "Access the line", body: "Through the nearest cleanout to the blockage." },
      { title: "Cable through", body: "The rotating cutting head clears the root mass or obstruction." },
      { title: "Confirm flow", body: "We verify water moves freely before finishing up." },
    ],
    faqs: [
      {
        q: "Will roots just come back?",
        a: "Often, yes, unless the entry point is sealed. That's why we recommend a camera inspection after a root-related backup, so you know whether lining the line makes sense to stop it permanently.",
      },
      {
        q: "Is this the same as a snake?",
        a: "It's the same idea at a larger, motorized scale, a rooter machine has more torque and a wider range of cutting heads than a handheld drain snake.",
      },
    ],
    relatedSlugs: ["drain-cleaning", "hydro-jetting", "trenchless-sewer-repair"],
  },
  {
    slug: "sump-pump-installation",
    name: "Sump Pump Installation",
    shortDescription: "New sump pump installation and replacement to keep basements and crawl spaces dry.",
    category: "Water Lines",
    icon: "Droplets",
    heroImage: "/photos/real/job-09.webp",
    heroHeadline: "Keep groundwater out, automatically.",
    heroSubheadline:
      "A properly sized and installed sump pump protects basements and crawl spaces from groundwater intrusion, especially through Puget Sound's wet winters.",
    problem:
      "A failed or undersized sump pump is one of the more common causes of a flooded basement during a heavy storm. Whether your pump has stopped working, your home doesn't have one, or your current setup can't keep up, water finds the lowest point in your home eventually.",
    solution: [
      "We size and install a sump pump and basin matched to your home's groundwater conditions, with a battery backup option for power outages, typically the moment flooding is most likely. We also service and replace existing pumps that have failed or are undersized.",
    ],
    benefits: [
      { title: "Sized to your home", body: "Pump capacity matched to actual groundwater volume, not guesswork." },
      { title: "Battery backup available", body: "Keeps pumping during power outages, when storms are most likely." },
      { title: "Code-compliant discharge", body: "Discharge lines routed and connected per local code." },
      { title: "Replacement & repair", body: "We also service existing systems, not just new installs." },
    ],
    process: [
      { title: "Assess the site", body: "We evaluate groundwater conditions and existing basin setup." },
      { title: "Install pump & basin", body: "Sized and set with a properly routed discharge line." },
      { title: "Backup & test", body: "Battery backup installed if selected, then the system is load-tested." },
    ],
    faqs: [
      {
        q: "How do I know if my sump pump is undersized?",
        a: "If it runs almost constantly during heavy rain or your basement still gets damp, it may not have enough capacity for your site's groundwater. We can evaluate it during a visit.",
      },
      {
        q: "Do you install battery backups?",
        a: "Yes, a battery backup keeps the pump running during a power outage, which is exactly when flooding risk is highest.",
      },
    ],
    relatedSlugs: ["water-main-repair", "drain-cleaning", "sewer-inspection"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
