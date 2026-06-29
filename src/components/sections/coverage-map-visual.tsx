"use client";

import { useId } from "react";
import Link from "next/link";
import { Home as HomeIcon, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Location } from "@/lib/content/locations";

const EASE = [0.22, 1, 0.36, 1] as const;

const PIN_GLOW_YELLOW =
  "0 0 0 1px color-mix(in oklab, var(--color-yellow) 65%, transparent), 0 0 28px -2px color-mix(in oklab, var(--color-yellow) 80%, transparent)";
const PIN_GLOW_BLUE =
  "0 0 0 1px color-mix(in oklab, white 55%, transparent), 0 0 22px -2px color-mix(in oklab, var(--color-primary) 75%, white 25%)";

/** Presentational layout positions only (percent of panel), not real coordinates. */
const PIN_POSITIONS: Record<string, { x: number; y: number }> = {
  "seattle-wa": { x: 40, y: 10 },
  "bellevue-wa": { x: 70, y: 20 },
  "renton-wa": { x: 58, y: 44 },
  "tukwila-wa": { x: 44, y: 50 },
  "federal-way-wa": { x: 40, y: 70 },
  "tacoma-wa": { x: 26, y: 88 },
};

/** Fastest-response cluster vs the wider coverage region, derived from driveTime. */
function tierOf(location: Location): "primary" | "coverage" {
  if (location.isHQ) return "primary";
  const minutes = parseInt(location.driveTime?.match(/\d+/)?.[0] ?? "99", 10);
  return minutes <= 15 ? "primary" : "coverage";
}

type Point = { x: number; y: number };

/** Clip a convex polygon to the half-plane nx*x + ny*y <= c (Sutherland-Hodgman). */
function clipHalfPlane(poly: Point[], nx: number, ny: number, c: number): Point[] {
  const result: Point[] = [];
  for (let i = 0; i < poly.length; i++) {
    const curr = poly[i];
    const next = poly[(i + 1) % poly.length];
    const dCurr = nx * curr.x + ny * curr.y - c;
    const dNext = nx * next.x + ny * next.y - c;
    if (dCurr <= 0) result.push(curr);
    if ((dCurr < 0 && dNext > 0) || (dCurr > 0 && dNext < 0)) {
      const t = dCurr / (dCurr - dNext);
      result.push({ x: curr.x + t * (next.x - curr.x), y: curr.y + t * (next.y - curr.y) });
    }
  }
  return result;
}

/** Voronoi cell for `site` against every other site, clipped to a 0–100 bounding box. */
function voronoiCell(site: Point, others: Point[]): Point[] {
  let poly: Point[] = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 },
  ];
  for (const other of others) {
    const mx = (site.x + other.x) / 2;
    const my = (site.y + other.y) / 2;
    const nx = other.x - site.x;
    const ny = other.y - site.y;
    poly = clipHalfPlane(poly, nx, ny, nx * mx + ny * my);
  }
  return poly;
}

function toPath(points: Point[]): string {
  if (points.length === 0) return "";
  return `M${points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L")} Z`;
}

/** A small, irregular (non-circular) island outline, smoothed through varied-radius points. */
function blobPath(cx: number, cy: number, baseR: number, radii: number[]): string {
  const n = radii.length;
  const pts = radii.map((r, i) => {
    const angle = (i / n) * Math.PI * 2;
    return { x: cx + Math.cos(angle) * baseR * r, y: cy + Math.sin(angle) * baseR * r * 0.82 };
  });
  const mid = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const start = mid(pts[n - 1], pts[0]);
  let d = `M${start.x.toFixed(2)},${start.y.toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const next = pts[(i + 1) % n];
    const m = mid(pts[i], next);
    d += `Q${pts[i].x.toFixed(2)},${pts[i].y.toFixed(2)} ${m.x.toFixed(2)},${m.y.toFixed(2)} `;
  }
  return `${d}Z`;
}

/** Distinct radius "fingerprint" per city so no two islands share the same silhouette. */
const ISLAND_SHAPES: Record<string, number[]> = {
  "seattle-wa": [1, 0.78, 1.18, 0.82, 1.12, 0.74, 1.08, 0.9],
  "bellevue-wa": [0.88, 1.14, 0.8, 1.22, 0.84, 1.06, 0.76, 1.02],
  "renton-wa": [1.08, 0.84, 1.16, 0.88, 1.0, 0.78, 1.12, 0.92],
  "tukwila-wa": [1, 0.86, 1.14, 0.8, 1.2, 0.84, 1.06, 0.94],
  "federal-way-wa": [0.94, 1.14, 0.8, 1.1, 0.76, 1.18, 0.86, 1.02],
  "tacoma-wa": [1.12, 0.8, 1.06, 0.86, 1.2, 0.78, 0.96, 1.08],
};

/** Each city's own service territory, divided the way county-line maps divide land. */
function CityBoundaries({ positioned }: { positioned: Location[] }) {
  const sites = positioned.map((l) => PIN_POSITIONS[l.slug]);
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      {positioned.map((location, i) => {
        const others = sites.filter((_, j) => j !== i);
        const cell = voronoiCell(sites[i], others);
        const tier = tierOf(location);
        return (
          <path
            key={location.slug}
            d={toPath(cell)}
            fill={tier === "primary" ? "var(--color-yellow)" : "white"}
            fillOpacity={tier === "primary" ? 0.05 : 0.025}
            stroke={tier === "primary" ? "var(--color-yellow)" : "white"}
            strokeOpacity="0.4"
            strokeWidth="0.45"
            strokeDasharray="1.6 1.4"
          />
        );
      })}
    </svg>
  );
}

/**
 * Street grid + a few highway corridors, so the land reads as an actual city map
 * instead of flat color. Local streets stay under the water layer (hidden where it
 * overlaps); highways render on top, the way real freeways bridge across water.
 */
function RoadNetwork({ id, positioned }: { id: string; positioned: Location[] }) {
  const sparseId = `${id}-streets-sparse`;
  const denseId = `${id}-streets-dense`;
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id={sparseId} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <path d="M0,0 L0,6 M0,0 L6,0" stroke="white" strokeOpacity="0.16" strokeWidth="0.22" />
        </pattern>
        <pattern id={denseId} width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <path d="M0,0 L0,2.6 M0,0 L2.6,0" stroke="white" strokeOpacity="0.26" strokeWidth="0.22" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill={`url(#${sparseId})`} />
      {positioned.map((location) => {
        const pos = PIN_POSITIONS[location.slug];
        return <circle key={location.slug} cx={pos.x} cy={pos.y} r={location.isHQ ? 16 : 11} fill={`url(#${denseId})`} />;
      })}
    </svg>
  );
}

