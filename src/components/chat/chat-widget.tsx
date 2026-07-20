"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Phone, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import chatbotAvatar from "../../../public/chatbot/chatbot-avatar.jpg";
import { SparkleField } from "@/components/ui/sparkle-field";

// Flip to true to restore the original avatar photo (chatbotAvatar) in all three spots below.
const SHOW_CHAT_AVATAR_IMAGE = false;

type Message = {
  id: string;
  from: "bot" | "user";
  content: React.ReactNode;
};

type QuickAction = {
  key: string;
  label: string;
  shortLabel: string;
  reply: () => React.ReactNode;
};

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

const GREETING = (
  <>
    Hi, I&apos;m the Gary&apos;s Pipelining assistant. I can point you to the right service, your service area, or a
    fast way to reach a real person. What do you need help with?
  </>
);

const quickActions: QuickAction[] = [
  {
    key: "estimate",
    label: "Get a free estimate",
    shortLabel: "Free estimate",
    reply: () => (
      <>
        Happy to help. The fastest way is our estimate form, typical response within 1 business hour during the
        day.{" "}
        <Link href="/contact" className="font-semibold text-primary link-underline">
          Open the estimate form
        </Link>
        . Or call us directly at{" "}
        <a href={siteConfig.phoneHref} className="font-semibold text-primary link-underline">
          {siteConfig.phone}
        </a>
        .
      </>
    ),
  },
  {
    key: "emergency",
    label: "This is an emergency",
    shortLabel: "Emergency",
    reply: () => (
      <>
        <p>Got it. Call our 24/7 emergency line right now, a live dispatcher answers around the clock.</p>
        <a href={siteConfig.phoneHref} className="btn-emergency mt-3 w-fit text-sm">
          <Phone className="h-3.5 w-3.5" /> {siteConfig.phone}
        </a>
      </>
    ),
  },
  {
    key: "services",
    label: "What services do you offer",
    shortLabel: "Services",
    reply: () => (
      <>
        We handle trenchless sewer repair, pipe bursting, sewer replacement, water main repair, sewer camera
        inspection, drain cleaning, hydro jetting, rooter service, and sump pump installation.{" "}
        <Link href="/services" className="inline-flex items-center gap-1 font-semibold text-primary link-underline">
          See all services <ArrowUpRight className="h-3 w-3" />
        </Link>
      </>
    ),
  },
  {
    key: "areas",
    label: "Do you serve my area",
    shortLabel: "Service areas",
    reply: () => (
      <>
        We&apos;re based in Tukwila and serve Seattle, Tacoma, Bellevue, Renton, Tukwila, and Federal Way, plus much
        of the greater Puget Sound region.{" "}
        <Link href="/service-area" className="inline-flex items-center gap-1 font-semibold text-primary link-underline">
          Check your city <ArrowUpRight className="h-3 w-3" />
        </Link>
      </>
    ),
  },
  {
    key: "pricing",
    label: "How does pricing work",
    shortLabel: "Pricing",
    reply: () => (
      <>
        Every job starts with a camera inspection, then a written, flat-rate estimate before any work begins. The
        number we quote is the number you pay, no surprise change orders.
      </>
    ),
  },
  {
    key: "human",
    label: "Talk to a real person",
    shortLabel: "Talk to a human",
    reply: () => (
      <>
        Of course. Call {siteConfig.phone} or email{" "}
        <a href={siteConfig.emailHref} className="font-semibold text-primary link-underline">
          {siteConfig.email}
        </a>
        , a real person picks up, not a robot.
      </>
    ),
  },
];

const quickActionByKey: Record<string, QuickAction> = Object.fromEntries(quickActions.map((qa) => [qa.key, qa]));

function matchKeywordReply(text: string): React.ReactNode | null {
  const t = text.toLowerCase();
  if (/(emergency|urgent|flood|backup|leak|burst|now)/.test(t)) return quickActionByKey.emergency.reply();
  if (/(price|cost|estimate|quote|how much)/.test(t)) return quickActionByKey.estimate.reply();
  if (/(service|trenchless|drain|sewer|hydro|jet|camera|pipe|rooter|sump)/.test(t)) return quickActionByKey.services.reply();
  if (/(area|location|seattle|tacoma|tukwila|renton|bellevue|federal way|city)/.test(t)) return quickActionByKey.areas.reply();
  if (/(call|phone|email|contact|human|person)/.test(t)) return quickActionByKey.human.reply();
  if (/(hour|open|24|time)/.test(t)) return <>We&apos;re answered 24 hours a day, 7 days a week, including the emergency line.</>;
  if (/(warrant|guarantee)/.test(t))
    return <>Trenchless work carries a written workmanship warranty. Ask your technician for the specifics on your job.</>;
  return null;
}

