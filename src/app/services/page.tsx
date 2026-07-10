import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content/services";
import { locations } from "@/lib/content/locations";
import { siteConfig } from "@/lib/site-config";
import { ServiceCard } from "@/components/sections/service-card";
import { CtaBand } from "@/components/sections/cta-band";
import { CoverageMapPreview } from "@/components/sections/coverage-map-preview";

export const metadata: Metadata = {
  title: "Sewer & Drain Services",
  description: `Trenchless sewer repair, pipe bursting, hydro jetting, camera inspection, and more, every service ${siteConfig.shortName} offers across the greater Seattle area.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div className="container-px mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Services</span>
          </nav>
          <span className="chip mt-8 inline-flex">All services</span>
          <h1 className="mt-5 max-w-3xl text-balance text-[40px] leading-[1.05] tracking-tight md:text-6xl">
            Every sewer & drain service your property could need.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            We specialize in the modern, less-invasive trenchless methods most contractors don&rsquo;t offer, and
            the proven drain fundamentals every home eventually needs.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20 noise" style={{ background: "var(--gradient-hero)" }}>
        <div aria-hidden className="absolute inset-0 mesh-overlay opacity-40" />
        <div className="container-px relative mx-auto max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-balance text-4xl leading-[1.05] md:text-5xl" style={{ color: "white" }}>
                Where we work
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/70">
                Based in Tukwila, serving homeowners and businesses across the greater Seattle area.
              </p>
              <Link href="/service-area" className="btn-yellow mt-8 w-fit">
                View all Service Areas <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <CoverageMapPreview locations={locations} className="-mx-6 rounded-none md:-mx-12 md:rounded-none lg:mx-0 lg:rounded-[2.5rem]" />
          </div>
        </div>
      </section>

      <CtaBand title="Not sure which service you need?" subtitle="Tell us what's going on, we'll diagnose it and recommend the right fix, not the most expensive one." />
    </div>
  );
}
