import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/content/services";
import { locations } from "@/lib/content/locations";
import { posts } from "@/lib/content/posts";

// llms.txt (see https://llmstxt.org) is a plain-text index aimed at AI
// assistants and answer engines (Claude, ChatGPT, Perplexity, etc.) that
// summarize or cite the business, so they work from accurate service list,
// service area, and contact details instead of guessing from scraped HTML.
// Generated from the same content arrays the site itself renders from, so it
// can't drift out of sync with services.ts / locations.ts.
export const dynamic = "force-static";

function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push(
    `${siteConfig.legalName} is a licensed, insured trenchless sewer and drain contractor based in ${siteConfig.address.city}, ${siteConfig.address.state}, serving the greater Seattle area. ${siteConfig.hours}. License ${siteConfig.license}.`
  );
  lines.push("");

  lines.push("## Services");
  for (const s of services) {
    lines.push(`- [${s.name}](${siteConfig.url}/services/${s.slug}): ${s.shortDescription}`);
  }
  lines.push("");

  lines.push("## Service areas");
  for (const l of locations) {
    lines.push(`- [${l.city}, ${l.state}](${siteConfig.url}/service-area/${l.slug})${l.isHQ ? " (headquarters)" : ""}`);
  }
  lines.push("");

  lines.push("## Guides");
  for (const p of posts) {
    lines.push(`- [${p.title}](${siteConfig.url}/blog/${p.slug}): ${p.metaDescription}`);
  }
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Phone: ${siteConfig.phone}`);
  lines.push(`- Email: ${siteConfig.email}`);
  lines.push(`- Address: ${siteConfig.address.full}`);
  lines.push(`- Request an estimate: ${siteConfig.url}/contact`);
  lines.push("");

  lines.push("## Other pages");
  lines.push(`- [About](${siteConfig.url}/about): Company background and crew.`);
  lines.push(`- [Blog](${siteConfig.url}/blog): Sewer and drain guides for Seattle-area property owners.`);
  lines.push(`- [Coupons](${siteConfig.url}/coupons): Current monthly offers.`);
  lines.push(`- [Contractor partnership program](${siteConfig.url}/contractor-partnership): For general contractors, property managers, developers, and municipalities.`);

  return lines.join("\n");
}

export async function GET() {
  return new NextResponse(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
