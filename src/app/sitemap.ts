import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/content/services";
import { locations } from "@/lib/content/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const priorities: Record<string, number> = {
    "": 1,
    "/services": 0.9,
    "/service-area": 0.9,
  };

  const staticRoutes = ["", "/about", "/contact", "/services", "/service-area", "/contractor-partnership", "/coupons", "/privacy"].map((path) => ({
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

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes];
}
