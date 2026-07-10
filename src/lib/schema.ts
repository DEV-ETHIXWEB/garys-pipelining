import { siteConfig } from "./site-config";
import type { Service } from "./content/services";
import { reviewSummary } from "./content/reviews";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: siteConfig.legalName,
    image: `${siteConfig.url}/brand/logo.png`,
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
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewSummary.rating,
      reviewCount: reviewSummary.count,
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.heroSubheadline,
    provider: {
      "@type": "Plumber",
      name: siteConfig.legalName,
      telephone: siteConfig.phone,
    },
    areaServed: "Greater Seattle Area, WA",
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
