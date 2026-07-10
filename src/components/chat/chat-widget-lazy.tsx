"use client";

import dynamic from "next/dynamic";

// Floating overlay, not needed for first paint; keep it out of the critical JS path.
export const ChatWidget = dynamic(() => import("./chat-widget").then((m) => m.ChatWidget), {
  ssr: false,
});
