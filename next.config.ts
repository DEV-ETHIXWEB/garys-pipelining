import type { NextConfig } from "next";
import { legacyRedirects } from "./legacy-redirects";

// Static (no-nonce) CSP: nonce-based CSP forces every route to dynamic rendering
// (no static generation, no CDN caching), which isn't worth trading away here.
// 'unsafe-inline' on script/style is required for Next's own inline hydration
// data, the JSON-LD <script> tags, and this project's extensive use of the
// style={{}} prop; every other directive is scoped to what the site actually loads.
// React's dev-mode debugging (reconstructing callstacks, Fast Refresh) requires
// eval(), so 'unsafe-eval' is added to script-src outside production only.
const isDev = process.env.NODE_ENV !== "production";

const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://www.google.com https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  // Forces every subresource to HTTPS. Correct in production (paired with
  // HSTS below); in dev it silently breaks LAN-IP testing (e.g.
  // http://192.168.1.x:3000) because browsers only exempt localhost/127.0.0.1
  // from this upgrade, not arbitrary local network IPs, so every asset
  // request gets rewritten to https:// against a server that only speaks
  // plain HTTP and fails with no visible error (unstyled page, broken images).
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: cspDirectives },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.6"],
  images: {
    // Default (75) visibly softens real photography (job-site photos, before/after
    // comparisons). Explicitly allow the higher values used via the `quality` prop
    // on hero/showcase <Image> components across the site.
    qualities: [75, 90, 92, 95],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
