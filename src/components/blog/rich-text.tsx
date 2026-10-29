import Link from "next/link";

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
const LINK_CLASS =
  "font-medium text-primary underline decoration-primary/30 decoration-[1.5px] underline-offset-[5px] transition-colors hover:decoration-primary";

// Renders the **bold** / [label](href) subset used by post content.
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={LINK_CLASS}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              {label}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}
