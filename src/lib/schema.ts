import { siteConfig } from "./site-config";
import { services, type Service } from "./content/services";
import { locations } from "./content/locations";
import { reviewSummary } from "./content/reviews";
import { postWordCount, type Post } from "./content/posts";

// Stable entity ids, so every page's JSON-LD points at the same business and
// website instead of describing a new, unconnected one each time.
export const BUSINESS_ID = `${siteConfig.url}/#business`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const areaServed = locations.map((l) => ({
  "@type": "City",
  name: l.city,
  containedInPlace: { "@type": "State", name: "Washington" },
}));

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": BUSINESS_ID,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    image: `${siteConfig.url}/brand/logo.png`,
    logo: `${siteConfig.url}/brand/logo.png`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    hasMap: siteConfig.directionsUrl,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    areaServed,
    knowsAbout: ["Side sewer repair", "Trenchless sewer repair", "Cured-in-place pipe lining", ...services.map((s) => s.name)],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sewer and drain services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${siteConfig.url}/services/${s.slug}` },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewSummary.rating,
      reviewCount: reviewSummary.count,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en-US",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} in Seattle, WA`,
    description: service.metaDescription ?? service.heroSubheadline,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: { "@type": "Plumber", "@id": BUSINESS_ID, name: siteConfig.legalName, telephone: siteConfig.phone },
    areaServed,
  };
}

export function webPageSchema(type: "AboutPage" | "ContactPage" | "CollectionPage", name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: `${siteConfig.url}${path}`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
  };
}

export function blogSchema(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.shortName} Blog`,
    url: `${siteConfig.url}/blog`,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": BUSINESS_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${siteConfig.url}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      image: `${siteConfig.url}${p.cover.src}`,
    })),
  };
}

export function blogPostingSchema(post: Post) {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.metaDescription,
    image: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${post.cover.src}`,
      width: 1600,
      height: 900,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": WEBSITE_ID },
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    wordCount: postWordCount(post),
    inLanguage: "en-US",
    author: { "@type": "Organization", "@id": BUSINESS_ID, name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      "@id": BUSINESS_ID,
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/brand/logo.png` },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
