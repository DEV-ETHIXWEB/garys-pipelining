"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Phone, Mail, MessageCircle, Sparkles, CircleCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import chatbotAvatar from "../../../public/chatbot/chatbot-avatar.jpg";
import { SparkleField } from "@/components/ui/sparkle-field";
import {
  detectContactInfo,
  getSmartReply,
  initialChatContext,
  isValidEmail,
  isValidName,
  isValidPhone,
  type ChatContext,
} from "@/lib/chat/engine";
import { topicLabel } from "@/lib/chat/knowledge";
import { submitLead, type TranscriptMessage } from "@/lib/send-lead";
import { PoweredBy } from "@/components/layout/powered-by";

// Flip to true to restore the original avatar photo (chatbotAvatar) in all three spots below.
const SHOW_CHAT_AVATAR_IMAGE = false;

type Message = {
  id: string;
  from: "bot" | "user";
  content: React.ReactNode;
};

type QuickAction = { key: string; label: string; shortLabel: string; triggerText: string };

type LeadStep = "idle" | "offer" | "name" | "phone" | "email" | "confirm" | "submitting" | "done" | "error";
type LeadState = { step: LeadStep; name?: string; phone?: string; email?: string };

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

const GREETING = (
  <>
    Hi, I&apos;m the Gary&apos;s Pipelining assistant. Ask me about a service, your area, pricing, or just tell me
    what&apos;s going on, I&apos;ll get you the right answer or a real person.
  </>
);

const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  { key: "estimate", label: "Get a free estimate", shortLabel: "Free estimate", triggerText: "I'd like a free estimate" },
  { key: "emergency", label: "This is an emergency", shortLabel: "Emergency", triggerText: "This is an emergency" },
  { key: "services", label: "What services do you offer", shortLabel: "Services", triggerText: "What services do you offer?" },
  { key: "areas", label: "Do you serve my area", shortLabel: "Service areas", triggerText: "Do you serve my area?" },
  { key: "pricing", label: "How does pricing work", shortLabel: "Pricing", triggerText: "How does pricing work?" },
  { key: "human", label: "Talk to a real person", shortLabel: "Talk to a human", triggerText: "I want to talk to a real person" },
];

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

function ActionButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl border border-border-strong bg-surface-elevated px-2 py-2 text-center text-xs font-medium leading-tight text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: nextId(), from: "bot", content: GREETING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [unread, setUnread] = useState(0);
  const [ctx, setCtx] = useState<ChatContext>(initialChatContext);
  const [lead, setLead] = useState<LeadState>({ step: "idle" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<TranscriptMessage[]>([{ from: "bot", text: "Greeted the visitor" }]);
  const leadRef = useRef<LeadState>(lead);

  useEffect(() => {
    leadRef.current = lead;
  }, [lead]);

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

  function pushUserMessage(text: string) {
    setMessages((m) => [...m, { id: nextId(), from: "user", content: text }]);
    transcriptRef.current.push({ from: "user", text });
  }

  function pushBotReply(content: React.ReactNode, logLabel: string, onDone?: () => void) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId(), from: "bot", content }]);
      transcriptRef.current.push({ from: "bot", text: logLabel });
      if (!open) setUnread((u) => u + 1);
      onDone?.();
    }, 700);
  }

  function offerLeadCapture() {
    setCtx((c) => ({ ...c, leadOffered: true }));
    setLead({ step: "offer" });
    pushBotReply(
      <>Want me to have a technician follow up? I just need a name and phone number, no obligation.</>,
      "Offered to collect contact info"
    );
  }

  function startLeadCapture(prefill: { phone?: string; email?: string }, autoDetected: boolean) {
    setCtx((c) => ({ ...c, leadOffered: true }));
    setLead({ step: "name", phone: prefill.phone, email: prefill.email });
    pushBotReply(
      autoDetected ? <>Thanks, I&apos;ve got that. What name should I put with it?</> : <>Great, what&apos;s your name?</>,
      "Detected contact info and started lead capture"
    );
  }

  function confirmReply(l: LeadState): React.ReactNode {
    return (
      <>
        <p>Here&apos;s what I&apos;ve got:</p>
        <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
          <li>Name: {l.name}</li>
          <li>Phone: {l.phone}</li>
          {l.email && <li>Email: {l.email}</li>}
        </ul>
        <p className="mt-2">Want me to send this to the team?</p>
      </>
    );
  }

  async function submitLeadFromChat() {
    const l = leadRef.current;
    setLead((prev) => ({ ...prev, step: "submitting" }));
    pushBotReply(<>Sending this over now…</>, "Submitting lead");
    try {
      await submitLead({
        source: "chatbot",
        name: l.name ?? "",
        phone: l.phone,
        email: l.email,
        urgent: ctx.urgent,
        fields: [{ label: "Topics discussed", value: ctx.topicsDiscussed.map(topicLabel).join(", ") || "General chat" }],
        transcript: transcriptRef.current,
      });
      setLead({ step: "done" });
      setCtx((c) => ({ ...c, leadSubmitted: true }));
      pushBotReply(
        <>
          <p className="flex items-center gap-1.5 font-semibold text-primary">
            <CircleCheck className="h-4 w-4" /> Sent! A real person will reach out shortly.
          </p>
          <p className="mt-1 text-muted-foreground">Anything else I can help with while you wait?</p>
        </>,
        "Lead submitted successfully"
      );
    } catch {
      setLead((prev) => ({ ...prev, step: "error" }));
      pushBotReply(
        <>
          I couldn&apos;t send that automatically. Please call us at{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-primary link-underline">
            {siteConfig.phone}
          </a>{" "}
          instead, we&apos;d rather hear from you than lose the message.
        </>,
        "Lead submission failed"
      );
    }
  }

  function handleLeadStep(text: string) {
    const t = text.trim();
    const step = leadRef.current.step;

    if (step === "offer") {
      if (/^(yes|yep|yeah|sure|let'?s do it|ok|okay|sounds good)/i.test(t)) {
        setLead({ step: "name" });
        pushBotReply(<>Great, what&apos;s your name?</>, "Asked for name");
      } else if (/^(no|nope|not now|no thanks|not really)/i.test(t)) {
        setCtx((c) => ({ ...c, leadDeclined: true }));
        setLead({ step: "idle" });
        pushBotReply(
          <>No problem, happy to keep answering questions. Call {siteConfig.phone} any time.</>,
          "Declined lead capture"
        );
      } else {
        pushBotReply(<>Just a yes or no works, want me to grab your info?</>, "Reprompted for offer response");
      }
      return;
    }

    if (step === "name") {
      if (!isValidName(t)) {
        pushBotReply(<>I didn&apos;t quite catch a name there, mind typing it again?</>, "Asked again for name");
        return;
      }
      const firstName = t.split(" ")[0];
      if (leadRef.current.phone) {
        setLead((prev) => ({ ...prev, name: t, step: "confirm" }));
        pushBotReply(confirmReply({ ...leadRef.current, name: t }), "Recapped lead details for confirmation");
      } else {
        setLead((prev) => ({ ...prev, name: t, step: "phone" }));
        pushBotReply(<>Thanks, {firstName}. What&apos;s the best phone number to reach you?</>, "Asked for phone");
      }
      return;
    }

    if (step === "phone") {
      if (!isValidPhone(t)) {
        pushBotReply(<>That doesn&apos;t look like a full phone number, mind trying again?</>, "Asked again for phone");
        return;
      }
      if (leadRef.current.email) {
        setLead((prev) => ({ ...prev, phone: t, step: "confirm" }));
        pushBotReply(confirmReply({ ...leadRef.current, phone: t }), "Recapped lead details for confirmation");
      } else {
        setLead((prev) => ({ ...prev, phone: t, step: "email" }));
        pushBotReply(<>Got it. Email too? Optional, type &quot;skip&quot; to move on.</>, "Asked for email");
      }
      return;
    }

    if (step === "email") {
      if (/^skip$/i.test(t)) {
        setLead((prev) => ({ ...prev, step: "confirm" }));
        pushBotReply(confirmReply(leadRef.current), "Recapped lead details for confirmation");
        return;
      }
      if (!isValidEmail(t)) {
        pushBotReply(<>That email doesn&apos;t look quite right, try again or type &quot;skip&quot;.</>, "Asked again for email");
        return;
      }
      setLead((prev) => ({ ...prev, email: t, step: "confirm" }));
      pushBotReply(confirmReply({ ...leadRef.current, email: t }), "Recapped lead details for confirmation");
      return;
    }

    if (step === "confirm") {
      if (/^(yes|yep|yeah|send|confirm|correct|sure)/i.test(t)) {
        submitLeadFromChat();
      } else if (/^(no|nope|start over|redo|restart)/i.test(t)) {
        setLead({ step: "name" });
        pushBotReply(<>No problem, let&apos;s start over. What&apos;s your name?</>, "Restarted lead capture");
      } else {
        pushBotReply(<>Just need a yes to send this along, or say &quot;start over&quot;.</>, "Reprompted for confirmation");
      }
    }
  }

  function cancelLeadCapture() {
    pushUserMessage("Cancel");
    setCtx((c) => ({ ...c, leadDeclined: true }));
    setLead({ step: "idle" });
    pushBotReply(<>No worries, cancelled. What else can I help with?</>, "Cancelled lead capture");
  }

  function handleUserInput(displayText: string, matchText: string = displayText) {
    pushUserMessage(displayText);

    const step = leadRef.current.step;
    if (step !== "idle" && step !== "done" && step !== "error") {
      handleLeadStep(matchText);
      return;
    }

    const detected = detectContactInfo(matchText);
    if ((detected.phone || detected.email) && !ctx.leadOffered && !ctx.leadDeclined && !ctx.leadSubmitted) {
      startLeadCapture(detected, true);
      return;
    }

    const result = getSmartReply(matchText, ctx);
    setCtx(result.nextContext);
    pushBotReply(result.content, result.logLabel, () => {
      if (result.offerLeadCapture) {
        setTimeout(offerLeadCapture, 500);
      }
    });
  }

  function handleQuickAction(qa: QuickAction) {
    handleUserInput(qa.label, qa.triggerText);
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    handleUserInput(text);
  }

  const capturing = lead.step !== "idle" && lead.step !== "done" && lead.step !== "error";
  const placeholder =
    lead.step === "name"
      ? "Your name…"
      : lead.step === "phone"
        ? "Your phone number…"
        : lead.step === "email"
          ? "Your email (or type skip)…"
          : lead.step === "offer" || lead.step === "confirm"
            ? "Yes or no…"
            : "Type a question…";

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
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                      Gary&apos;s Pipelining
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-white/15 px-1.5 py-0.5 text-[10px] font-medium text-white/90">
                        <Sparkles className="h-2.5 w-2.5" /> Smart assistant
                      </span>
                    </div>
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

            {/* Quick actions / lead-capture actions bar */}
            <div className="shrink-0 border-t border-border bg-surface/60 px-3 py-2.5">
              {lead.step === "offer" ? (
                <div className="grid grid-cols-2 gap-1.5">
                  <ActionButton label="Yes, let's do it" onClick={() => handleUserInput("Yes, let's do it")} />
                  <ActionButton label="No thanks" onClick={() => handleUserInput("No thanks")} />
                </div>
              ) : lead.step === "confirm" ? (
                <div className="grid grid-cols-2 gap-1.5">
                  <ActionButton label="Yes, send it" onClick={() => handleUserInput("Yes, send it")} />
                  <ActionButton label="Start over" onClick={() => handleUserInput("Start over")} />
                </div>
              ) : lead.step === "name" || lead.step === "phone" || lead.step === "email" || lead.step === "submitting" ? (
                <ActionButton label="Cancel" onClick={cancelLeadCapture} disabled={lead.step === "submitting"} />
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {DEFAULT_QUICK_ACTIONS.map((qa) => (
                    <ActionButton key={qa.key} label={qa.shortLabel} onClick={() => handleQuickAction(qa)} />
                  ))}
                </div>
              )}
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
                placeholder={placeholder}
                disabled={lead.step === "submitting"}
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || lead.step === "submitting"}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="shrink-0 px-4 pb-3 text-center text-[11px] text-muted-foreground">
              {capturing ? "Your info goes straight to our team." : `Automated assistant. For anything urgent, call ${siteConfig.phone}.`}
            </p>
            <div className="flex shrink-0 justify-center border-t border-border pb-3 pt-2.5">
              <PoweredBy tone="dark" size="sm" />
            </div>
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
              {unread > 0 && (
                <span className="absolute -right-1 -top-1 z-20 grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-emergency text-[9px] font-bold text-white lg:-right-1.5 lg:-top-1.5 lg:h-6 lg:w-6 lg:text-[11px]">
                  {unread}
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
