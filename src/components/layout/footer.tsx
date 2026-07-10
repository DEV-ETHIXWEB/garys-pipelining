import Link from "next/link";
import { Phone, ArrowUpRight, Mail, MapPin, Sparkle } from "lucide-react";
import { Logo } from "./logo";
import { services } from "@/lib/content/services";
import { locations } from "@/lib/content/locations";
import { siteConfig } from "@/lib/site-config";

const sparkles = [
  { top: "10%", left: "5%", size: "h-2 w-2", delay: "0s" },
  { top: "85%", left: "12%", size: "h-2.5 w-2.5", delay: "0.8s" },
  { top: "25%", left: "28%", size: "h-2 w-2", delay: "1.6s" },
  { top: "60%", left: "40%", size: "h-2.5 w-2.5", delay: "0.4s" },
  { top: "15%", left: "55%", size: "h-2 w-2", delay: "1.2s" },
  { top: "75%", left: "63%", size: "h-2.5 w-2.5", delay: "2s" },
  { top: "35%", left: "78%", size: "h-2 w-2", delay: "0.6s" },
  { top: "65%", left: "90%", size: "h-2.5 w-2.5", delay: "1.4s" },
  { top: "90%", left: "48%", size: "h-2 w-2", delay: "1.8s" },
];

function FooterSparkleField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {sparkles.map((s, i) => (
        <span key={i} className="header-twinkle absolute" style={{ top: s.top, left: s.left, animationDelay: s.delay }}>
          <Sparkle className={`${s.size} fill-white/60 text-white/60`} />
        </span>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden text-white" style={{ background: "var(--gradient-hero)" }}>
      <div aria-hidden className="absolute inset-0 mesh-overlay opacity-40" />
      <FooterSparkleField />
      <div className="container-px relative mx-auto max-w-[1400px] pb-32 pt-20 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <div className="text-center lg:text-left">
              <Logo />
            </div>
            <p className="mt-6 max-w-sm text-pretty text-white/65">
              Trenchless sewer and drain solutions for homeowners, property managers, and fellow
              contractors across the greater Seattle area. Licensed, insured, and available 24/7.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={siteConfig.phoneHref} className="btn-yellow">
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                Free estimate <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" /> {siteConfig.email}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> {siteConfig.address.full}
              </p>
              <p className="text-white/50">{siteConfig.license}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Services</div>
              <ul className="mt-5 space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-sm text-white/80 transition-colors hover:text-yellow link-underline">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Service Areas</div>
              <ul className="mt-5 space-y-3">
                {locations.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/service-area/${l.slug}`} className="text-sm text-white/80 transition-colors hover:text-yellow link-underline">
                      {l.city}, WA
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Company</div>
              <ul className="mt-5 space-y-3">
                {[
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "All services", href: "/services" },
                  { label: "All service areas", href: "/service-area" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/80 transition-colors hover:text-yellow link-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-yellow">
            <MapPin className="h-3.5 w-3.5" /> Coverage
          </span>
          {locations.map((l) => (
            <Link
              key={l.slug}
              href={`/service-area/${l.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-yellow" /> {l.city}
            </Link>
          ))}
          <Link href="/service-area" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-yellow link-underline">
            Full coverage map <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-[1fr_auto] md:items-center md:pr-24 xl:pr-0">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. Licensed &amp; insured. All rights reserved.
          </p>
          <p className="text-xs text-white/50">{siteConfig.hours}</p>
        </div>
      </div>
    </footer>
  );
}
