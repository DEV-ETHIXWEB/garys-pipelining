import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, ShieldCheck, Clock, ArrowUpRight } from "lucide-react";
import type { Location } from "@/lib/content/locations";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/site-config";
import { ServiceCard } from "./service-card";
import { ReviewsSection } from "./reviews-section";
import { CtaBand } from "./cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export function LocationPageTemplate({ location }: { location: Location }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${location.city}, ${location.state}`)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${location.city}, ${location.state}`)}`;

  return (
    <div className="bg-background">
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Service Areas", url: `${siteConfig.url}/service-area` },
          { name: `${location.city}, WA`, url: `${siteConfig.url}/service-area/${location.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div className="container-px mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/service-area" className="hover:text-foreground">Service Areas</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{location.city}, WA</span>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <span className="chip">
                <MapPin className="h-3.5 w-3.5 text-primary" /> {location.isHQ ? "Home base" : "Service area"}
              </span>
              <h1 className="mt-6 text-balance text-[40px] leading-[1.05] tracking-tight md:text-6xl">
                Sewer &amp; drain experts serving <span className="font-extrabold text-primary">{location.city}, WA</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{location.intro}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={`/contact?area=${encodeURIComponent(location.city)}`} className="btn-primary">
                  Get a free estimate
                </Link>
                <a href={siteConfig.phoneHref} className="btn-emergency">
                  <Phone className="h-4 w-4" /> Emergency line
                </a>
              </div>
              {location.driveTime && (
                <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" /> {location.driveTime}
                </p>
              )}
            </div>
            <div className="relative mx-auto w-[80%]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-premium)]">
              <Image
                src={location.heroImage}
                alt={`${location.city}, WA`}
                fill
                priority
                sizes="(min-width: 1024px) 32vw, 80vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(13,20,40,0.55) 100%)" }} />
              <div className="absolute left-5 top-5 glass rounded-2xl px-3.5 py-2.5 text-xs font-medium">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Licensed &middot; Insured
                </span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local notes + map */}
      <section className="py-24 md:py-32" style={{ background: "var(--color-primary-deep)" }}>
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span
                className="chip"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
              >
                Local knowledge
              </span>
              <h2 className="mt-5 text-balance text-3xl leading-[1.1] md:text-4xl" style={{ color: "white" }}>
                What we see most in {location.city}
              </h2>
              <ul className="mt-7 grid gap-4">
                {location.localNotes.map((note) => (
                  <li key={note} className="flex gap-3 text-base leading-relaxed text-white/75">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-[var(--shadow-elevated)]">
              <iframe
                title={`Map of ${location.city}, WA`}
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ minHeight: 360, border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-end gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary pointer-events-auto px-4 py-2.5 text-sm"
                >
                  Get directions <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services available here */}
      <section className="py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-2xl">
            <span className="chip">Available in {location.city}</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl">Every service, one local crew.</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {services.slice(0, 6).map((s) => (
              <RevealItem key={s.slug}>
                <ServiceCard service={s} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ReviewsSection />

      <CtaBand
        title={`${location.city} homeowners trust Gary's. You can too.`}
        subtitle="Same-day callbacks during business hours. After hours, use the emergency line for live dispatch."
      />
    </div>
  );
}
