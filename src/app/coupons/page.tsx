import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { SpecialsGrid } from "@/components/sections/specials-section";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Drain Cleaning & Sewer Inspection Coupons",
  description: `Current coupons on drain cleaning, camera inspection, and service calls from ${siteConfig.shortName}. Mention it when you call or book online.`,
  path: "/coupons",
});

export default function CouponsPage() {
  return (
    <div className="bg-background">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Coupons", url: `${siteConfig.url}/coupons` },
        ])}
      />
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div className="container-px mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Coupons</span>
          </nav>
          <span className="chip mt-8 inline-flex">This month&rsquo;s coupons</span>
          <h1 className="mt-5 max-w-3xl text-balance text-[40px] leading-[1.05] tracking-tight md:text-6xl">
            Monthly savings, no paper coupon to dig up.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Mention it when you call or book online. Coupons refresh every month, check back or call to see
            what&rsquo;s current.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <h2 className="sr-only">Current coupons</h2>
          <SpecialsGrid />
        </div>
      </section>

      <CtaBand
        title="Need something these coupons don't cover?"
        subtitle="Tell us what's going on, we'll diagnose it and give you a flat-rate estimate before any work begins."
      />
    </div>
  );
}
