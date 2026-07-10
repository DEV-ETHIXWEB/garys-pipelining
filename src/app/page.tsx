import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  CircleCheck,
  Mail,
  MapPin,
} from "lucide-react";
import { services } from "@/lib/content/services";
import { locations } from "@/lib/content/locations";
import { siteConfig, trustStats } from "@/lib/site-config";
import { ServiceCard } from "@/components/sections/service-card";
import { TrustStrip } from "@/components/sections/trust-strip";
import { BeforeAfterSlider } from "@/components/sections/before-after-slider";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { HomeCoverageSection } from "@/components/sections/home-coverage-section";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { EstimateForm } from "@/components/forms/estimate-form-lazy";

export const metadata: Metadata = {
  title: "Seattle's Trenchless Sewer & Drain Experts",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "What is trenchless sewer repair?",
    a: "Trenchless methods restore or replace your underground sewer line through one or two small access points instead of excavating its full length. We use cured-in-place pipe lining and pipe bursting depending on the condition of your line.",
  },
  {
    q: "How long does a typical job take?",
    a: "Most residential trenchless repairs are completed in a single day. Camera inspection takes about an hour, and lining a standard residential lateral is typically a few hours from set-up to cure.",
  },
  {
    q: "Do you offer 24/7 emergency service?",
    a: "Yes. Our emergency line is answered around the clock, every day of the year.",
  },
  {
    q: "Are you licensed and insured?",
    a: `Fully. We hold ${siteConfig.license} and carry general liability and workers' comp coverage.`,
  },
  {
    q: "Will you give me a written, flat-rate estimate?",
    a: "Always. After a camera inspection you receive a written estimate with options before any work begins.",
  },
];

