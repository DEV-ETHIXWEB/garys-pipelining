# Gary's Pipelining & Drain Cleaning Website

**Client:** Gary's Pipelining & Drain Cleaning (office@garyspipelining.com)

## What this project is

Marketing website for Gary's Pipelining & Drain Cleaning, a plumbing and drain
cleaning company. It's a full rebuild of the previous WordPress site, with
service pages, location pages, a coverage map, testimonials, and a contact/
estimate form that emails leads directly to the client.

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- TypeScript
- Nodemailer + SMTP2Go (lead email delivery, via `/api/send-lead`)
- Vercel (hosting/deploy)

## How to set it up locally

1. Clone the repo and check out a `feat/` branch for your task.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the env example and fill in the values (see below):
   ```bash
   cp .env.local.example .env.local
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 (use http://127.0.0.1:3000 if port 3000 is
   already bound on the IPv6 loopback).

## Environment variables needed

Every lead source on the site, the estimate form, the contractor
partnership form, and the chatbot, POSTs to a single route handler,
`src/app/api/send-lead/route.ts`, which sends mail over SMTP via
[Nodemailer](https://nodemailer.com). See `src/lib/mail/` for the reusable
pieces (transport, templates, branding). Without SMTP configured, forms
still validate client-side but submissions fail server-side and visitors
see a "please call instead" fallback.

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, credentials for an
  SMTP2Go SMTP user (Settings > SMTP Users in the SMTP2Go dashboard). Any
  standard SMTP relay works here, not just SMTP2Go.
- `SMTP_SECURE`, optional, `"true"` to force implicit TLS. Inferred from
  the port (465 = true) if unset.
- `MAIL_FROM`, the sending address. Its domain must be a verified sender in
  SMTP2Go.
- `MAIL_TO`, the admin inbox that receives lead notifications. Accepts a
  comma-separated list for multiple recipients.
- `MAIL_BCC` (optional), comma-separated list of addresses silently BCC'd on
  every admin lead notification, without appearing in the To: list.
- `MAIL_BRAND_*` (optional), overrides the name/logo/colors used in outgoing
  emails. Defaults to `site-config.ts`, which is correct for this project;
  only needed if this mail system is reused on a different project without
  also swapping `site-config.ts`.

See `.env.local.example` for the full list with SMTP2Go-specific notes.

- `GOOGLE_SITE_VERIFICATION` (optional), the Google Search Console HTML tag
  verification code. Only needed once, in Vercel's Production env vars.

Never commit `.env*` files, they are already excluded via `.gitignore`.

## Spam protection on lead forms

Every lead (estimate form, partnership form, chatbot) goes through
`src/app/api/send-lead/route.ts`, which layers several defenses. Turnstile
alone isn't enough: bots that pass it fill the forms with random characters.

0. **Nothing is ever deleted.** Leads the filter rejects are *quarantined*: delivered to
   `MAIL_QUARANTINE` instead of the client's inbox, with no customer confirmation. That
   safety net is what lets the rules below be strict, so set that variable. Without it
   quarantined leads are only logged, and a wrongly flagged customer really is lost.
1. **Honeypots** (hidden checkbox + off-screen text input): filled means bot, dropped silently.
2. **A hard 3-second floor.** Nobody reads a form, types their details and submits
   inside three seconds. This is content-independent, so it catches junk that is
   different every time, which pattern rules cannot. Known tradeoff: a real customer
   on full browser autofill can trip it, which is survivable only because they land
   in the quarantine mailbox rather than being deleted.
3. **Scored content/behaviour filter** (`src/lib/mail/spam.ts`): random-looking names and
   messages, free text with no spaces and almost no vowels, link stuffing, spam
   phrases, a repeat of a contact seen in the last 30 minutes (Gmail dots and
   +tags are normalised, so dot-variants are recognised as one inbox). Score 4+ on
   *content* is quarantined; 2-3 is delivered flagged.
4. **A manual block list** (`LEAD_BLOCKLIST`) for a specific repeat offender.
5. **Flagged leads** arrive with the subject prefix `[Review]` and a yellow banner,
   and the customer gets no confirmation email (bots submit real strangers' addresses).
6. **Rate limits** (3/hour per IP, only counting leads that passed the filter) and **de-duplication**
   (max 3 sends per contact per hour; a failed send doesn't count).
7. **Chatbot** leads must contain a real visitor conversation, since the chatbot skips Turnstile.
8. **Turnstile never blocks a lead.** If the widget can't verify (hostname missing
   from the widget's allow-list, Cloudflare incident, extension or network
   blocking the script), the form stays usable and the lead is delivered flagged
   rather than rejected, with a tighter per-IP cap (3/hour). Losing a real
   emergency call is worse than one more junk email. Obvious junk with no token
   is still dropped on content alone.

Dropped and flagged leads are logged on the server (`[send-lead] Dropped spam ...`,
reasons only, never the submitted text), so a wrongly dropped lead can be diagnosed
in the Vercel logs.

Tune or test the filter with `npm run test:spam` (real spam samples, plus a set of
awkward-but-legitimate leads that must never be dropped). Add any new spam pattern
to `scripts/test-spam-filter.mjs` first.

**Two mail filters worth setting up:** one on subject `"[Spam]"` in the quarantine
mailbox (so it stays out of the way but is searchable), and this one for the
client's inbox.

**Gmail filter for flagged leads:** Settings > Filters > Create filter, subject
`"[Review]"`, then *Apply the label* "Possible spam". Do **not** tick *Skip the
Inbox*: during a Turnstile outage every genuine lead is flagged too, and skipping
the inbox would hide real customers.

### Turnstile hostnames

The widget only works on hostnames listed on it in the Cloudflare dashboard
(Turnstile > the widget > Settings > Hostnames). A hostname that isn't listed
fails with **error 110200** and the form falls back to the unverified path above.
Keep `garyspipelining.com` and `www.garyspipelining.com` listed, and add
`garys-pipelining.vercel.app` if the Vercel URL is used for client demos.

## Deployment notes

- Deploys to Vercel. `npm run build` then `npm start` locally reproduces the
  production build; on Vercel this runs automatically on push via its Next.js
  adapter.
- The SMTP credentials above must be set as environment variables in the
  Vercel project settings, they are not committed to the repo.

## SEO

- `src/lib/site-config.ts` is the single source of truth for the canonical
  URL (`https://www.garyspipelining.com`), used by metadata, the sitemap,
  robots.txt, and JSON-LD. Update it there if the domain ever changes.
