import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { locations } from "@/lib/content/locations";
import { siteConfig } from "@/lib/site-config";
import { ServiceAreaMap } from "@/components/sections/service-area-map";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Service Areas",
  description: `Cities across the greater Seattle area where ${siteConfig.shortName} provides trenchless sewer and drain service, based out of Tukwila, WA.`,
  alternates: { canonical: "/service-area" },
};

export default function ServiceAreaPage() {
  return (
    <div className="bg-background">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Service Areas", url: `${siteConfig.url}/service-area` },
        ])}
      />
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div className="container-px mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Service Areas</span>
          </nav>
          <span className="chip mt-8 inline-flex">Where we work</span>
          <h1 className="mt-5 max-w-3xl text-balance text-[40px] leading-[1.05] tracking-tight md:text-6xl">
            Based in Tukwila. Working across the greater Seattle area.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Our shop sits on Interurban Ave S in Tukwila, close enough to reach most of the greater Seattle area
            quickly, with crews running regular routes through each city below.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal>
            <ServiceAreaMap locations={locations} />
          </Reveal>
        </div>
      </section>

      <CtaBand title="Don't see your city listed?" subtitle="Call us, there's a good chance we still cover it. We serve much of the greater Puget Sound region." />
    </div>
  );
}
