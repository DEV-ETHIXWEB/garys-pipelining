import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CircleCheck,
  Check,
  X,
  ChevronRight,
  Mail,
  MapPin,
  Users,
  CalendarClock,
  Zap,
  Cog,
  Wrench,
  FileText,
  ClipboardList,
  Handshake,
  HardHat,
  KeyRound,
  Building2,
  ShieldAlert,
  Landmark,
  Hammer,
  Droplets,
  Factory,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  UserCheck,
} from "lucide-react";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/site-config";
import { ServiceCard } from "@/components/sections/service-card";
import { BeforeAfterSlider } from "@/components/sections/before-after-slider";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PartnershipForm } from "@/components/forms/partnership-form-lazy";

export const metadata: Metadata = {
  title: "Contractor Partnership Program",
  description:
    "Partner with Gary's Pipelining, Seattle's trusted underground utility and trenchless contractor. Dedicated support, priority scheduling, and commercial-grade trenchless sewer, drain, and excavation work for general contractors, property managers, developers, and municipalities.",
  alternates: { canonical: "/contractor-partnership" },
};

const whyPartner = [
  { icon: Users, title: "Dedicated contractor support", body: "A single point of contact who knows your projects, not a new voice every call." },
  { icon: CalendarClock, title: "Priority scheduling", body: "Partner jobs move to the front of the queue, so your timeline stays on track." },
  { icon: Zap, title: "Fast emergency dispatch", body: "24/7 emergency response when a job can't wait for the next business day." },
  { icon: Cog, title: "Trenchless expertise", body: "Cured-in-place lining and pipe bursting, so digging is the exception, not the default." },
  { icon: Wrench, title: "Commercial-grade equipment", body: "Trailer- and truck-mounted jetting, HD camera, and locating equipment sized for commercial scope." },
  { icon: FileText, title: "Transparent pricing", body: "Flat, written estimates with no surprise change-orders on your invoice." },
  { icon: ShieldCheck, title: "Licensed & insured", body: siteConfig.license + ", with general liability and workers' comp coverage on every crew." },
  { icon: ClipboardList, title: "Job progress updates", body: "Photo and video documentation at each stage, so you can update your own client with confidence." },
  { icon: Handshake, title: "Long-term relationships", body: "We're built for repeat work, not one-off calls, with pricing and process that scale with you." },
];

const industries = [
  { icon: HardHat, name: "General Contractors", body: "Trenchless subcontract work on your schedule." },
  { icon: KeyRound, name: "Property Managers", body: "Fast turnaround on tenant-impacting sewer and drain issues." },
  { icon: Building2, name: "Commercial Developers", body: "Utility work scoped and priced for multi-unit builds." },
  { icon: Users, name: "HOAs", body: "Shared-line repairs coordinated across ownership." },
  { icon: ShieldAlert, name: "Restoration Companies", body: "Fast diagnosis and repair after water damage or backups." },
  { icon: Landmark, name: "Municipal Projects", body: "Public and utility-adjacent work handled to code." },
  { icon: Hammer, name: "Builders", body: "Underground utility rough-in and tie-ins for new builds." },
  { icon: Droplets, name: "Plumbing Companies", body: "Trenchless specialty work as a subcontractor partner." },
  { icon: Factory, name: "Industrial Facilities", body: "Commercial-grade jetting and line maintenance." },
  { icon: HeartPulse, name: "Healthcare Facilities", body: "Low-disruption repairs for occupied, sensitive sites." },
  { icon: GraduationCap, name: "Education", body: "Scheduled around campus calendars and off-hours." },
  { icon: ShoppingBag, name: "Retail Centers", body: "Minimal downtime repairs that keep doors open." },
];

const partnershipProcess = [
  { icon: FileText, title: "Submit partnership request", body: "Tell us about your company and the work you need support on." },
  { icon: Phone, title: "Discovery call", body: "We learn your typical project types, volume, and timelines." },
  { icon: ClipboardList, title: "Review your workflow", body: "We map our process to how your team already operates." },
  { icon: UserCheck, title: "Assign dedicated contact", body: "You get a direct line to the person who knows your account." },
  { icon: Handshake, title: "Begin working together", body: "Your first job is scheduled, with priority partner turnaround." },
];