- `src/app/sitemap.ts` / `robots.ts` are generated from `services.ts` /
  `locations.ts`, new service or location pages are picked up automatically.
- `src/app/manifest.ts` is the web app manifest (name, icons, theme color).
- `src/app/llms.txt/route.ts` serves a plain-text summary of the business,
  services, and service areas for AI assistants/answer engines, generated
  from the same content the site renders from.
- Preview and branch deployments are automatically kept out of search
  results: `robots.ts` and the root `robots` metadata check
  `VERCEL_ENV`/`NODE_ENV` (via `isProduction` in `site-config.ts`) and
  return `noindex`/`Disallow: /` on anything that isn't the production
  deployment. Only `https://www.garyspipelining.com` itself is indexable.
- Every page sets its own `title`/`description`/canonical in its
  `metadata` export (or `generateMetadata` for the `/services/[slug]` and
  `/service-area/[slug]` dynamic routes); structured data (`LocalBusiness`,
  `Service`, `BreadcrumbList`, `FAQPage`) lives in `src/lib/schema.ts` and is
  injected per-page via `<JsonLd />`.
- To verify the domain in Google Search Console, add the HTML tag's
  `content` value as `GOOGLE_SITE_VERIFICATION` in Vercel (see above), no
  code change needed.

## Key contacts

| Role | Name | Contact |
| --- | --- | --- |
| Client | Gary's Pipelining & Drain Cleaning | office@garyspipelining.com |
| Project manager | Amar | amar@ethixweb.com |
| Lead dev | Akash | |

## Project structure

- `src/lib/site-config.ts`, single source of truth for phone, email,
  address, license number.
- `src/lib/content/services.ts` / `locations.ts`, all copy for the 9
  service pages and 6 location pages. Edit here, not in the templates.
- `src/components/sections/service-page-template.tsx` /
  `location-page-template.tsx`, the shared page shells driven by that
  content.
- `public/brand`, `public/photos/real`, the real logo and real job-site
  photos pulled from the old WordPress site. `public/photos/stock` is
  curated supplementary photography used where no real photo exists yet.

## Branching

One task = one branch, branched off `develop`/`main` and named after the
ClickUp task (e.g. `feat/contact-form-fix`). Never commit directly to
`develop` or `main`.
