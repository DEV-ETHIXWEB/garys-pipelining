export type Location = {
  slug: string;
  /** Search-result description, <=155 chars. Falls back to `intro`, which is on-page copy and usually too long. */
  metaDescription?: string;
  city: string;
  state: "WA";
  county: string;
  isHQ?: boolean;
  heroImage: string;
  intro: string;
  localNotes: string[];
  driveTime?: string;
};

export const locations: Location[] = [
  {
    slug: "seattle-wa",
    metaDescription:
      "Trenchless sewer repair, pipe lining, and drain cleaning across Seattle. Licensed, insured, and available 24/7 for emergencies.",
    city: "Seattle",
    state: "WA",
    county: "King County",
    heroImage: "/photos/cities/seattle.webp",
    intro:
      "Seattle's housing stock spans everything from century-old Craftsman homes in Ballard and Wallingford to newer construction in SoDo and South Lake Union, which means sewer lines running the full range from aging clay and Orangeburg pipe to modern PVC. We work across the city, with trenchless methods that matter most on the older lots where digging means tearing up mature landscaping.",
    localNotes: [
      "Many older Seattle neighborhoods still have clay or Orangeburg sewer laterals prone to root intrusion and offset joints, prime candidates for trenchless lining.",
      "Steep lots and mature trees common in neighborhoods like Capitol Hill and Madrona make trenchless access especially valuable.",
      "We carry permits and inspections for City of Seattle Side Sewer work as part of replacement projects.",
    ],
    driveTime: "~20 min from our Tukwila base",
  },
  {
    slug: "tacoma-wa",
    metaDescription:
      "Trenchless sewer repair, pipe bursting, and drain cleaning in Tacoma. Licensed, insured, and available 24/7 for emergencies.",
    city: "Tacoma",
    state: "WA",
    county: "Pierce County",
    heroImage: "/photos/cities/tacoma.webp",
    intro:
      "From the North End's older homes to newer development near Point Ruston, Tacoma properties see a similar mix of aging clay sewer lines and modern construction. We run regular routes through Tacoma for inspections, drain clearing, and trenchless repair.",
    localNotes: [
      "Tacoma's hillier terrain and proximity to Commencement Bay mean groundwater and drainage issues are common, we install and service sump pumps throughout the area.",
      "Older North End and Hilltop homes frequently need camera inspections before a sale or refinance.",
    ],
    driveTime: "~30 min from our Tukwila base",
  },
  {
    slug: "bellevue-wa",
    metaDescription:
      "Trenchless sewer repair and drain cleaning in Bellevue, protecting mature landscaping and driveways. Licensed, insured, available 24/7.",
    city: "Bellevue",
    state: "WA",
    county: "King County",
    heroImage: "/photos/stock/hero-technician.jpg",
    intro:
      "Bellevue's mix of established neighborhoods and high-value newer construction both benefit from trenchless methods, protecting mature landscaping on older lots and avoiding disruption to finished hardscape on newer ones.",
    localNotes: [
      "We size estimates carefully for Bellevue properties with finished landscaping, paver driveways, or retaining walls near the sewer line path.",
      "Camera inspections are a common pre-purchase request for Eastside home sales.",
    ],
    driveTime: "~25 min from our Tukwila base",
  },
  {
    slug: "renton-wa",
    metaDescription:
      "Trenchless sewer repair and drain cleaning in Renton, minutes from our Tukwila shop. Licensed, insured, and available 24/7.",
    city: "Renton",
    state: "WA",
    county: "King County",
    heroImage: "/photos/cities/renton.webp",
    intro:
      "Renton sits close to our Tukwila home base, and it's one of our most frequent service areas, from older Highlands-area homes to newer development near the Landing. Fast response is the norm here, not the exception.",
    localNotes: [
      "Proximity to our shop means faster on-site arrival for Renton emergency calls.",
      "We regularly handle root intrusion calls in older Renton neighborhoods with mature street trees.",
    ],
    driveTime: "~10 min from our Tukwila base",
  },
  {
    slug: "tukwila-wa",
    metaDescription:
      "Trenchless sewer repair and drain cleaning in Tukwila, our home base and fastest response area. Licensed, insured, available 24/7.",
    city: "Tukwila",
    state: "WA",
    county: "King County",
    isHQ: true,
    heroImage: "/photos/real/job-05.webp",
    intro:
      "Tukwila is home, our shop sits right on Interurban Ave S. As our home base, Tukwila gets our fastest response times and the most flexible scheduling of any city we serve.",
    localNotes: [
      "Our crews and equipment are dispatched directly from our Tukwila location.",
      "We're a familiar name to many Tukwila property managers and homeowners alike.",
    ],
    driveTime: "Our home base",
  },
  {
    slug: "federal-way-wa",
    metaDescription:
      "Trenchless sewer repair, pipe lining, and drain cleaning in Federal Way. Licensed, insured, and available 24/7 for emergencies.",
    city: "Federal Way",
    state: "WA",
    county: "King County",
    heroImage: "/photos/stock/about-team.jpg",
    intro:
      "Federal Way's mix of older South King County homes and newer development means we see everything from root-damaged clay laterals to straightforward drain maintenance calls. We run regular service routes through the area.",
    localNotes: [
      "We frequently field camera inspection requests ahead of home sales in Federal Way's older neighborhoods.",
      "Sump pump installation is a common call here given the area's drainage patterns.",
    ],
    driveTime: "~20 min from our Tukwila base",
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((l) => l.slug === slug);
}