export default function Home() {
  const featuredServices = services.filter((s) => s.featured);
  const otherServices = services.filter((s) => !s.featured).slice(0, 6 - featuredServices.length);
  const homeServices = [...featuredServices, ...otherServices];

  return (
    <div className="bg-background">
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* HERO + TRUST STRIP background wrapper */}
      <div className="relative overflow-hidden">
        {/* HERO */}
        <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
          <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
          <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[680px] mesh-overlay opacity-35" />

        <div className="container-px mx-auto max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="animate-fade-up">
              <span className="chip">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emergency opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emergency" />
                </span>
                24/7 Emergency Response
              </span>

              <h1 className="mt-6 text-[44px] leading-[1.02] tracking-tight md:text-[68px] lg:text-[84px]">
                No dig. <span className="font-extrabold text-primary whitespace-nowrap">No&nbsp;mess.</span> Fixed fast.
              </h1>

              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Seattle&rsquo;s trusted trenchless sewer &amp; drain specialists. We restore pipes across the greater
                Seattle area without tearing up your yard, driveway, or weekend, for homeowners and contractors alike.
              </p>

              <div className="mt-9 grid grid-cols-2 items-center gap-3 sm:flex sm:flex-wrap">
                <Link
                  href="/contact"
                  className="btn-primary !gap-1.5 !whitespace-nowrap !px-4 !py-2.5 !text-sm sm:!gap-2 sm:!px-6 sm:!py-[0.95rem] sm:!text-[0.95rem]"
                >
                  Get a free estimate
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="btn-emergency !gap-1.5 !whitespace-nowrap !px-4 !py-2.5 !text-sm sm:!gap-2 sm:!px-6 sm:!py-[0.95rem] sm:!text-[0.95rem]"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                  Emergency line
                </a>
              </div>

              <ul className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
                {trustStats.map((s) => (
                  <li key={s.label} className="flex flex-col items-start gap-3">
                    <Image src={s.icon} alt="" aria-hidden width={88} height={88} className="h-[88px] w-[88px] shrink-0" />
                    <div>
                      <div className="text-sm font-semibold leading-tight text-ink">{s.value}</div>
                      <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-4/5 animate-fade-in-slow">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-premium)]">
                <Image
                  src="/photos/real/job-02.webp"
                  width={1200}
                  height={1500}
                  alt="Gary's Pipelining crew working a trenchless sewer access pit"
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  priority
                />
                <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(13,20,40,0.55) 100%)" }} />

                <div className="absolute left-5 top-5 glass rounded-2xl px-3.5 py-2.5 text-xs font-medium">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Licensed &middot; Insured
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-yellow text-yellow-foreground">
                      <ShieldCheck className="h-5 w-5 fill-yellow" stroke="#001B82" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-ink">Real jobs. Real crews.</div>
                      <p className="mt-1 text-xs text-muted-foreground">Photos from our own sites across the Puget Sound.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 -top-4 hidden h-20 w-20 overflow-hidden rounded-full border-4 border-background shadow-[var(--shadow-elevated)] md:block lg:-right-6 lg:-top-6 lg:h-24 lg:w-24">
                <Image src="/brand/icon-circle.png" alt="Gary's Pipelining seal" fill sizes="96px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
        </section>

        <Reveal>
          <TrustStrip />
        </Reveal>
      </div>

      {/* SERVICES */}
      <section id="services" className="relative py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <span className="chip">Services</span>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl leading-[1.05] md:text-6xl">
                Everything your sewer line needs. <span className="text-muted-foreground">No more, no less.</span>
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary link-underline">
              View all services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {homeServices.map((s) => (
              <RevealItem key={s.slug}>
                <ServiceCard service={s} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* UNDERGROUND POSITIONING */}
      <Reveal>
        <section className="relative overflow-hidden py-6" style={{ background: "var(--gradient-hero)" }}>
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="flex items-center justify-center gap-4 text-center">
              <span aria-hidden className="hidden h-px w-16 bg-white/25 sm:block" />
              <p className="text-balance text-sm font-medium text-white/85 md:text-base">
                Most of what we do happens <span className="font-semibold text-yellow">underground, out of sight</span>. You
                only ever see the result.
              </p>
              <span aria-hidden className="hidden h-px w-16 bg-white/25 sm:block" />
            </div>
          </div>
        </section>
      </Reveal>

      {/* TECHNOLOGY */}
      <section id="technology" className="relative overflow-hidden py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-3xl">
            <span className="chip">Technology</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              Modern equipment. <span className="text-muted-foreground">Old-school craft.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              We invest in the equipment that makes the job cleaner, faster, and longer-lasting, so you get a result
              that&rsquo;s engineered, not improvised.
            </p>
          </Reveal>

          <div className="mt-16 space-y-6">
            {[
              {
                name: "Cured-In-Place Pipe Lining",
                img: "/photos/stock/tech-pipelining.jpg",
                desc: "An epoxy-saturated liner is inverted into your existing pipe and cured into a seamless new wall, stronger than the original, with no joints for roots to invade.",
                points: ["Decades of service life", "No yard disruption", "Installs in hours"],
                href: "/services/trenchless-sewer-repair",
              },
              {
                name: "HD Camera Diagnostics",
                img: "/photos/stock/tech-camera.jpg",
                desc: "Self-leveling color cameras pinpoint cracks, bellies, and blockages in real time. You see exactly what we see, no guesswork, no upsell.",
                points: ["Full video report", "Locating to the foot", "Plain-language findings"],
                href: "/services/sewer-inspection",
              },
              {
                name: "High-Pressure Hydro Jetting",
                img: "/photos/stock/tech-hydrojet.jpg",
                desc: "Controlled streams of pressurized water restore full pipe diameter, clearing grease, roots, and scale that cabling alone leaves behind.",
                points: ["Up to 4,000 PSI", "Chemical-free", "Pipe-safe nozzles"],
                href: "/services/hydro-jetting",
              },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <article
                  className={`skeu-card grid items-stretch gap-6 overflow-hidden rounded-[2rem] lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[5/4] overflow-hidden lg:aspect-auto">
                    <Image src={t.img} alt={t.name} fill loading="lazy" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">0{i + 1} &middot; Method</span>
                    <h3 className="mt-4 text-3xl tracking-tight text-ink md:text-4xl">{t.name}</h3>
                    <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">{t.desc}</p>
                    <ul className="mt-7 grid gap-2.5">
                      {t.points.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-sm text-foreground/80">
                          <CircleCheck className="h-4 w-4 text-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <Link href={t.href} className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-primary link-underline">
                      Learn more<span className="sr-only"> about {t.name}</span> <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section id="about" className="relative bg-surface py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] shadow-[var(--shadow-premium)]">
              <Image
                src="/photos/real/job-05.webp"
                alt="Gary's Pipelining crew on a job site"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,20,40,0.0) 50%, rgba(13,20,40,0.65) 100%)" }} />
            </div>

            <div>
              <span className="chip">About Gary&rsquo;s</span>
              <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
                A Tukwila-based crew with the tools of a national contractor.
              </h2>
              <p className="mt-7 max-w-xl text-pretty text-lg text-muted-foreground">
                Gary&rsquo;s Pipelining &amp; Drain Cleaning is the call homeowners, property managers, and fellow
                contractors across the greater Seattle area make when the job has to be done right the first time,
                with as little disruption to your property as possible.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
                {[
                  { k: "24/7", v: "Emergency dispatch" },
                  { k: "Trenchless", v: "First, whenever it's the right fit" },
                  { k: "Licensed", v: siteConfig.license },
                  { k: "Written", v: "Flat-rate estimates" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="break-words font-display text-2xl text-ink sm:text-3xl md:break-normal md:text-4xl">{s.k}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/about" className="btn-primary">
                  Meet the team <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={siteConfig.phoneHref} className="btn-ghost">
                  <Phone className="h-4 w-4" /> {siteConfig.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="relative overflow-hidden py-24 md:py-32 noise" style={{ background: "var(--gradient-hero)", color: "white" }}>
        <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
        <div className="container-px relative mx-auto max-w-[1400px]">
          <Reveal>
            <span className="chip" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}>
              Why Gary&rsquo;s
            </span>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl leading-[1.05] md:text-6xl" style={{ color: "white" }}>
              The difference is in how we work, <span className="font-extrabold" style={{ color: "var(--color-yellow)" }}>not just what we do.</span>
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2" stagger={0.1}>
            {[
              { n: "01", title: "Diagnose before we quote", body: "Every estimate starts with a camera inspection. You get the footage. You get the truth." },
              { n: "02", title: "Minimum-impact methods first", body: "We default to trenchless. We dig only when the line truly needs it, and we tell you why." },
              { n: "03", title: "Flat pricing, signed up front", body: "No surprise change-orders. The number we quote is the number you pay." },
              { n: "04", title: "Workmanship that lasts", body: "Modern trenchless pipe lining is built to last decades, and we back our installs in writing." },
            ].map((r) => (
              <RevealItem key={r.n}>
                <div className="group flex h-full flex-col gap-6 p-8 md:p-10" style={{ background: "oklch(0.15 0.06 260)" }}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-5xl text-white/40 md:text-6xl">{r.n}</span>
                    <ArrowUpRight className="h-5 w-5 text-white/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow" />
                  </div>
                  <div>
                    <h3 className="text-2xl tracking-tight text-white md:text-3xl">{r.title}</h3>
                    <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-white/65">{r.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 flex justify-center">
            <Link href="/contact" className="btn-yellow w-fit">
              Get my estimate <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="chip">How we work</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">Five steps. Zero surprises.</h2>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              A process built around the question every homeowner actually has:{" "}
              <span className="text-foreground">what&rsquo;s wrong, and what will it cost?</span>
            </p>
          </Reveal>

          <div className="relative mt-20">
            <div aria-hidden className="absolute left-0 right-0 top-[33.6px] hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent md:block" />
            <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-5 md:gap-10" stagger={0.1}>
              {[
                { icon: "/New Assets/Group 28.svg", title: "Inspection", body: "HD camera survey of your line, on video, in full color." },
                { icon: "/New Assets/clarity_camera-line.svg", title: "Diagnosis", body: "We walk you through the footage and the options, no jargon." },
                { icon: "/New Assets/fa-solid_tools.svg", title: "Repair", body: "Trenchless first. Dig only if absolutely necessary." },
                { icon: "/New Assets/material-symbols-light_water-drops-rounded.svg", title: "Testing", body: "Flow tested before we pack up." },
                { icon: "/New Assets/icon-park-solid_check-one.svg", title: "Completion", body: "Site restored. Written warranty in hand." },
              ].map((s, i) => (
                <RevealItem key={s.title} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
                  <div className="relative z-10 mx-auto grid h-[67.2px] w-[67.2px] place-items-center rounded-2xl bg-surface-elevated shadow-[var(--shadow-soft)]" style={{ border: "1px solid var(--color-border)" }}>
                    <Image src={s.icon} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
                  </div>
                  <div className="mt-5 text-center">
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Step {String(i + 1).padStart(2, "0")}</div>
                    <h3 className="mt-2 text-xl tracking-tight text-ink">{s.title}</h3>
                    <p className="mx-auto mt-2 max-w-[200px] text-sm text-muted-foreground">{s.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <Reveal>
        <BeforeAfterSlider />
      </Reveal>

      <ReviewsSection />

      <Reveal>
        <HomeCoverageSection locations={locations} />
      </Reveal>

      {/* FAQ */}
      <section id="faq" className="bg-surface py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div>
              <span className="chip">FAQ</span>
              <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
                Questions, <span className="text-muted-foreground">answered.</span>
              </h2>
              <p className="mt-6 text-pretty text-muted-foreground">
                Don&rsquo;t see yours here? Call us, we&rsquo;ll talk through it without a sales pitch.
              </p>
              <a href={siteConfig.phoneHref} className="btn-ghost mt-8">
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
            </div>
            <FaqAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* ESTIMATE / CONTACT */}
      <section id="estimate" className="relative overflow-hidden py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal>
          <div className="grid gap-10 overflow-hidden rounded-[2.5rem] lg:grid-cols-[1.05fr_1fr]" style={{ background: "var(--gradient-hero)" }}>
            <div className="relative flex flex-col p-10 md:p-14">
              <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
              <div className="relative text-center lg:text-left">
                <span className="chip" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}>
                  Free estimate
                </span>
                <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl lg:text-6xl" style={{ color: "white" }}>
                  Tell us what&rsquo;s wrong. <span className="font-extrabold" style={{ color: "var(--color-yellow)" }}>We&rsquo;ll tell you what&rsquo;s right.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-md text-pretty text-white/70 lg:mx-0">
                  Same-day callbacks during business hours. After hours? Use the emergency line below for live dispatch.
                </p>

                <div className="mt-10 grid gap-5">
                  {[
                    { Icon: Phone, label: "Call", value: siteConfig.phone, href: siteConfig.phoneHref },
                    { Icon: Mail, label: "Email", value: siteConfig.email, href: siteConfig.emailHref },
                    { Icon: MapPin, label: "Address", value: siteConfig.address.full },
                  ].map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10 sm:flex-row sm:gap-4 lg:flex-row"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
                        <c.Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1 text-center sm:text-left lg:text-left">
                        <div className="text-xs uppercase tracking-wider text-white/50">{c.label}</div>
                        <div className="break-words text-white sm:truncate">{c.value}</div>
                      </div>
                      {c.href && <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />}
                    </a>
                  ))}
                </div>

                <div className="mt-8 flex justify-center lg:justify-start">
                  <a href={siteConfig.phoneHref} className="btn-emergency">
                    <Phone className="h-4 w-4" /> 24/7 Emergency Line
                  </a>
                </div>
              </div>

              <div className="relative mt-10 hidden flex-1 flex-col justify-center lg:flex">
                <TestimonialCarousel orientation="vertical" />
              </div>
            </div>

            <div className="bg-surface-elevated p-8 md:p-12">
              <EstimateForm />
            </div>
          </div>

          <div className="mt-10 rounded-[2.5rem] p-8 md:p-10 lg:hidden" style={{ background: "var(--gradient-hero)" }}>
            <TestimonialCarousel orientation="horizontal" />
          </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
