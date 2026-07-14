"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ArrowUpRight, Menu, X, ChevronDown, Sparkle } from "lucide-react";
import { Logo } from "./logo";
import { services } from "@/lib/content/services";
import { locations } from "@/lib/content/locations";
import { siteConfig } from "@/lib/site-config";

const EASE = [0.22, 1, 0.36, 1] as const;
const PILL_TRANSITION = { type: "spring", stiffness: 500, damping: 40, mass: 0.5 } as const;
const NAV_GLOW_HOVER =
  "0 0 0 1px color-mix(in oklab, var(--color-yellow) 55%, transparent), 0 0 20px -2px color-mix(in oklab, var(--color-yellow) 75%, transparent)";
const PHONE_GLOW =
  "0 0 0 1px color-mix(in oklab, var(--color-primary) 45%, transparent), 0 10px 28px -8px color-mix(in oklab, var(--color-primary) 70%, white 10%)";

const navGroups = [
  {
    label: "Services",
    href: "/services",
    items: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  {
    label: "Service Areas",
    href: "/service-area",
    items: locations.map((l) => ({ label: `${l.city}, WA`, href: `/service-area/${l.slug}` })),
  },
];

const headerCornerStars = [
  { top: "22%", left: "0.8%", size: 10, delay: 0.2 },
  { top: "68%", left: "2.6%", size: 7, delay: 1.3 },
  { top: "45%", left: "4.8%", size: 9, delay: 0.7 },
  { top: "18%", left: "94.5%", size: 9, delay: 0.5 },
  { top: "70%", left: "96.8%", size: 11, delay: 1.6 },
  { top: "44%", left: "99%", size: 7, delay: 2 },
];

const homeLink = { label: "Home", href: "/" };

const simpleLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isHrefActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavDropdown({
  label,
  href,
  items,
  pathname,
  highlighted,
  glow,
  onHover,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
  pathname: string;
  highlighted: boolean;
  glow: string;
  onHover: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={onHover}>
      {highlighted && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-white/10"
          style={{ boxShadow: glow }}
          transition={PILL_TRANSITION}
        />
      )}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="relative z-10 inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-lg font-semibold text-white/75 transition-colors duration-300 hover:text-white"
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute left-1/2 top-full z-50 mt-2 w-72 origin-top -translate-x-1/2 rounded-2xl border border-border bg-surface-elevated p-2 shadow-[var(--shadow-elevated)]"
          >
            <Link
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary"
            >
              View all {label.toLowerCase()}
            </Link>
            <div className="mt-1 grid max-h-80 gap-0.5 overflow-y-auto">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                    isHrefActive(pathname, item.href)
                      ? "bg-secondary text-foreground"
                      : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const currentHref = hoveredHref;
  const pillGlow = NAV_GLOW_HOVER;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setShowBadge(scrollPercent < 5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "pb-3" : "pb-4"}`}>
      <div className="container-px relative mx-auto max-w-[1400px]">
        <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 pt-3.5 pb-[4px] transition-all duration-500">
          <div
            aria-hidden
            className={`header-glow-fx absolute inset-y-0 left-1/2 right-1/2 w-screen -mx-[50vw] transition-shadow duration-500 ${
              scrolled ? "shadow-[var(--shadow-elevated)]" : "shadow-[var(--shadow-soft)]"
            }`}
            style={{ background: "var(--gradient-hero)", borderBottom: "1px solid color-mix(in oklab, white 10%, transparent)" }}
          />
          <div aria-hidden className="absolute inset-y-0 left-1/2 right-1/2 hidden w-screen -mx-[50vw] overflow-hidden lg:block">
            {headerCornerStars.map((s, i) => (
              <Sparkle
                key={`corner-star-${i}`}
                className="star-neon absolute text-yellow"
                style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
              />
            ))}
          </div>

          <div onDoubleClick={() => router.push("/")} className="relative z-10 col-start-1 flex translate-x-[24px] scale-[2.389] lg:translate-x-[34px] lg:translate-y-[5px]">
            <Logo size="header" />
          </div>

          <nav
            aria-label="Primary"
            onMouseLeave={() => setHoveredHref(null)}
            className="relative z-10 col-start-2 hidden items-center justify-center gap-1 lg:flex"
          >
            <div className="relative" onMouseEnter={() => setHoveredHref(homeLink.href)}>
              {currentHref === homeLink.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  style={{ boxShadow: pillGlow }}
                  transition={PILL_TRANSITION}
                />
              )}
              <Link
                href={homeLink.href}
                className={`relative z-10 inline-flex rounded-full px-3.5 py-2 text-lg font-semibold transition-colors duration-300 ${
                  isHrefActive(pathname, homeLink.href) ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {homeLink.label}
              </Link>
            </div>
            {navGroups.map((g) => (
              <NavDropdown
                key={g.href}
                {...g}
                pathname={pathname}
                highlighted={currentHref === g.href}
                glow={pillGlow}
                onHover={() => setHoveredHref(g.href)}
              />
            ))}
            {simpleLinks.map((n) => (
              <div key={n.href} className="relative" onMouseEnter={() => setHoveredHref(n.href)}>
                {currentHref === n.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    style={{ boxShadow: pillGlow }}
                    transition={PILL_TRANSITION}
                  />
                )}
                <Link
                  href={n.href}
                  className={`relative z-10 inline-flex rounded-full px-3.5 py-2 text-lg font-semibold transition-colors duration-300 ${
                    isHrefActive(pathname, n.href) ? "text-white" : "text-white/75 hover:text-white"
                  }`}
                >
                  {n.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="relative z-10 col-start-3 flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-lg border border-white/20 px-3.5 py-2 text-sm font-medium text-white/85 transition-colors duration-300 hover:border-white/35 hover:text-white sm:inline-flex"
            >
              Free estimate
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <motion.a
              href={siteConfig.phoneHref}
              whileHover={{ scale: 1.02, boxShadow: PHONE_GLOW }}
              transition={{ duration: 0.3, ease: EASE }}
              className="hidden items-center gap-2 rounded-lg bg-yellow px-3.5 py-2 text-sm font-semibold text-yellow-foreground transition-colors duration-300 sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              <span>{siteConfig.phone}</span>
            </motion.a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="-translate-y-1 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-white/15 sm:translate-y-0 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Link
          href="/contractor-partnership"
          className={`absolute right-[170px] top-full z-10 mt-[-12px] hidden whitespace-nowrap rounded-full border border-border bg-surface px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow-[var(--shadow-soft)] transition-all duration-300 hover:border-primary hover:bg-primary-soft sm:block ${
            showBadge ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          Contractor partnership welcome
        </Link>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="mt-2 max-h-[80vh] overflow-y-auto rounded-2xl bg-surface-elevated p-3 shadow-[var(--shadow-elevated)] lg:hidden"
            >
              <nav className="flex flex-col">
                {[homeLink, { label: "Services", href: "/services" }, { label: "Service Areas", href: "/service-area" }, ...simpleLinks].map(
                  (n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isHrefActive(pathname, n.href) ? "bg-secondary text-foreground" : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {n.label}
                    </Link>
                  )
                )}
              </nav>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href={siteConfig.phoneHref} className="btn-ghost justify-center">
                  <Phone className="h-4 w-4" /> Call
                </a>
                <Link href="/contact" className="btn-primary justify-center">
                  Estimate <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
