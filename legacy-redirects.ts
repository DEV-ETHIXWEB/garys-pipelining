// Addresses from the two earlier versions of garyspipelining.com (a WordPress
// site, then a Squarespace-style one) that Google still has on file. Each one
// points to the page on this site that covers the same thing, so visitors and
// search rankings carry over instead of hitting a 404.
//
// Only add a redirect when the new page really is the same topic. Sending an
// unrelated old address to the home page or blog is treated by Google as a
// "soft 404" anyway, so leftovers with no match are left to 404.

type Redirect = { source: string; destination: string; permanent: true };

const to = (source: string, destination: string): Redirect => ({
  source,
  destination,
  permanent: true,
});

// Services whose old WordPress address was the bare slug, e.g. /pipe-bursting/
const serviceSlugs = [
  "trenchless-sewer-repair",
  "pipe-bursting",
  "sewer-replacement",
  "water-main-repair",
  "sewer-inspection",
  "drain-cleaning",
  "hydro-jetting",
  "rooter-service",
];

// Cities whose old WordPress address was the bare slug, e.g. /seattle-wa/
const locationSlugs = [
  "seattle-wa",
  "tacoma-wa",
  "bellevue-wa",
  "renton-wa",
  "tukwila-wa",
  "federal-way-wa",
];

export const legacyRedirects: Redirect[] = [
  // WordPress
  ...serviceSlugs.map((slug) => to(`/${slug}`, `/services/${slug}`)),
  ...locationSlugs.map((slug) => to(`/${slug}`, `/service-area/${slug}`)),
  to("/pipelining", "/services/trenchless-sewer-repair"),
  to("/sump-pumps", "/services/sump-pump-installation"),
  to("/drain-services", "/services"),
  to("/contact-us", "/contact"),
  to("/about-us", "/about"),
  to("/category/:path*", "/blog"),

  // Squarespace-style service pages, grouped under /services/<group>/<page>
  to("/services/pipelining", "/services/trenchless-sewer-repair"),
  to("/services/pipelining/trenchless-sewer-repair", "/services/trenchless-sewer-repair"),
  to("/services/pipelining/pipe-bursting", "/services/pipe-bursting"),
  to("/services/sewer", "/services"),
  to("/services/sewer/sewer-replacement", "/services/sewer-replacement"),
  to("/services/sewer/water-main-repair", "/services/water-main-repair"),
  to("/services/sewer/sewer-inspection", "/services/sewer-inspection"),
  to("/services/drain", "/services"),
  to("/services/drain/drain-cleaning", "/services/drain-cleaning"),
  to("/services/drain/hydro-jetting", "/services/hydro-jetting"),
  to("/services/drain/rooter-service", "/services/rooter-service"),
  to("/services/drain/sump-pumps", "/services/sump-pump-installation"),

  // Squarespace-style "<service>-seattle-washington" landing pages
  to("/hydro-jetting-seattle-washington", "/services/hydro-jetting"),
  to("/sewer-inspection-seattle-washington", "/services/sewer-inspection"),
  to("/rooter-service-seattle-washington", "/services/rooter-service"),
  to("/drain-cleaning-seattle-washington", "/services/drain-cleaning"),
  to("/trenchless-sewer-repair-seattle-washington", "/services/trenchless-sewer-repair"),
  to("/pipe-bursting-seattle-washington", "/services/pipe-bursting"),

  // Old blog, its posts, categories and author pages
  to("/news-and-updates/:path*", "/blog"),
];
