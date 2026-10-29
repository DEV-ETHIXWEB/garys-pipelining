import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/content/services";
import { locations } from "@/lib/content/locations";
import { posts } from "@/lib/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const priorities: Record<string, number> = {
    "": 1,
    "/services": 0.9,
    "/service-area": 0.9,
    "/blog": 0.8,
  };

  const staticRoutes = ["", "/about", "/contact", "/services", "/service-area", "/contractor-partnership", "/coupons", "/blog", "/privacy"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/coupons" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/privacy" ? 0.3 : (priorities[path] ?? 0.7),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${siteConfig.url}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const locationRoutes = locations.map((l) => ({
    url: `${siteConfig.url}/service-area/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.7,
    images: [p.cover.src, ...p.body.flatMap((b) => (b.type === "figure" ? [b.src] : []))].map((src) => `${siteConfig.url}${src}`),
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...postRoutes];
}
