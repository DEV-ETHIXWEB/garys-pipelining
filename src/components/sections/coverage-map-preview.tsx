"use client";

import { useState } from "react";
import { CoverageMapVisual } from "./coverage-map-visual";
import type { Location } from "@/lib/content/locations";

export function CoverageMapPreview({ locations, className = "" }: { locations: Location[]; className?: string }) {
  const defaultSlug = locations.find((l) => l.isHQ)?.slug ?? locations[0]?.slug ?? null;
  const [activeSlug, setActiveSlug] = useState<string | null>(defaultSlug);

  return (
    <CoverageMapVisual locations={locations} activeSlug={activeSlug} onActivate={setActiveSlug} className={className} />
  );
}