function Highways() {
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <g fill="none" stroke="var(--color-yellow)" strokeOpacity="0.4" strokeWidth="0.7" strokeLinecap="round">
        <path d="M38,0 C42,15 35,28 40,42 C44,55 37,63 40,72 C42,82 33,89 29,99" />
        <path d="M60,12 C64,23 57,33 60,43 C62,51 55,60 58,70 C60,80 55,89 58,97" />
        <path d="M40,15 C48,17 55,19 65,17" />
      </g>
    </svg>
  );
}

/**
 * Stylized coastline loosely echoing the real Puget Sound / Lake Washington skyline
 * (Elliott Bay notch near Seattle, Commencement Bay notch near Tacoma, Vashon Island,
 * Lake Washington tapering to its southern tip at Renton) — simplified, original artwork,
 * not traced from GIS data.
 */
function Waterways() {
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="water-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.46 0.14 256)" />
          <stop offset="100%" stopColor="oklch(0.32 0.12 258)" />
        </linearGradient>
      </defs>
      {/* Puget Sound, with bay notches near Seattle (top) and Tacoma (bottom) */}
      <path
        d="M21,0 Q27,4 33,9 Q29,14 24,17 Q19,21 23,26 Q29,30 24,35 Q18,39 22,44 Q28,49 23,53 Q17,57 21,62 Q27,66 22,71 Q16,75 20,80 Q26,84 32,90 Q28,95 22,98 Q21,99 20,100 L0,100 L0,0 Z"
        fill="url(#water-grad)"
        stroke="white"
        strokeOpacity="0.14"
        strokeWidth="0.4"
      />
      {/* Vashon Island */}
      <ellipse cx="12" cy="58" rx="2.2" ry="8.5" fill="oklch(0.16 0.07 258)" transform="rotate(-8 12 58)" />
      {/* Lake Washington, tapering south to Renton */}
      <path
        d="M64,7 C71,11 70,18 67,24 C72,29 68,35 64,38 C67,43 61,47 58,46 C55,42 57,36 55,31 C58,27 54,22 56,17 C53,12 59,8 64,7 Z"
        fill="url(#water-grad)"
        stroke="white"
        strokeOpacity="0.14"
        strokeWidth="0.4"
      />
    </svg>
  );
}

/**
 * Every city sits on its own distinct blue-toned island, echoing the same
 * material as Vashon Island and the bays rather than flat land color.
 */
function CityIslands({ id, positioned }: { id: string; positioned: Location[] }) {
  const gradId = `${id}-island-grad`;
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id={gradId} cx="38%" cy="32%">
          <stop offset="0%" stopColor="oklch(0.52 0.13 250)" />
          <stop offset="100%" stopColor="oklch(0.33 0.13 258)" />
        </radialGradient>
      </defs>
      {positioned.map((location) => {
        const pos = PIN_POSITIONS[location.slug];
        const isHQ = !!location.isHQ;
        const baseR = isHQ ? 9.5 : 7.2;
        const shape = ISLAND_SHAPES[location.slug] ?? [1, 0.9, 1.1, 0.9, 1.1, 0.9, 1.1, 0.9];
        return (
          <path
            key={location.slug}
            d={blobPath(pos.x, pos.y, baseR, shape)}
            fill={`url(#${gradId})`}
            stroke="white"
            strokeOpacity="0.22"
            strokeWidth="0.4"
          />
        );
      })}
    </svg>
  );
}

