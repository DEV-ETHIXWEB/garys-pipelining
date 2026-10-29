import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { readingMinutes, type Post } from "@/lib/content/posts";
import { Reveal } from "@/components/ui/reveal";

// "From the blog" band for service and location pages: internal links from the
// pages that rank for a topic to the guides that explain it.
export function RelatedPosts({ posts, title = "Worth reading first" }: { posts: Post[]; title?: string }) {
  if (posts.length === 0) return null;
  return (
    <section className="py-16 md:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex items-end justify-between gap-8">
            <div>
              <span className="chip">From the blog</span>
              <h2 className="mt-5 text-balance text-4xl leading-[1.05] md:text-5xl">{title}</h2>
            </div>
            <Link href="/blog" className="hidden items-center gap-1.5 text-sm font-medium text-primary link-underline sm:inline-flex">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5">
          {posts.map((post) => (
            <Reveal key={post.slug} y={24}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid overflow-hidden rounded-[1.75rem] border border-border bg-surface-elevated shadow-[var(--shadow-soft)] transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-premium)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              >
                <div className="overflow-hidden">
                  <Image
                    src={post.cover.src}
                    alt={post.cover.alt}
                    width={1600}
                    height={900}
                    quality={85}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-9">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{post.category}</span>
                  <h3 className="mt-3 text-balance text-2xl leading-tight xl:text-[1.75rem]">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 text-pretty text-[0.975rem] leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-6 flex items-center gap-5 text-sm">
                    <span className="inline-flex items-center gap-2 font-semibold text-primary">
                      Read more
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" /> {readingMinutes(post)} min read
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
