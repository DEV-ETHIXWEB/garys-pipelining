"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export type ProcessStep = { icon: string | ReactNode; title: string; body: string };

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const n = steps.length;

  return (
    <div className="relative mt-20">
      <div aria-hidden className="absolute left-0 right-0 top-[33.1px] hidden md:block">
        <div className="absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-border-strong to-transparent" />
        {steps.slice(0, -1).map((_, k) => (
          <div
            key={k}
            className="absolute top-0 h-0.5 origin-left bg-primary transition-transform duration-500 ease-out"
            style={{
              left: `${((k + 0.5) / n) * 100}%`,
              width: `${(1 / n) * 100}%`,
              transform: hovered !== null && k < hovered ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: hovered !== null && k < hovered ? `${k * 60}ms` : "0ms",
            }}
          />
        ))}
      </div>

      <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-5 md:gap-10" stagger={0.1}>
        {steps.map((s, i) => (
          <RevealItem key={s.title} className={`group${i === n - 1 ? " col-span-2 md:col-span-1" : ""}`}>
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            >
              <div
                className="relative z-10 mx-auto grid h-[67.2px] w-[67.2px] place-items-center rounded-2xl bg-surface-elevated shadow-[var(--shadow-soft)] transition-all duration-300 group-hover:border-primary group-hover:shadow-[var(--shadow-elevated)]"
                style={{ border: "1px solid var(--color-border)" }}
              >
                {typeof s.icon === "string" ? (
                  <Image
                    src={s.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  s.icon
                )}
              </div>
              <div className="mt-5 text-center">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 text-xl tracking-tight text-ink transition-colors duration-300 group-hover:text-primary">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[200px] text-sm text-muted-foreground">{s.body}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
