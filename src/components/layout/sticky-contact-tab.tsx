"use client";

import { Accessibility, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { toggleA11yPanel, useA11yPanelOpen } from "@/components/accessibility/accessibility-store";
import { SparkleField } from "@/components/ui/sparkle-field";

export function StickyContactTab() {
  const panelOpen = useA11yPanelOpen();

  return (
    <div className="fixed right-0 top-64 z-40 hidden flex-col gap-2 lg:flex">
      <button
        type="button"
        data-a11y-trigger
        aria-haspopup="dialog"
        aria-expanded={panelOpen}
        aria-controls="a11y-panel"
        aria-label={panelOpen ? "Close accessibility menu" : "Open accessibility menu (Alt+A)"}
        onClick={() => toggleA11yPanel()}
        className="group relative flex flex-col items-center gap-1.5 overflow-hidden rounded-l-2xl bg-primary px-3 py-3.5 text-white shadow-[var(--shadow-elevated)] transition-transform duration-300 hover:-translate-x-1"
      >
        <SparkleField variant="compact" />
        <Accessibility className="relative h-4 w-4" />
        <span className="relative w-10 break-words text-center text-[11px] font-bold uppercase leading-tight tracking-wider">
          Accessibility
        </span>
      </button>
      <a
        href={siteConfig.phoneHref}
        className="group flex flex-col items-center gap-1.5 rounded-l-2xl bg-emergency px-3 py-4 text-emergency-foreground shadow-[var(--shadow-elevated)] transition-transform duration-300 hover:-translate-x-1"
      >
        <Phone className="h-4 w-4" />
        <span className="text-center text-[11px] font-bold uppercase leading-tight tracking-wider">
          24/7
          <br />
          Emergency
        </span>
      </a>
    </div>
  );
}
