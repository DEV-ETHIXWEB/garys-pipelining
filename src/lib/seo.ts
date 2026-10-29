import type { Metadata } from "next";
import { siteConfig } from "./site-config";

// The branded card rendered by src/app/opengraph-image.tsx. File-based OG images
// stop applying once a page sets its own `openGraph`, so it is passed explicitly.
const DEFAULT_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}, Seattle's trenchless sewer & drain experts`,
};

// Next merges metadata shallowly: a page that sets `openGraph` or `twitter`
// replaces the root layout's object wholesale, and a page that sets neither
// inherits the homepage's og:title/og:url. Every page goes through this so
// its share card, canonical and title always describe the page itself.
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  keywords,
}: {
  /** Page title; the root template appends " | Gary's Pipelining". */
  title?: string;
  /** Full title used as-is, for pages whose title already carries the brand. */
  absoluteTitle?: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${siteConfig.shortName}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      ...(publishedTime && { publishedTime }),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
