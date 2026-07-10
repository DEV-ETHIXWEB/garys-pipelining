"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";

export function BeforeAfterSlider() {
  const [pos, setPos] = useState(55);
  const [focused, setFocused] = useState(false);
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <span className="chip">
              <Leaf className="h-3.5 w-3.5" /> Before / After
            </span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              Same problem. <span className="text-muted-foreground">No trench.</span>
            </h2>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              The biggest reason homeowners choose trenchless isn&rsquo;t the pipe, it&rsquo;s everything that
              doesn&rsquo;t get torn up to reach it. Drag the slider to see the difference a modern method makes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services/trenchless-sewer-repair" className="btn-primary">
                See if your line qualifies <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-[2rem] border border-border bg-ink shadow-[var(--shadow-premium)]">
            <div className="relative aspect-[16/10] select-none">
              <Image src="/BEFORE VS AFTER/after.JPG" alt="Yard preserved after trenchless service" fill loading="lazy" sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }} aria-hidden>
                <Image
                  src="/BEFORE VS AFTER/before.JPG"
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  Traditional dig
                </div>
              </div>
              <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
                Trenchless result
              </div>

              <div className="pointer-events-none absolute top-0 bottom-0" style={{ left: `calc(${pos}% - 1px)` }}>
                <div className="h-full w-0.5 bg-white/90" />
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-lg transition-shadow ${
                    focused ? "ring-4 ring-primary ring-offset-2" : ""
                  }`}
                >
                  <ArrowRight className="absolute left-1/2 top-1/2 h-4 w-4" style={{ transform: "translate(calc(-50% - 6px), -50%) rotate(180deg)" }} />
                  <ArrowRight className="absolute left-1/2 top-1/2 h-4 w-4" style={{ transform: "translate(calc(-50% + 6px), -50%)" }} />
                </div>
              </div>

              <input
                aria-label="Compare before and after"
                type="range"
                min={5}
                max={95}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