function Ripple({ color }: { color: string }) {
  return (
    <motion.span
      aria-hidden
      className="absolute inset-0 rounded-full"
      style={{ border: `1.5px solid ${color}` }}
      initial={{ opacity: 0.6, scale: 0.85 }}
      animate={{ opacity: 0, scale: 2 }}
      transition={{ duration: 1.6, ease: "easeOut", repeat: Infinity }}
    />
  );
}

export function CoverageMapVisual({
  locations,
  activeSlug,
  onActivate,
  className = "",
}: {
  locations: Location[];
  activeSlug: string | null;
  onActivate: (slug: string) => void;
  className?: string;
}) {
  const mapId = useId();
  const positioned = locations.filter((l) => PIN_POSITIONS[l.slug]);
  const primary = positioned.filter((l) => tierOf(l) === "primary");

  const centroid = (set: Location[]) => {
    if (set.length === 0) return null;
    const sum = set.reduce(
      (acc, l) => ({ x: acc.x + PIN_POSITIONS[l.slug].x, y: acc.y + PIN_POSITIONS[l.slug].y }),
      { x: 0, y: 0 }
    );
    return { x: sum.x / set.length, y: sum.y / set.length };
  };
  const primaryCenter = centroid(primary);

  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] p-7 sm:p-10 ${className}`}
      style={{ background: "var(--gradient-hero)" }}
    >

      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <span className="glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium text-white/85">
          <MapPin className="h-3.5 w-3.5" style={{ color: "var(--color-yellow)" }} />
          {positioned.length} cities &middot; greater Seattle area
        </span>
        <span className="glass-dark inline-flex items-center gap-3 rounded-full px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "var(--color-yellow)" }} /> Fastest response
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full border border-white/60" /> Coverage area
          </span>
        </span>
      </div>

      <div className="relative mt-7 aspect-[6/5] w-full overflow-hidden rounded-[1.75rem] sm:mt-9">
        <div aria-hidden className="absolute inset-0" style={{ background: "oklch(0.16 0.07 258)" }} />
        <CityIslands id={mapId} positioned={positioned} />
        <RoadNetwork id={mapId} positioned={positioned} />
        <Waterways />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 60px 10px oklch(0.1 0.05 260 / 0.55)" }}
        />
        <div aria-hidden className="absolute inset-0 mesh-overlay opacity-40" />
        <CityBoundaries positioned={positioned} />
        <Highways />
        {primaryCenter && (
          <div
            aria-hidden
            className="absolute rounded-full"
            style={{
              left: `${primaryCenter.x}%`,
              top: `${primaryCenter.y}%`,
              width: "41.7%",
              height: "50%",
              transform: "translate(-50%, -50%)",
              border: "1px dashed color-mix(in oklab, var(--color-yellow) 50%, transparent)",
            }}
          />
        )}

        {positioned.map((location) => {
          const pos = PIN_POSITIONS[location.slug];
          const isActive = location.slug === activeSlug;
          const isHQ = !!location.isHQ;
          const tier = tierOf(location);
          const tierColor = tier === "primary" ? "var(--color-yellow)" : "white";
          return (
            <Link
              key={location.slug}
              href={`/service-area/${location.slug}`}
              aria-label={`View service area details for ${location.city}, WA${isHQ ? ", home base" : ""}`}
              onMouseEnter={() => onActivate(location.slug)}
              onFocus={() => onActivate(location.slug)}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            >
              <span className="relative grid h-9 w-9 place-items-center sm:h-10 sm:w-10">
                <AnimatePresence>
                  {(isActive || isHQ) && (
                    <Ripple color={isHQ ? "var(--color-yellow)" : tier === "primary" ? "var(--color-yellow)" : "rgba(255,255,255,0.55)"} />
                  )}
                </AnimatePresence>
                <motion.span
                  animate={{ scale: isActive ? 1.18 : 1 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="relative grid h-full w-full place-items-center rounded-full"
                  style={{
                    border: isHQ ? "none" : `1.5px solid color-mix(in oklab, ${tierColor} 55%, transparent)`,
                    background: isHQ ? "var(--color-yellow)" : isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                    color: isHQ ? "var(--color-yellow-foreground)" : "white",
                    boxShadow: isActive ? (isHQ || tier === "primary" ? PIN_GLOW_YELLOW : PIN_GLOW_BLUE) : "none",
                  }}
                >
                  {isHQ ? (
                    <HomeIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                </motion.span>
              </span>
              <span
                className="pointer-events-none whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider transition-all duration-200 sm:text-[10px]"
                style={{
                  background: isActive ? "rgba(8, 14, 40, 0.9)" : "rgba(8, 14, 40, 0.55)",
                  color: isActive ? "var(--color-yellow)" : "rgba(255,255,255,0.8)",
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                }}
              >
                {location.city}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
