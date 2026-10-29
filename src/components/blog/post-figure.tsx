"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";
import { useA11ySettings } from "@/components/accessibility/accessibility-store";
import { useHasMounted } from "@/lib/use-has-mounted";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PostFigure({
  src,
  alt,
  caption,
  index,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  index?: number;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const mounted = useHasMounted();
  const settings = useA11ySettings();
  const reduceMotion = settings.reduceMotion || settings.pauseAnimations;

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <motion.figure
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge illustration: ${alt}`}
          className="group relative block w-full overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-premium)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={900}
            priority={priority}
            quality={90}
            sizes="(min-width: 1400px) 860px, (min-width: 1024px) 62vw, 100vw"
            className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
          />
          <span
            aria-hidden
            className="absolute right-4 top-4 grid h-10 w-10 translate-y-1 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-[var(--shadow-soft)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Expand className="h-4 w-4" />
          </span>
        </button>
        {caption && (
          <figcaption className="mt-4 flex gap-3 text-sm leading-relaxed text-muted-foreground">
            {index !== undefined && (
              <span className="shrink-0 font-semibold tabular-nums text-primary">Fig. {String(index).padStart(2, "0")}</span>
            )}
            <span>{caption}</span>
          </figcaption>
        )}
      </motion.figure>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Illustration viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              >
                <button
                  type="button"
                  aria-label="Close illustration viewer"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
                <motion.div
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                  className="w-full max-w-[1400px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image src={src} alt={alt} width={1600} height={900} quality={95} sizes="100vw" className="h-auto w-full rounded-2xl" />
                  {caption && <p className="mt-4 text-center text-sm text-white/70">{caption}</p>}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
