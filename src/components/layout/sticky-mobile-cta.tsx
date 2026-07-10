import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 lg:hidden">
      <div className="glass grid grid-cols-2 gap-2 rounded-2xl p-2 shadow-[var(--shadow-elevated)]">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-medium text-white transition-transform active:scale-95"
          style={{ background: "#183CC7" }}
        >
          <Phone className="h-4 w-4" /> Call now
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold transition-transform active:scale-95"
          style={{ background: "var(--color-yellow)", color: "var(--color-yellow-foreground)" }}
        >
          Free estimate
        </Link>
      </div>
    </div>
  );
}
