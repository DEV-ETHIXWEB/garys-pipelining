import Link from "next/link";
import { Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";

export function CtaBand({
  eyebrow = "Free estimate",
  title,
  subtitle,
  serviceQuery,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  serviceQuery?: string;
}) {
  const contactHref = serviceQuery ? `/contact?service=${encodeURIComponent(serviceQuery)}` : "/contact";
  return (
    <section className="py-24 md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2.5rem] p-10 text-center md:p-16"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
            <div className="relative mx-auto max-w-2xl">
              <span
                className="chip"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
              >
                {eyebrow}
              </span>
              <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl" style={{ color: "white" }}>
                {title}
              </h2>
              {subtitle && <p className="mt-5 text-pretty text-white/70">{subtitle}</p>}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={contactHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-[0.95rem] text-[0.95rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-white/10 active:scale-[0.97]"
                  style={{ border: "1.5px solid white", background: "transparent" }}
                >
                  Get my free estimate <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href={siteConfig.phoneHref} className="btn-emergency">
                  <Phone className="h-4 w-4" /> {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
