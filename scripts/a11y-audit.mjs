// WCAG 2.1 A/AA automated audit: axe-core + Playwright, desktop + mobile,
// reduced motion, network-idle settle. Kept in the repo so conformance can be
// re-verified after any future content or design change.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3100";

const SERVICE_SLUGS = [
  "trenchless-sewer-repair",
  "pipe-bursting",
  "sewer-replacement",
  "water-main-repair",
  "sewer-inspection",
  "drain-cleaning",
  "hydro-jetting",
  "rooter-service",
  "sump-pump-installation",
];

const LOCATION_SLUGS = ["seattle-wa", "tacoma-wa", "bellevue-wa", "renton-wa", "tukwila-wa", "federal-way-wa"];

const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/services",
  "/service-area",
  ...SERVICE_SLUGS.map((s) => `/services/${s}`),
  ...LOCATION_SLUGS.map((l) => `/service-area/${l}`),
];

const VIEWPORTS = [
  { name: "desktop", width: 1366, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const onlyRoute = process.argv[2];
const routesToScan = onlyRoute ? [onlyRoute] : ROUTES;

async function scanPage(browser, route, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .exclude("iframe") // third-party Google Maps embeds, outside our code
    .analyze();

  await context.close();
  return results;
}

async function main() {
  const browser = await chromium.launch();
  const violationsByRule = new Map();
  let totalViolations = 0;
  const failingPages = new Set();

  for (const route of routesToScan) {
    for (const viewport of VIEWPORTS) {
      const results = await scanPage(browser, route, viewport);
      if (results.violations.length > 0) {
        failingPages.add(`${route} (${viewport.name})`);
      }
      for (const v of results.violations) {
        totalViolations += v.nodes.length;
        const key = `${v.id} :: ${v.impact}`;
        if (!violationsByRule.has(key)) {
          violationsByRule.set(key, { help: v.help, helpUrl: v.helpUrl, instances: [] });
        }
        const entry = violationsByRule.get(key);
        for (const node of v.nodes) {
          entry.instances.push({ route, viewport: viewport.name, target: node.target.join(" "), html: node.html });
        }
      }
      console.log(`Scanned ${route} @ ${viewport.name}: ${results.violations.length} rule(s) failing`);
    }
  }

  await browser.close();

  console.log("\n=== SUMMARY ===");
  console.log(`Routes scanned: ${routesToScan.length} (x2 viewports = ${routesToScan.length * 2} page loads)`);
  console.log(`Failing page/viewport combos: ${failingPages.size}`);
  console.log(`Total violation instances: ${totalViolations}`);
  console.log(`Distinct rules violated: ${violationsByRule.size}\n`);

  if (violationsByRule.size === 0) {
    console.log("Zero violations. Clean.");
    return;
  }

  for (const [key, entry] of violationsByRule) {
    console.log(`\n--- ${key} ---`);
    console.log(entry.help);
    console.log(entry.helpUrl);
    console.log(`Instances: ${entry.instances.length}`);
    for (const inst of entry.instances.slice(0, 5)) {
      console.log(`  [${inst.route} / ${inst.viewport}] ${inst.target}`);
      console.log(`    ${inst.html.slice(0, 160)}`);
    }
    if (entry.instances.length > 5) console.log(`  ...and ${entry.instances.length - 5} more`);
  }

  process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
