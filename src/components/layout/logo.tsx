import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/brand/Logo without mascot.svg";

const SIZES = {
  default: "h-[206.1px] w-auto sm:h-[235.2px] lg:h-[265px]",
  // Sized to nearly fill the header bar's height (minus its fixed vertical padding), used in the header only.
  // Visually enlarged via a uniform transform scale in the header itself, this is the layout-box size,
  // which keeps the header bar's own height unaffected (CSS transforms don't participate in layout).
  header: "h-16 w-auto sm:h-20 lg:h-24",
} as const;

export function Logo({ className = "", size = "default" }: { className?: string; size?: keyof typeof SIZES }) {
  return (
    <Link href="/" aria-label="Gary's Pipelining & Drain Cleaning, home" className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src={logo}
        alt="Gary's Pipelining and Drain Cleaning, LLC"
        width={1536}
        height={1024}
        className={SIZES[size]}
        priority={size === "header"}
      />
    </Link>
  );
}