const whyChoosePoints = [
  "Fast communication",
  "Detailed documentation",
  "On-time scheduling",
  "Emergency availability",
  "Clean work sites",
  "Licensed professionals",
  "Transparent pricing",
  "High-quality workmanship",
  "Safety-first approach",
];

const comparisonRows = [
  { label: "Dedicated support", ours: true, typical: false },
  { label: "Priority scheduling", ours: true, typical: false },
  { label: "24/7 emergency response", ours: true, typical: false },
  { label: "Commercial trenchless expertise", ours: true, typical: false },
  { label: "Job progress tracking & documentation", ours: true, typical: false },
  { label: "Direct, consistent communication", ours: true, typical: false },
  { label: "Flat, written pricing", ours: true, typical: false },
  { label: "Written workmanship warranty", ours: true, typical: false },
];

const galleryPhotos = [
  { src: "/photos/real/job-01.webp", caption: "Underground utility access pit" },
  { src: "/photos/real/job-02.webp", caption: "Trenchless sewer access pit" },
  { src: "/photos/real/job-03.webp", caption: "Field diagnostics on site" },
  { src: "/photos/real/job-04.webp", caption: "Commercial-scale excavation" },
  { src: "/photos/real/job-06.webp", caption: "Root intrusion clearing" },
  { src: "/photos/real/job-08.webp", caption: "Equipment staged on a commercial site" },
  { src: "/photos/real/job-09.webp", caption: "Sump pump installation" },
];

const partnershipFaqs = [
  {
    q: "How do partnerships work?",
    a: "You submit a partnership request, we run a short discovery call to understand your typical project types and volume, and we assign a dedicated contact who becomes your direct line for scheduling and support going forward.",
  },
  {
    q: "Is there a minimum project size?",
    a: "No. We work with partners on everything from single-unit tenant repairs to multi-phase commercial and municipal projects.",
  },
  {
    q: "Do you offer emergency support?",
    a: "Yes. Partners get priority access to our 24/7 emergency dispatch line for jobs that can't wait for a scheduled visit.",
  },
  {
    q: "Can you work as a subcontractor?",
    a: "Yes, we regularly work as a trenchless and drain specialist subcontractor under general contractors, builders, and plumbing companies.",
  },
  {
    q: "Do you provide commercial maintenance?",
    a: "Yes, we offer scheduled hydro jetting, camera inspection, and preventive line maintenance for commercial and industrial accounts.",
  },
  {
    q: "Do you travel?",
    a: "We serve the greater Seattle area across King and Pierce counties. For partners with projects outside that range, reach out and we'll let you know if it's a fit.",
  },
  {
    q: "Do you support municipalities?",
    a: "Yes, we take on municipal and utility-adjacent underground work performed to code, with the documentation municipal projects require.",
  },
  {
    q: "Can multiple offices work together?",
    a: "Yes, a single partnership account can cover multiple offices, property portfolios, or regional teams under one dedicated contact.",
  },
];

