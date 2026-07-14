"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CoverageMapVisual } from "./coverage-map-visual";
import type { Location } from "@/lib/content/locations";
import { siteConfig } from "@/lib/site-config";
import { SparkleField } from "@/components/ui/sparkle-field";

export function HomeCoverageSection({ locations }: { locations: Location[] }) {
  const defaultSlug = locations.find((l) => l.isHQ)?.slug ?? locations[0]?.slug ?? null;
  const [activeSlug, setActiveSlug] = useState<string | null>(defaultSlug);
  const countyCount = new Set(locations.map((l) => l.county)).size;

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid gap-px overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 lg:grid-cols-[1.3fr_1fr]">
          <CoverageMapVisual
            locations={locations}
            activeSlug={activeSlug}
            onActivate={setActiveSlug}
            className="rounded-none"
          />

          <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12" style={{ background: "var(--gradient-hero)" }}>
            <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
            <SparkleField />
            <div className="relative">
              <span
                className="chip"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
              >
                Service area
              </span>
              <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl" style={{ color: "white" }}>
                Proudly covering the <span className="font-extrabold" style={{ color: "var(--color-yellow)" }}>greater Seattle area.</span>
              </h2>
              <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-white/70">
                Based in Tukwila, our crews run regular routes across King and Pierce counties, with the same
                trenchless-first approach and 24/7 emergency dispatch in every city we serve.
              </p>

              <div className="mt-9 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[
                  { k: String(locations.length), v: "Cities served" },
                  { k: String(countyCount), v: "Counties covered" },
                  { k: "24/7", v: "Emergency dispatch" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="break-words font-display text-2xl text-white sm:text-3xl">{s.k}</div>
                    <div className="mt-1 text-xs text-white/60">{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-2">
                {locations.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/service-area/${l.slug}`}
                    onMouseEnter={() => setActiveSlug(l.slug)}
                    onFocus={() => setActiveSlug(l.slug)}
                    className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                      l.slug === activeSlug ? "border-yellow bg-yellow text-yellow-foreground" : "border-white/20 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {l.city}
                  </Link>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/service-area" className="btn-yellow">
                  Explore all service areas <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-3.5 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Phone className="h-4 w-4" /> {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
