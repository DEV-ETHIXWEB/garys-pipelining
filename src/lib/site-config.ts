export const siteConfig = {
  name: "Gary's Pipelining & Drain Cleaning",
  legalName: "Gary's Pipelining and Drain Cleaning, LLC",
  shortName: "Gary's Pipelining",
  tagline: "Seattle's trusted sewer & drain specialists",
  // Also the meta/OG description, so kept at or under 155 characters to avoid
  // being truncated in search results.
  description:
    "Trenchless sewer repair, pipe lining, hydro jetting, and 24/7 emergency drain service across the greater Seattle area. Licensed and insured.",
  url: "https://www.garyspipelining.com",
  phone: "(206) 535-8460",
  phoneHref: "tel:+12065358460",
  email: "office@garyspipelining.com",
  emailHref: "mailto:office@garyspipelining.com",
  license: "WA License #GARYSPC881RE",
  address: {
    line1: "14101 Interurban Ave S, Unit 78-B",
    city: "Tukwila",
    state: "WA",
    zip: "98168",
    full: "14101 Interurban Ave S, Unit 78-B, Tukwila, WA 98168",
  },
  hours: "Open 24 hours, 7 days a week",
  mapEmbedSrc:
    "https://www.google.com/maps?q=14101+Interurban+Ave+S+Unit+78-B+Tukwila+WA+98168&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=14101+Interurban+Ave+S+Unit+78-B+Tukwila+WA+98168",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Gary%27s+Pipelining+%26+Drain+Cleaning+14101+Interurban+Ave+S+Tukwila+WA+98168",
} as const;

// Vercel sets VERCEL_ENV to "production" only for the production deployment;
// preview/branch deploys get "preview" or "development". Falls back to
// NODE_ENV for non-Vercel hosts. Used to keep preview URLs out of search
// results (robots.txt, per-page robots meta) without touching prod behavior.
export const isProduction = (process.env.VERCEL_ENV ?? process.env.NODE_ENV) === "production";

export const trustStats = [
  { value: "24/7", label: "Emergency response", icon: "/brand/credibility/emergency.svg" },
  { value: "100%", label: "Licensed & insured crew", icon: "/brand/credibility/licensed-insured.svg" },
  { value: "Trenchless", label: "Our default method", icon: "/brand/credibility/trenchless.svg" },
] as const;
