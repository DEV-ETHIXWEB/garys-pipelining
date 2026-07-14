"use client";

import Link from "next/link";
import { Accessibility, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { toggleA11yPanel, useA11yPanelOpen } from "@/components/accessibility/accessibility-store";

export function StickyMobileCta() {
  const panelOpen = useA11yPanelOpen();

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 lg:hidden">
      <div className="glass grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 rounded-2xl p-2 shadow-[var(--shadow-elevated)]">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm font-medium text-white transition-transform active:scale-95"
          style={{ background: "#183CC7" }}
        >
          <Phone className="h-4 w-4" /> Call now
        </a>
        <button
          type="button"
          data-a11y-trigger
          aria-haspopup="dialog"
          aria-expanded={panelOpen}
          aria-controls="a11y-panel"
          aria-label={panelOpen ? "Close accessibility menu" : "Open accessibility menu (Alt+A)"}
          onClick={() => toggleA11yPanel()}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-3.5 text-primary-foreground transition-transform active:scale-95"
        >
          <Accessibility className="h-5 w-5" />
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm font-semibold transition-transform active:scale-95"
          style={{ background: "var(--color-yellow)", color: "var(--color-yellow-foreground)" }}
        >
          Free estimate
        </Link>
      </div>
    </div>
  );
}
