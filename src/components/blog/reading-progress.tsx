"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[61] h-[3px] origin-left bg-yellow"
      style={{ scaleX, boxShadow: "0 0 12px color-mix(in oklab, var(--color-yellow) 70%, transparent)" }}
    />
  );
}
