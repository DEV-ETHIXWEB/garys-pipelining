"use client";

import { useState } from "react";
import { Star, ArrowUpRight, Pause, Play } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";
import { reviews, reviewSummary } from "@/lib/content/reviews";
import { StarRow, GoogleMark } from "@/components/ui/google-rating";

const MARQUEE_DURATION = "90s";

export function ReviewsSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="reviews" className="overflow-hidden py-24 md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal>
          <div>
            <span className="chip">
              <Star className="h-3.5 w-3.5 fill-yellow" stroke="#001B82" strokeWidth={1.5} /> Verified Google reviews
            </span>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl leading-[1.05] md:text-6xl">
              The work speaks. <span className="text-muted-foreground">So do our customers.</span>
            </h2>
            <div className="mt-4 flex items-center gap-2.5">
              <GoogleMark className="h-6 w-6" />
              <StarRow rating={reviewSummary.rating} sizeClass="h-5 w-5" />
              <p className="text-base text-muted-foreground">
                Based on <span className="font-semibold text-ink">{reviewSummary.count} reviews</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="group relative mt-14 overflow-hidden">
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
            aria-label={paused ? "Resume review auto-scroll" : "Pause review auto-scroll"}
            className="glass absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full text-foreground shadow-[var(--shadow-soft)] transition-colors hover:text-primary"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
          <div
            className={`marquee-track-rtl flex w-max shrink-0 gap-6 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] ${paused ? "[animation-play-state:paused]" : ""}`}
            style={{ animationDuration: MARQUEE_DURATION }}
          >
            {[...reviews, ...reviews].map((r, i) => (
              <figure
                key={`${r.name}-${i}`}
                aria-hidden={i >= reviews.length}
                className="surface-card flex w-[360px] shrink-0 flex-col gap-5 p-6 sm:w-[410px]"
                style={{ border: "1px solid #001B82" }}
              >
                <StarRow rating={5} sizeClass="h-4 w-4" />
                <blockquote className="line-clamp-5 text-pretty text-base leading-relaxed text-foreground">
                  &ldquo;{r.body}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft text-base font-semibold text-primary">
                    {r.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold text-ink">{r.name}</div>
                    <div className="text-xs text-muted-foreground">Google review</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="container-px mx-auto mt-8 flex max-w-[1400px] justify-center">
          <a
            href={siteConfig.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[21px] font-medium text-primary link-underline"
          >
            Read reviews <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
