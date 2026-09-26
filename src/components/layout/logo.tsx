import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/brand/Logo without mascot.svg";

const SIZES = {
  default: "h-[206.1px] w-auto sm:h-[235.2px] lg:h-[265px]",
  // Rendered directly at final display size (not scaled up via CSS transform) so the
  // browser rasterizes the SVG at true resolution — WebKit/Safari visibly blurs an
  // element enlarged via `transform: scale()` because it upscales an already-rasterized
  // layer instead of re-rendering the vector source. The header positions this
  // absolutely (see header.tsx) so its real size doesn't grow the header bar's height.
  // The largest size waits for 2xl: between 1024px and 1536px there isn't room
  // for it beside the nav, and it used to print over the "Home" link.
  header: "h-[153px] w-auto sm:h-[191px] 2xl:h-[229px]",
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
