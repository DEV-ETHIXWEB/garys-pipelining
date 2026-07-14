import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight, Phone, ShieldCheck } from "lucide-react";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getServiceBySlug, type Service } from "@/lib/content/services";
import { siteConfig } from "@/lib/site-config";
import { ProcessSteps } from "./process-steps";
import { ServiceCard } from "./service-card";
import { ReviewsSection } from "./reviews-section";
import { CtaBand } from "./cta-band";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SparkleField } from "@/components/ui/sparkle-field";

export function ServicePageTemplate({ service }: { service: Service }) {
  const related = service.relatedSlugs.map(getServiceBySlug).filter((s): s is Service => Boolean(s));

  return (
    <div className="bg-background">
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
          { name: service.name, url: `${siteConfig.url}/services/${service.slug}` },
        ])}
      />
      <JsonLd data={faqSchema(service.faqs)} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div className="container-px mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/services" className="hover:text-foreground">Services</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{service.name}</span>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <span className="chip">
                <ServiceIcon name={service.icon} className="h-3.5 w-3.5 text-primary" /> {service.category}
              </span>
              <h1 className="mt-6 text-balance text-[40px] leading-[1.05] tracking-tight md:text-6xl">{service.heroHeadline}</h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{service.heroSubheadline}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={`/contact?service=${encodeURIComponent(service.name)}`} className="btn-primary">
                  Get a free estimate <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={siteConfig.phoneHref} className="btn-emergency">
                  <Phone className="h-4 w-4" /> Emergency line
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-[70%]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-premium)]">
              <Image src={service.heroImage} alt={service.name} fill priority sizes="(min-width: 1024px) 28vw, 70vw" className="object-cover" />
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

      {/* Problem / Solution */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="chip">The problem</span>
              <h2 className="mt-5 text-balance text-3xl leading-[1.1] md:text-4xl">What you&rsquo;re probably dealing with</h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">{service.problem}</p>
            </div>
            <div>
              <span className="chip">Our approach</span>
              <h2 className="mt-5 text-balance text-3xl leading-[1.1] md:text-4xl">How we fix it</h2>
              <div className="mt-6 grid gap-4">
                {service.solution.map((p) => (
                  <p key={p} className="text-pretty text-[15px] leading-relaxed text-foreground/85">
                    {p}
                  </p>
                ))}
              </div>
              {service.technology && (
                <div className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-surface-elevated p-5">
                  <Image
                    src="/photos/real/drain-cleaner-tool.png"
                    alt=""
                    aria-hidden
                    width={96}
                    height={96}
                    className="pointer-events-none absolute -right-4 -bottom-4 h-24 w-24 opacity-[0.08]"
                  />
                  <p className="relative text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-ink">Equipment we use: </span>
                    {service.technology}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-2xl">
            <span className="chip">Why it&rsquo;s worth it</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl">
              {service.name}{service.benefitsTagline ? `: ${service.benefitsTagline}` : ", done right."}
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {service.benefits.map((b, i) => (
              <RevealItem key={b.title}>
                <div
                  className="relative h-full overflow-hidden rounded-2xl p-7 shadow-[var(--shadow-elevated)] transition-transform duration-300 hover:-translate-y-1"
                  style={{ background: "var(--gradient-hero)", border: "1px solid color-mix(in oklab, white 10%, transparent)" }}
                >
                  <SparkleField variant="compact" />
                  <div className="text-5xl font-bold tracking-tight text-yellow">{String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-4 h-[3px] w-9 rounded-full bg-yellow" />
                  <h3 className="mt-6 text-lg tracking-tight text-white">{b.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/70">{b.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-2xl">
            <span className="chip">How it works</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl">Our process, start to finish.</h2>
          </Reveal>
          <ProcessSteps steps={service.process} />
        </div>
      </section>

      <ReviewsSection />

      {/* FAQ */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div>
              <span className="chip">FAQ</span>
              <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl">
                Questions about <span className="text-muted-foreground">{service.name.toLowerCase()}.</span>
              </h2>
              <a href={siteConfig.phoneHref} className="btn-ghost mt-8">
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
            </div>
            <FaqAccordion items={service.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal>
              <div className="flex items-end justify-between gap-8">
                <h2 className="text-balance text-4xl leading-[1.05] md:text-5xl">Related services</h2>
                <Link href="/services" className="hidden items-center gap-1.5 text-sm font-medium text-primary link-underline sm:inline-flex">
                  View all services <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
              {related.map((s) => (
                <RevealItem key={s.slug}>
                  <ServiceCard service={s} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaBand
        title={`Ready to fix it? Let's talk ${service.name.toLowerCase()}.`}
        subtitle="Same-day callbacks during business hours. After hours, use the emergency line for live dispatch."
        serviceQuery={service.name}
      />
    </div>
  );
}
