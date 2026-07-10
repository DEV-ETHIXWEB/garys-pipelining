import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, ArrowRight, ArrowUpRight, ShieldCheck, MapPin, Sparkle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "About Us",
  description: `${siteConfig.shortName} is a licensed, Tukwila-based trenchless sewer and drain contractor serving the greater Seattle area, available 24/7.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "/ABOUT How we operate/Group 14.png",
    title: "Diagnose before we quote",
    body: "Every estimate starts with a camera inspection, you get the footage, not a guess.",
  },
  {
    icon: "/ABOUT How we operate/Group 15.png",
    title: "Trenchless first",
    body: "We default to the least disruptive method that solves the problem, and explain when it isn't enough.",
  },
  {
    icon: "/ABOUT How we operate/Group 18.png",
    title: "Flat, written pricing",
    body: "The number we quote after inspection is the number you pay, no surprise change orders.",
  },
  {
    icon: "/ABOUT How we operate/Group 17.png",
    title: "Built for contractors too",
    body: "We partner with plumbing companies that need specialist trenchless lining, bursting, or camera work, at trade pricing.",
  },
];

const valuesStars = [
  { top: "12%", left: "18%", size: 10, delay: 0.3 },
  { top: "70%", left: "10%", size: 8, delay: 1.6 },
  { top: "20%", left: "48%", size: 7, delay: 0.9 },
  { top: "80%", left: "42%", size: 9, delay: 2 },
  { top: "15%", left: "72%", size: 8, delay: 1.2 },
  { top: "68%", left: "88%", size: 11, delay: 0.6 },
  { top: "35%", left: "92%", size: 7, delay: 1.9 },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div className="container-px mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">About</span>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <span className="chip">About Gary&rsquo;s</span>
              <h1 className="mt-6 text-balance text-[40px] leading-[1.05] tracking-tight md:text-6xl">
                A Tukwila shop, built on word of mouth.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Gary&rsquo;s Pipelining &amp; Drain Cleaning is a licensed trenchless sewer and drain contractor based
                on Interurban Ave S in Tukwila, Washington. We work on homes, rental properties, and commercial
                buildings across the greater Seattle area, and alongside other plumbing contractors who need
                specialist trenchless work done right.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="btn-primary">
                  Get a free estimate <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={siteConfig.phoneHref} className="btn-ghost">
                  <Phone className="h-4 w-4" /> {siteConfig.phone}
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-premium)]">
              <Image src="/photos/real/job-03.webp" alt="Gary's Pipelining technician at work" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(13,20,40,0.55) 100%)" }} />
              <div className="absolute left-5 top-5 glass rounded-2xl px-3.5 py-2.5 text-xs font-medium">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" /> {siteConfig.license}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <div
            className="relative overflow-hidden rounded-[2.5rem] p-10 noise md:p-16"
            style={{ background: "var(--gradient-hero)", border: "1px solid color-mix(in oklab, white 10%, transparent)" }}
          >
            <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              {valuesStars.map((s, i) => (
                <Sparkle
                  key={`values-star-${i}`}
                  className="header-twinkle absolute text-white/35 lg:text-white/70"
                  style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
                />
              ))}
            </div>
            <div className="relative max-w-2xl">
              <span
                className="chip"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
              >
                <Sparkle className="h-3 w-3 fill-yellow text-yellow" /> How we operate
              </span>
              <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl" style={{ color: "white" }}>
                Beneath the surface, we get it <span style={{ color: "var(--color-yellow)" }}>done.</span>
              </h2>
            </div>
            {/* Mobile: vertical timeline list */}
            <div className="relative mt-10 border-t border-white/10 sm:hidden">
              <div aria-hidden className="pointer-events-none absolute bottom-6 left-2 top-6 w-px bg-white/15" />
              {values.map((v, i) => (
                <div key={v.title}>
                  <div className="relative z-10 flex items-center gap-4 py-6 pl-7">
                    <div className="relative shrink-0">
                      <Image src={v.icon} alt="" width={110} height={110} className="h-14 w-14" />
                      <Sparkle className="absolute -right-1 -top-1 h-3 w-3 fill-yellow text-yellow" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold tracking-normal" style={{ color: "#6ea8ff" }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-0.5 text-base tracking-tight text-white">{v.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">{v.body}</p>
                    </div>
                  </div>
                  {i < values.length - 1 && (
                    <div aria-hidden className="relative h-px bg-white/10">
                      <Sparkle
                        className="absolute left-2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 fill-yellow text-yellow"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tablet & desktop: grid */}
            <div className="relative mt-12 hidden sm:block">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/10" />
              <Sparkle aria-hidden className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 fill-yellow text-yellow" />
              <div className="relative grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
                {[25, 50, 75].map((pct) => (
                  <Sparkle
                    key={`col-divider-star-${pct}`}
                    aria-hidden
                    className="pointer-events-none absolute top-[95px] hidden h-2.5 w-2.5 -translate-x-1/2 fill-yellow text-yellow lg:block"
                    style={{ left: `${pct}%` }}
                  />
                ))}
                {values.map((v, i) => (
                  <div key={v.title} className="lg:px-8 lg:first:pl-0">
                    <div className="relative inline-block">
                      <Image src={v.icon} alt="" width={110} height={110} className="h-[110px] w-[110px]" />
                      <Sparkle className="absolute -right-1 -top-1 h-3.5 w-3.5 fill-yellow text-yellow" />
                    </div>
                    <div className="mt-4 text-xs font-semibold tracking-normal" style={{ color: "#6ea8ff" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-2 text-lg tracking-tight text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="max-w-2xl">
            <span className="chip">Recent work</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl">Real job sites. Real crews.</h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              No stock photography, these are pulled straight from our own jobs across the greater Seattle area.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { src: "/photos/real/job-01.webp", alt: "Sewer line excavation in progress" },
              { src: "/photos/real/job-02.webp", alt: "Crew working a trenchless access pit" },
              { src: "/photos/real/job-04.webp", alt: "Trenchless access pit with pipe exposed" },
              { src: "/photos/real/job-06.webp", alt: "Drain line cleared on a residential job" },
              { src: "/photos/real/job-07.webp", alt: "Gary's Pipelining crew on site" },
              { src: "/photos/real/job-08.webp", alt: "Drain cleaning equipment staged on site" },
              { src: "/photos/real/job-09.webp", alt: "Sump pump installation in progress" },
            ].map((p, i) => (
              <div
                key={p.src}
                className={`relative aspect-square overflow-hidden rounded-2xl border border-border ${i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : ""}`}
              >
                <Image src={p.src} alt={p.alt} fill loading="lazy" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home base */}
      <section className="py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="chip">
                <MapPin className="h-3.5 w-3.5 text-primary" /> Home base
              </span>
              <h2 className="mt-5 text-balance text-3xl leading-[1.1] md:text-4xl">Tukwila, Washington</h2>
              <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Our shop sits on Interurban Ave S, which keeps response times fast for Tukwila, Renton, and Seattle,
                and puts the rest of the greater Seattle area within easy reach.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{siteConfig.address.full}</p>
              <Link href="/service-area" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary link-underline">
                See everywhere we serve <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-elevated)]">
              <iframe
                title="Map to our Tukwila office"
                src={siteConfig.mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-4">
                <a
                  href={siteConfig.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary pointer-events-auto px-4 py-2.5 text-sm"
                >
                  Get directions <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <CtaBand title="Ready to work with a crew that shows you the camera footage first?" subtitle="Get a written, flat-rate estimate after a full inspection, no guesswork, no pressure." />
    </div>
  );
}
