import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronRight, Clock } from "lucide-react";
import { posts, readingMinutes, formatPostDate, type Post } from "@/lib/content/posts";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CtaBand } from "@/components/sections/cta-band";

const description = `Seattle sewer and drain guides: side sewer ownership, sewer line repair costs, camera inspections and trenchless options, from the ${siteConfig.shortName} crew.`;

export const metadata: Metadata = pageMetadata({
  title: "Sewer & Drain Blog: Seattle Homeowner Guides",
  description,
  path: "/blog",
});

function PostMeta({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-4 w-4 text-primary" />
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4 text-primary" /> {readingMinutes(post)} min read
      </span>
    </div>
  );
}

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const [featured, ...rest] = sorted;

  return (
    <div className="bg-background">
      <JsonLd data={blogSchema(sorted)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
        ])}
      />
      <section className="relative overflow-hidden pb-8 pt-28 md:pb-10 md:pt-36">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div className="container-px mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Blog</span>
          </nav>
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end lg:gap-16">
            <Reveal>
              <span className="chip">The blog</span>
              <h1 className="mt-5 text-balance text-[2.5rem] leading-[1.04] tracking-tight md:text-5xl xl:text-6xl">
                Notes from <span className="text-primary">underground.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-pretty leading-relaxed text-muted-foreground md:text-lg">
                What is actually going on under your yard, who is responsible for it, and how to fix it without
                tearing up the garden. Written by the crew that does the work.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {featured && (
        <section className="pb-8">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal y={32}>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-[var(--shadow-elevated)] transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-premium)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
              >
                {/* The cover is never cropped: if the text column runs taller than the
                    image, the cell's gradient matches the illustration's own edges. */}
                <div
                  className="relative flex items-center overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(90deg, #0b1c3f, #0c2155 50%, #0b1e51) top / 100% 50% no-repeat, linear-gradient(90deg, #141f2d, #121e2a) bottom / 100% 50% no-repeat",
                  }}
                >
                  <Image
                    src={featured.cover.src}
                    alt={featured.cover.alt}
                    width={1600}
                    height={900}
                    priority
                    quality={90}
                    sizes="(min-width: 1400px) 700px, (min-width: 1024px) 56vw, 100vw"
                    className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-9 xl:p-11">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-yellow-foreground">
                      Latest
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{featured.category}</span>
                  </div>
                  <h2 className="mt-4 text-balance text-2xl leading-[1.15] xl:text-[1.875rem]">{featured.title}</h2>
                  <p className="mt-4 line-clamp-3 text-pretty text-[0.975rem] leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                  <PostMeta post={featured} className="mt-5" />
                  <span className="btn-primary mt-7 self-start !px-5 !py-3">
                    Read more
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="pt-8">
          <div className="container-px mx-auto max-w-[1400px]">
            <RevealGroup className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((post) => (
                <RevealItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface-elevated shadow-[var(--shadow-soft)] transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-premium)]"
                  >
                    <div className="overflow-hidden">
                      <Image
                        src={post.cover.src}
                        alt={post.cover.alt}
                        width={1600}
                        height={900}
                        quality={85}
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{post.category}</span>
                      <h2 className="mt-3 text-balance text-2xl leading-tight">{post.title}</h2>
                      <p className="mt-3 line-clamp-3 text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">{post.excerpt}</p>
                      <PostMeta post={post} className="mt-auto pt-6" />
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaBand
        title="Got a line that will not clear?"
        subtitle="Every job starts with an HD camera inspection, so you see the footage before anyone talks about a repair."
      />
    </div>
  );
}
