import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locations, getLocationBySlug } from "@/lib/content/locations";
import { pageMetadata } from "@/lib/seo";
import { LocationPageTemplate } from "@/components/sections/location-page-template";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return pageMetadata({
    title: `${location.city}, WA Sewer Repair & Drain Cleaning`,
    description: location.metaDescription ?? location.intro,
    path: `/service-area/${location.slug}`,
  });
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();
  return <LocationPageTemplate location={location} />;
}
