import { CircleCheck } from "lucide-react";
import type { BulletItem } from "@/lib/content/services";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function ProcessSteps({ steps }: { steps: BulletItem[] }) {
  return (
    <div className="relative mt-10">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[66px] z-0 hidden h-0.5 bg-primary/40 lg:block" />
      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        {steps.map((s, i) => (
          <RevealItem key={s.title}>
            <div className="surface-card surface-card-hover relative z-10 h-full p-6">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Step {String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-3 flex items-center gap-2 text-lg tracking-tight text-ink">
                <CircleCheck className="h-4 w-4 shrink-0 text-primary" /> {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
