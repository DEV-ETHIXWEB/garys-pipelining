"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowUpRight, Landmark, Clock, ShieldCheck } from "lucide-react";
import type { Location } from "@/lib/content/locations";
import { CoverageMapVisual } from "./coverage-map-visual";

export function ServiceAreaMap({ locations }: { locations: Location[] }) {
  const defaultSlug = locations.find((l) => l.isHQ)?.slug ?? locations[0]?.slug ?? null;
  const [activeSlug, setActiveSlug] = useState<string | null>(defaultSlug);
  const active = locations.find((l) => l.slug === activeSlug) ?? locations[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <CoverageMapVisual locations={locations} activeSlug={activeSlug} onActivate={setActiveSlug} />

      <div className="flex flex-col">
        <span className="chip self-start">Our service area</span>
        <h3 className="mt-4 text-2xl tracking-tight text-ink">
          {active.city}, {active.state}
          {active.isHQ && (
            <span className="ml-2 inline-flex items-center rounded-full bg-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-foreground align-middle">
              Home base
            </span>
          )}
        </h3>
        {active.driveTime && <p className="mt-1.5 text-sm text-muted-foreground">{active.driveTime}</p>}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{active.intro}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground">
            <Landmark className="h-3.5 w-3.5 text-primary" /> {active.county}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" /> Same-day response
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> 24/7 emergency
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-1.5">
          {locations.map((location) => {
            const isActive = location.slug === activeSlug;
            return (
              <Link
                key={location.slug}
                href={`/service-area/${location.slug}`}
                onMouseEnter={() => setActiveSlug(location.slug)}
                onFocus={() => setActiveSlug(location.slug)}
                className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "border-primary bg-primary-soft text-primary" : "border-border text-foreground hover:bg-secondary"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <MapPin className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="truncate">{location.city}, WA</span>
                  <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">&middot; {location.county}</span>
                </span>
                <ArrowUpRight
                  className={`h-4 w-4 shrink-0 transition-transform ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
