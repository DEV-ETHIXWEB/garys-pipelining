import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, ChevronRight, Clock, Phone, Sparkle } from "lucide-react";
import { posts, getPostBySlug, postHeadings, readingMinutes, formatPostDate, type PostBlock } from "@/lib/content/posts";
import { getServiceBySlug } from "@/lib/content/services";
import { siteConfig } from "@/lib/site-config";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getLocationBySlug } from "@/lib/content/locations";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { RichText } from "@/components/blog/rich-text";
import { PostFigure } from "@/components/blog/post-figure";
import { PostToc } from "@/components/blog/post-toc";
import { ReadingProgress } from "@/components/blog/reading-progress";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    absoluteTitle: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    keywords: post.keywords,
    image: { url: post.shareImage, width: 1200, height: 675, alt: post.cover.alt },
  });
}

function Block({ block, headingIndex, figureIndex }: { block: PostBlock; headingIndex: number; figureIndex: number }) {
  switch (block.type) {
    case "h2":
      return (
        <Reveal y={18} className="mt-16 first:mt-0 md:mt-20">
          <h2 id={block.id} className="scroll-mt-36 text-balance text-[1.875rem] leading-[1.12] md:text-[2.375rem]">
            <span className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {String(headingIndex).padStart(2, "0")}
              <span aria-hidden className="h-px w-8 bg-primary/40" />
            </span>
            {block.text}
          </h2>
        </Reveal>
      );
    case "figure":
      return (
        <div className="my-12 md:my-14">
          <PostFigure src={block.src} alt={block.alt} caption={block.caption} index={figureIndex} />
        </div>
      );
    case "callout":
      return (
        <Reveal y={18} className="mt-8">
          <aside
            className="relative overflow-hidden rounded-[1.75rem] p-7 text-white md:p-9"
            style={{ background: "var(--gradient-hero)", border: "1px solid color-mix(in oklab, white 10%, transparent)" }}
          >
            <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
            <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-yellow">
                  <Sparkle className="h-3 w-3 fill-yellow" /> {block.title}
                </div>
                <p className="mt-3 text-pretty text-[1.0625rem] leading-[1.75] text-white/80">{block.text}</p>
              </div>
              {block.phone && (
                <a
                  href={block.phone.href}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-5 py-3.5 font-semibold text-primary-deep shadow-[var(--shadow-elevated)] transition-transform duration-200 hover:-translate-y-px active:scale-[0.97]"
                >
                  <Phone className="h-4 w-4" /> SPU {block.phone.label}
                </a>
              )}
            </div>
          </aside>
        </Reveal>
      );
    default:
      return (
        <Reveal y={14} className="mt-6">
          <p className="text-pretty text-[1.0625rem] leading-[1.8] text-foreground/85 md:text-lg xl:text-[1.1875rem]">
            <RichText text={block.text} />
          </p>
        </Reveal>
      );
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = [...postHeadings(post), ...(post.faqs.length > 0 ? [{ id: "faq", text: "Common questions" }] : [])];
  const minutes = readingMinutes(post);
  const date = formatPostDate(post.publishedAt);
  const related = post.relatedServices.flatMap((s) => getServiceBySlug(s) ?? []);
  const relatedAreas = post.relatedLocations.flatMap((l) => getLocationBySlug(l) ?? []);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  let headingIndex = 0;
  let figureIndex = 0;
  const blocks = post.body.map((block, i) => {
    if (block.type === "h2") headingIndex++;
    if (block.type === "figure") figureIndex++;
    return <Block key={i} block={block} headingIndex={headingIndex} figureIndex={figureIndex + 1} />;
  });

  return (
    <div className="bg-background">
      <ReadingProgress />
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd data={faqSchema(post.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: post.title, url },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-32 md:pb-16 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div className="container-px mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="shrink-0 hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link href="/blog" className="shrink-0 hover:text-foreground">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate text-foreground">{post.title}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-16 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-20">
            <Reveal>
              <span className="chip">{post.category}</span>
              <h1 className="mt-6 text-balance text-[2.5rem] leading-[1.04] tracking-tight md:text-6xl xl:text-[4.25rem]">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <time dateTime={post.publishedAt}>{date}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" /> {minutes} min read
                </span>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 md:mt-14">
            <PostFigure src={post.cover.src} alt={post.cover.alt} priority />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-8 pt-6 md:pt-10">
        <div className="container-px mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-20">
          <article className="min-w-0">
            <Reveal>
              <div className="skeu-card rounded-[1.75rem] p-7 md:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Sparkle className="h-3 w-3 fill-yellow text-yellow-deep" /> The short version
                </div>
                <ul className="mt-5 grid gap-4 md:grid-cols-3 md:gap-6">
                  {post.takeaways.map((t, i) => (
                    <li key={t} className="flex gap-3 text-[0.975rem] leading-relaxed text-foreground/85">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <details className="group mt-8 rounded-2xl border border-border bg-surface-elevated lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-ink">
                On this page
                <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <ol className="border-t border-border px-5 py-3">
                {headings.map((h, i) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="flex gap-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                      <span className="tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <div className="mt-10 md:mt-12">{blocks}</div>

            {post.faqs.length > 0 && (
              <section aria-labelledby="faq" className="mt-16 md:mt-20">
                <Reveal y={18}>
                  <h2 id="faq" className="scroll-mt-36 text-balance text-[1.875rem] leading-[1.12] md:text-[2.375rem]">
                    <span className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      FAQ
                      <span aria-hidden className="h-px w-8 bg-primary/40" />
                    </span>
                    Side sewer questions we hear most
                  </h2>
                </Reveal>
                <Reveal className="mt-4">
                  <FaqAccordion items={post.faqs} />
                </Reveal>
              </section>
            )}

            {relatedAreas.length > 0 && (
              <Reveal className="mt-14">
                <div className="rounded-[1.75rem] border border-border bg-surface p-6 md:p-7">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Where we work</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {relatedAreas.map((l) => (
                      <Link
                        key={l.slug}
                        href={`/service-area/${l.slug}`}
                        className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                      >
                        Sewer repair in {l.city}, WA
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal className="mt-16">
              <div className="flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-deep">
                  <ArrowLeft className="h-4 w-4" /> All articles
                </Link>
                <p className="text-sm text-muted-foreground">
                  Written by the {siteConfig.shortName} crew, {siteConfig.address.city}, WA
                </p>
              </div>
            </Reveal>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-36 space-y-8">
              <PostToc headings={headings} />

              <div
                className="relative overflow-hidden rounded-[1.75rem] p-7 text-white"
                style={{ background: "var(--gradient-hero)", border: "1px solid color-mix(in oklab, white 10%, transparent)" }}
              >
                <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
                <div className="relative">
                  <div className="h-px w-10 bg-yellow" />
                  <p className="mt-4 text-balance font-display text-xl font-semibold leading-snug" style={{ color: "white" }}>
                    See inside your side sewer before anyone quotes a repair.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    HD camera inspection first, so you see the same footage we do.
                  </p>
                  <div className="mt-6 grid gap-2.5">
                    <Link
                      href="/contact?service=Sewer%20Inspection"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow px-4 py-3 text-sm font-semibold text-yellow-foreground transition-transform duration-200 hover:-translate-y-px"
                    >
                      Free estimate <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={siteConfig.phoneHref}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <Phone className="h-4 w-4" /> {siteConfig.phone}
                    </a>
                  </div>
                </div>
              </div>

              {related.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Related services</div>
                  <ul className="mt-4 space-y-1">
                    {related.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-[0.95rem] text-foreground/80 transition-colors hover:bg-secondary hover:text-ink"
                        >
                          {s.name}
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        eyebrow="Side sewer trouble?"
        title="Start with the camera, not a guess."
        subtitle="Free estimates across Seattle, Renton, Bellevue, Tacoma and Federal Way. Call any time if a line is backing up now."
        serviceQuery="Sewer Inspection"
      />
    </div>
  );
}