export default function ContractorPartnershipPage() {
  return (
    <div className="bg-background">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Contractor Partnership", url: `${siteConfig.url}/contractor-partnership` },
        ])}
      />
      <JsonLd data={faqSchema(partnershipFaqs)} />

      {/* HERO */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[680px] mesh-overlay opacity-35" />

        <div className="container-px mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Contractor Partnership</span>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="animate-fade-up">
              <span className="chip">
                <Handshake className="h-3.5 w-3.5" />
                For contractors &amp; businesses
              </span>

              <h1 className="mt-6 text-balance text-[40px] leading-[1.05] tracking-tight md:text-6xl lg:text-[72px]">
                Partner with Seattle&rsquo;s trusted underground utility experts.
              </h1>

              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Support your projects with experienced trenchless specialists, fast response times, dependable
                communication, and workmanship you can confidently stand behind.
              </p>

              <div className="mt-9 grid grid-cols-2 items-center gap-3 sm:flex sm:flex-wrap">
                <a
                  href="#partnership-form"
                  className="btn-primary !gap-1.5 !whitespace-nowrap !px-4 !py-2.5 !text-sm sm:!gap-2 sm:!px-6 sm:!py-[0.95rem] sm:!text-[0.95rem]"
                >
                  Become a partner
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="btn-ghost !gap-1.5 !whitespace-nowrap !px-4 !py-2.5 !text-sm sm:!gap-2 sm:!px-6 sm:!py-[0.95rem] sm:!text-[0.95rem]"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                  Talk with our team
                </a>
              </div>

              <ul className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  { k: "24/7", v: "Emergency dispatch" },
                  { k: "Priority", v: "Partner scheduling" },
                  { k: "Licensed", v: "Fully insured crews" },
                ].map((s) => (
                  <li key={s.v} className="flex flex-col items-start gap-1">
                    <div className="font-display text-2xl text-ink md:text-3xl">{s.k}</div>
                    <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.v}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-4/5 animate-fade-in-slow">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-premium)]">
                <Image
                  src="/photos/real/job-07.webp"
                  fill
                  alt="Gary's Pipelining crew on a commercial underground utility job"
                  className="object-cover"
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
                      <Handshake className="h-5 w-5" stroke="#001B82" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-ink">Your underground utility partner.</div>
                      <p className="mt-1 text-xs text-muted-foreground">Dedicated support for contractors across the Puget Sound.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="relative py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="chip">Why partner with Gary&rsquo;s</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              Built to support <span className="text-muted-foreground">your business, not just your job site.</span>
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {whyPartner.map((f) => (
              <RevealItem key={f.title}>
                <div className="surface-card surface-card-hover h-full p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl tracking-tight text-ink">{f.title}</h3>
                  <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="relative bg-surface py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="chip">Who we work with</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">Industries we work with.</h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" stagger={0.04}>
            {industries.map((ind) => (
              <RevealItem key={ind.name}>
                <div className="group h-full rounded-2xl border border-border bg-surface-elevated p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-elevated)]">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                    <ind.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">{ind.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{ind.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* PARTNERSHIP PROCESS */}
      <section className="py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="chip">How it works</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">Our partnership process.</h2>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              Five steps from first contact to your first job, built to fit into how your team already operates.
            </p>
          </Reveal>

          <div className="relative mt-20">
            <div aria-hidden className="absolute left-0 right-0 top-[33.6px] hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent md:block" />
            <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-5 md:gap-10" stagger={0.1}>
              {partnershipProcess.map((s, i) => (
                <RevealItem key={s.title} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
                  <div className="relative z-10 mx-auto grid h-[67.2px] w-[67.2px] place-items-center rounded-2xl bg-surface-elevated shadow-[var(--shadow-soft)]" style={{ border: "1px solid var(--color-border)" }}>
                    <s.icon className="h-6 w-6 text-primary" />
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

      {/* WHY CONTRACTORS CHOOSE US */}
      <section className="relative bg-surface py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] shadow-[var(--shadow-premium)]">
              <Image
                src="/photos/real/job-05.webp"
                alt="Gary's Pipelining crew working a commercial job site"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,20,40,0.0) 50%, rgba(13,20,40,0.65) 100%)" }} />
            </div>

            <div>
              <span className="chip">Why contractors choose us</span>
              <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
                The reliability your reputation depends on.
              </h2>
              <p className="mt-7 max-w-xl text-pretty text-lg text-muted-foreground">
                When our name is behind a job on your project, it reflects on you too. That&rsquo;s why partners come
                back to us project after project.
              </p>

              <ul className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {whyChoosePoints.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground/80">
                    <CircleCheck className="h-4 w-4 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#partnership-form" className="btn-primary">
                  Become a partner <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="relative py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <span className="chip">Featured services</span>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl leading-[1.05] md:text-6xl">
                The full trenchless toolkit, <span className="text-muted-foreground">on call for your projects.</span>
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary link-underline">
              View all services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {services.map((s) => (
              <RevealItem key={s.slug}>
                <ServiceCard service={s} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <section className="overflow-hidden bg-surface py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal>
            <span className="chip">Project gallery</span>
            <h2 className="mt-5 max-w-2xl text-balance text-4xl leading-[1.05] md:text-6xl">
              Commercial jobs. Municipal work. <span className="text-muted-foreground">Real crews, real sites.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-14 overflow-hidden">
            <div className="marquee-track flex w-max shrink-0 gap-6 hover:[animation-play-state:paused]" style={{ animationDuration: "50s" }}>
              {[...galleryPhotos, ...galleryPhotos].map((p, i) => (
                <figure
                  key={`${p.src}-${i}`}
                  aria-hidden={i >= galleryPhotos.length}
                  className="group relative h-[300px] w-[380px] shrink-0 overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-soft)]"
                >
                  <Image src={p.src} alt={p.caption} fill loading="lazy" sizes="380px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(13,20,40,0.75) 100%)" }} />
                  <figcaption className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <BeforeAfterSlider />
      </Reveal>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="chip">What our clients say</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              Communication, reliability, <span className="text-muted-foreground">and quality that shows.</span>
            </h2>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              Verified reviews from the same crews and process our contractor partners rely on.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <div className="rounded-[2.5rem] p-8 md:p-12" style={{ background: "var(--gradient-hero)" }}>
              <TestimonialCarousel orientation="horizontal" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="chip">Partnership benefits</span>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
              Gary&rsquo;s Partnership vs. <span className="text-muted-foreground">the typical contractor experience.</span>
            </h2>
          </Reveal>

          <Reveal className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[640px] overflow-hidden rounded-[2rem] border border-border bg-surface-elevated text-left">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="p-5 text-sm font-semibold text-ink md:p-6">
                    &nbsp;
                  </th>
                  <th scope="col" className="p-5 text-sm font-semibold text-primary md:p-6">
                    Gary&rsquo;s Partnership
                  </th>
                  <th scope="col" className="p-5 text-sm font-semibold text-muted-foreground md:p-6">
                    Typical contractor
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={i !== comparisonRows.length - 1 ? "border-b border-border" : ""}>
                    <th scope="row" className="p-5 text-sm font-medium text-foreground md:p-6">
                      {row.label}
                    </th>
                    <td className="p-5 md:p-6">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" />
                      </span>
                    </td>
                    <td className="p-5 md:p-6">
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-border-strong text-muted-foreground">
                        <X className="h-4 w-4" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div>
              <span className="chip">FAQ</span>
              <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl">
                Questions, <span className="text-muted-foreground">answered.</span>
              </h2>
              <p className="mt-6 text-pretty text-muted-foreground">
                Don&rsquo;t see yours here? Call us, we&rsquo;ll talk through it directly.
              </p>
              <a href={siteConfig.phoneHref} className="btn-ghost mt-8">
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
            </div>
            <FaqAccordion items={partnershipFaqs} />
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:pb-0 md:pt-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] p-10 text-center md:p-16 noise" style={{ background: "var(--gradient-hero)" }}>
              <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
              <div className="relative mx-auto max-w-2xl">
                <span
                  className="chip"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
                >
                  Let&rsquo;s work together
                </span>
                <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl" style={{ color: "white" }}>
                  Let&rsquo;s build better projects together.
                </h2>
                <p className="mt-5 text-pretty text-white/70">
                  Whether you&rsquo;re managing one project or hundreds each year, our team is ready to become your
                  trusted underground utility partner.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="#partnership-form"
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-[0.95rem] text-[0.95rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-white/10 active:scale-[0.97]"
                    style={{ border: "1.5px solid white", background: "transparent" }}
                  >
                    Become a partner <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a href={siteConfig.phoneHref} className="btn-emergency">
                    <Phone className="h-4 w-4" /> Call now
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTNERSHIP FORM */}
      <section className="py-24 md:py-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal>
            <div className="grid gap-10 overflow-hidden rounded-[2.5rem] lg:grid-cols-[1fr_1.1fr]" style={{ background: "var(--gradient-hero)" }}>
              <div className="relative flex flex-col p-10 md:p-14">
                <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
                <div className="relative text-center lg:text-left">
                  <span className="chip" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}>
                    Partnership request
                  </span>
                  <h2 className="mt-5 text-balance text-3xl leading-[1.05] md:text-4xl" style={{ color: "white" }}>
                    Ready to become a partner?
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-pretty text-white/70 lg:mx-0">
                    Fill out the form and a member of our team will reach out within one business day to schedule a
                    discovery call.
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
              </div>

              <div className="bg-surface-elevated p-8 md:p-12">
                <PartnershipForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
