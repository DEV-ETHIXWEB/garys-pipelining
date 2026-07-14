import { Sparkle } from "lucide-react";

const defaultSparkles = [
  { top: "18%", left: "8%", size: "h-2 w-2", delay: "0s" },
  { top: "72%", left: "14%", size: "h-2.5 w-2.5", delay: "0.9s" },
  { top: "28%", left: "26%", size: "h-2 w-2", delay: "1.7s" },
  { top: "80%", left: "38%", size: "h-2 w-2", delay: "0.4s" },
  { top: "15%", left: "62%", size: "h-2.5 w-2.5", delay: "1.3s" },
  { top: "75%", left: "74%", size: "h-2 w-2", delay: "0.7s" },
  { top: "22%", left: "88%", size: "h-2.5 w-2.5", delay: "2s" },
  { top: "68%", left: "94%", size: "h-2 w-2", delay: "1.1s" },
];

const compactSparkles = [
  { top: "12%", left: "18%", size: "h-1.5 w-1.5", delay: "0s" },
  { top: "70%", left: "70%", size: "h-1.5 w-1.5", delay: "1.1s" },
  { top: "45%", left: "80%", size: "h-1 w-1", delay: "0.6s" },
];

export function SparkleField({ variant = "default" }: { variant?: "default" | "compact" }) {
  const sparkles = variant === "compact" ? compactSparkles : defaultSparkles;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {sparkles.map((s, i) => (
        <span key={i} className="header-twinkle absolute" style={{ top: s.top, left: s.left, animationDelay: s.delay }}>
          <Sparkle className={`${s.size} fill-white/60 text-white/60`} />
        </span>
      ))}
    </div>
  );
}