function BotAvatar() {
  if (SHOW_CHAT_AVATAR_IMAGE) {
    return (
      <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-white">
        <Image src={chatbotAvatar} alt="" width={28} height={28} className="h-full w-full object-cover" />
      </span>
    );
  }
  return (
    <span className="relative grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full" style={{ background: "var(--gradient-hero)" }}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.28), transparent 55%)" }}
      />
      <MessageCircle className="relative h-3.5 w-3.5 text-white" strokeWidth={2.25} />
    </span>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <BotAvatar />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: nextId(), from: "bot", content: GREETING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [unread, setUnread] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("gp_chat_teaser_seen")) return;
    const t = setTimeout(() => {
      setTeaser(true);
      sessionStorage.setItem("gp_chat_teaser_seen", "1");
    }, 4500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        const launcher = (e.target as HTMLElement).closest('[aria-label="Open chat"], [aria-label="Close chat"]');
        if (!launcher) setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  function pushBotReply(content: React.ReactNode) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId(), from: "bot", content }]);
      if (!open) setUnread((u) => u + 1);
    }, 700);
  }

  function handleQuickAction(qa: QuickAction) {
    setMessages((m) => [...m, { id: nextId(), from: "user", content: qa.label }]);
    pushBotReply(qa.reply());
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: nextId(), from: "user", content: text }]);
    setInput("");
    const matched = matchKeywordReply(text);
    pushBotReply(
      matched ?? (
        <>
          I&apos;m a simple assistant, best for pointing you to the right page or number. For anything specific to
          your job, call us at{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-primary link-underline">
            {siteConfig.phone}
          </a>{" "}
          or tap a quick action below.
        </>
      )
    );
  }

  return (
    <div className="fixed bottom-[104px] right-4 z-50 lg:bottom-6 lg:right-6">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 flex h-[min(600px,75vh)] w-[92vw] max-w-[400px] flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface-elevated shadow-[var(--shadow-premium)]"
            role="dialog"
            aria-label="Chat with Gary's Pipelining"
          >
            {/* Header */}
            <div className="relative shrink-0 overflow-hidden p-5" style={{ background: "var(--gradient-hero)" }}>
              <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
              <SparkleField variant="compact" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white/20 bg-white shadow-[inset_0_0_0_1px_rgba(0,27,130,0.06)]">
                    {SHOW_CHAT_AVATAR_IMAGE ? (
                      <Image src={chatbotAvatar} alt="" width={44} height={44} className="h-full w-full object-cover" />
                    ) : (
                      <MessageCircle className="h-5 w-5 text-primary" strokeWidth={2.25} />
                    )}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">Gary&apos;s Pipelining</div>
                    <div className="flex items-center gap-1.5 text-xs text-white/70">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      Usually replies in minutes
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close chat"
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="relative mt-4 flex flex-wrap gap-2">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
                >
                  <Phone className="h-3 w-3" /> Call
                </a>
                <a
                  href={siteConfig.emailHref}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
                >
                  <Mail className="h-3 w-3" /> Email
                </a>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.from === "bot" && <BotAvatar />}
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border border-border bg-surface text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {typing && <TypingIndicator />}
            </div>

            {/* Quick actions bar */}
            <div className="shrink-0 border-t border-border bg-surface/60 px-3 py-2.5">
              <div className="grid grid-cols-3 gap-1.5">
                {quickActions.map((qa) => (
                  <button
                    key={qa.key}
                    type="button"
                    onClick={() => handleQuickAction(qa)}
                    className="rounded-xl border border-border-strong bg-surface-elevated px-2 py-2 text-center text-xs font-medium leading-tight text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {qa.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex shrink-0 items-center gap-2 border-t border-border p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question..."
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="shrink-0 px-4 pb-3 text-center text-[11px] text-muted-foreground">
              Automated assistant. For anything urgent, call {siteConfig.phone}.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teaser bubble + launcher, side by side, bottom-aligned */}
      <div className="flex items-center justify-end gap-3">
        <AnimatePresence>
          {teaser && !open && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="flex max-w-[230px] items-start gap-2 rounded-2xl rounded-br-md border border-border bg-surface-elevated p-3.5 pr-2.5 shadow-[var(--shadow-elevated)]"
            >
              <p className="flex-1 text-sm leading-snug text-foreground">
                Got a sewer or drain question? I can help, or connect you to a real person.
              </p>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => setTeaser(false)}
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Launcher (hidden while the panel is open, the panel has its own close button) */}
        <AnimatePresence>
          {!open && (
            <motion.button
              type="button"
              onClick={() => {
                setOpen(true);
                setTeaser(false);
                setUnread(0);
              }}
              aria-label="Open chat"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="group relative grid h-14 w-14 shrink-0 place-items-center rounded-full text-white shadow-[0_0_0_2.7px_var(--color-yellow),0_0_0_5.4px_var(--color-primary),var(--shadow-premium)] lg:h-[84px] lg:w-[84px]"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span
                  aria-hidden
                  className="absolute inset-0 z-10 rounded-full"
                  style={{
                    boxShadow: "0 0 0 0 color-mix(in oklab, var(--color-primary) 55%, transparent)",
                    animation: "pulse-ring 2.6s ease-out infinite",
                    border: "2px solid color-mix(in oklab, var(--color-primary) 45%, transparent)",
                  }}
                />
                {SHOW_CHAT_AVATAR_IMAGE ? (
                  <Image
                    src={chatbotAvatar}
                    alt="Chat with Gary's Pipelining"
                    fill
                    sizes="(min-width: 1024px) 84px, 56px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 grid place-items-center transition-transform duration-300 group-hover:scale-105"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.28), transparent 55%)" }}
                    />
                    <MessageCircle
                      className="relative h-6 w-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] lg:h-8 lg:w-8"
                      strokeWidth={2.25}
                    />
                  </span>
                )}
              </span>
              {unread > 0 ? (
                <span className="absolute -right-1 -top-1 z-20 grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-emergency text-[9px] font-bold text-white lg:-right-1.5 lg:-top-1.5 lg:h-6 lg:w-6 lg:text-[11px]">
                  {unread}
                </span>
              ) : (
                <span className="absolute -right-0.5 -top-0.5 z-20 h-3 w-3 rounded-full border-2 border-background bg-yellow lg:-right-1 lg:-top-1 lg:h-[18px] lg:w-[18px]" />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
