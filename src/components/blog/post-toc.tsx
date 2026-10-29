"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function PostToc({ headings }: { headings: { id: string; text: string }[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el);
    // The active heading is the last one scrolled past the upper third of the viewport.
    function update() {
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActiveId(current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headings]);

  return (
    <nav aria-label="On this page">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">On this page</div>
      <ol className="relative mt-5 space-y-1 border-l border-border">
        {headings.map((h, i) => {
          const active = h.id === activeId;
          return (
            <li key={h.id} className="relative">
              {active && (
                <motion.span
                  layoutId="toc-active"
                  aria-hidden
                  className="absolute -left-px top-0 h-full w-[2px] rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <a
                href={`#${h.id}`}
                aria-current={active ? "location" : undefined}
                className={`flex gap-3 py-2 pl-4 pr-2 text-[0.95rem] leading-snug transition-colors duration-300 ${
                  active ? "font-semibold text-ink" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`tabular-nums text-xs leading-[1.35rem] ${active ? "text-primary" : "text-muted-foreground"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{h.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
