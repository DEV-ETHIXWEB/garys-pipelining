"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
// If the widget neither verifies nor reports an error within this window, treat
// it as failed. Turnstile stays silent in some failure modes (a hostname that
// isn't on the widget's allow-list, a blocked/one-off network error), and
// without this the submit button would stay disabled forever and the visitor
// would have no way to send their request.
const VERIFY_TIMEOUT_MS = 15_000;
let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Turnstile script failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile script failed"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function Turnstile({
  onVerify,
  onExpire,
  onError,
  theme = "auto",
}: {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "light" | "dark" | "auto";
}) {
  const containerId = `turnstile-${useId().replace(/:/g, "")}`;
  const widgetId = useRef<string | undefined>(undefined);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);

  // Keep the latest callbacks available to the widget without re-rendering
  // it; refs must only be written in an effect, never during render.
  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
    onErrorRef.current = onError;
  });

  // Next.js only inlines NEXT_PUBLIC_ vars when referenced statically like
  // this (no bracket/dynamic access) - see next.config build-time replacement.
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    let settled = false;
    const fail = () => {
      if (cancelled || settled) return;
      settled = true;
      onErrorRef.current?.();
    };
    const timer = window.setTimeout(fail, VERIFY_TIMEOUT_MS);

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        const el = document.getElementById(containerId);
        if (!el) return;
        widgetId.current = window.turnstile.render(el, {
          sitekey: siteKey,
          theme,
          callback: (token) => {
            settled = true;
            window.clearTimeout(timer);
            onVerifyRef.current(token);
          },
          "expired-callback": () => onExpireRef.current?.(),
          "error-callback": fail,
        });
      })
      .catch(fail);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = undefined;
      }
    };
  }, [containerId, siteKey, theme]);

  if (!siteKey) return null;

  return <div id={containerId} className="cf-turnstile" />;
}
