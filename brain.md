# Brain, Gary's Pipelining website rebuild

Read this before doing anything else in this project. Saves re-discovery.

## What this is

Full rebuild of garyspipelining.com (sewer/drain trenchless contractor,
Tukwila WA), Next.js 16 (App Router) + Tailwind v4. Lives directly at
`a:/garyspipelining/` (this IS the project root, single folder,
`src`/`public`/etc. are direct children, no nested subfolder).

The old Lovable-connected project (`nextgen-pipelining-main`) and the
HTTrack mirror of the original WordPress site that used to live
alongside this one have been permanently deleted, by user request, once
all real business facts/photos had already been migrated into
`public/photos` and `src/lib/site-config.ts`. They no longer exist on
disk; don't look for them.

## Real business facts (don't invent new ones, pull from old mirror if more are needed)

- Phone: (206) 535-8460, Email: office@garyspipelining.com
- Address: 14101 Interurban Ave S, Unit 78-B, Tukwila, WA 98168
- License: WA #GARYSPC881RE
- Real logo is a cartoon-superhero clip-art mark (`public/brand/logo.png`).
  User explicitly said **keep it exact, no redesign**. Don't put a box/
  card around it (user removed that); just size it bigger, no wrapper.
- Only 2 real verified Google reviews known (Kylie Barrett, Ronald
  Imbert), don't fabricate more. One real 1-star review exists too
  (not used, don't surface negative reviews, that's normal practice,
  not dishonesty).
- Don't invent stats like "25+ years" / "10k+ jobs", old site never
  stated tenure. Use qualitative claims only ("years of experience",
  "24/7", "licensed & insured").

## Architecture

- `src/lib/site-config.ts`, single source of truth for NAP/phone/email.
- `src/lib/content/services.ts` (9 services) / `locations.ts` (6 areas):
  all page copy lives here, not hardcoded in templates.
- `src/components/sections/service-page-template.tsx` /
  `location-page-template.tsx`, shared shells, driven by the content
  files above. 26 total pages, all passing `next build`.
- Fonts: **Poppins** (headings) + **Open Sans** (body), self-hosted via
  `next/font/google`, chosen for industry-standard contractor look +
  performance/SEO. User explicitly disliked the original Inter +
  Instrument Serif pairing, don't revert to it.
- `public/photos/real/*`, actual job-site photos from the old site.
  `public/photos/stock/*`, supplementary curated photography (used only
  where no real photo exists, e.g. Bellevue/Federal Way location heroes).
  **Every single webp/asset in `public/` is wired into the site**, user
  asked for 100% asset utilization. If you add new images, use them
  somewhere or don't add them.
- Contact form: React Hook Form + Zod → Web3Forms (`src/lib/web3forms.ts`).
  Needs `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` (see
  `.env.local.example`) to actually deliver email, currently unset.

## Landmines hit this session, don't re-hit them

1. **`next.config.ts` MUST have `allowedDevOrigins: ["127.0.0.1", "localhost"]`.**
   Without it, Next 16 dev mode silently blocks HMR/hydration JS when the
   site is accessed via `127.0.0.1` instead of `localhost`, page loads
   fine visually but **all client interactivity silently breaks**: nav
   dropdowns don't open, forms native-submit instead of validating (you
   get `?name=&phone=...` in the URL bar, that's the tell). No console
   error, no exception, just dead JS. Already fixed; don't remove this
   config.
2. **Port 3000 collision**: an unrelated project's dev server
   ("Ethixweb", a different TanStack Start app) sometimes runs on this
   machine bound to `[::1]:3000` (IPv6 loopback). `localhost` may resolve
   there instead of to this project. Always verify with
   `netstat -ano | grep :3000` before assuming which server you're
   hitting. Never kill that other process, not yours.
3. **Stale/duplicate dev servers**: `pkill -f "next dev"` on this Windows
   git-bash setup often fails to actually kill the node process (PID
   mismatch). If a restart shows "Port 3000 is in use" or "another next
   dev server is already running," find the real PID via netstat and
   `powershell -Command "Stop-Process -Id <PID> -Force"`, then restart.
4. **Lucide icon components**: never do `const Icon = getIcon(name); <Icon/>`
   inside a render function, Next 16's `react-hooks/static-components`
   ESLint rule fails the build on this pattern (treated as "creating a
   component during render"). Use a switch-statement component instead
   (see `src/components/ui/service-icon.tsx`), each case returns a
   statically-named JSX tag directly.
5. **`generateMetadata`/page `params` and `searchParams` are `Promise`s**
   in this Next version, always `await params` / `await searchParams`,
   never destructure synchronously (training-data-era Next.js assumed
   sync access; this version doesn't allow it).
6. **next/image with a static import**: if you override one of
   width/height, override both (matching the real file's aspect ratio),
   or the rendered image can end up wrong-sized. Don't pass just `height`
   without `width` on a static import.

7. **Vercel deployment, three separate real causes, in order found**: (a)
   repo only had `create-next-app`'s day-1 commit, the real site was
   never actually committed, always `git add -A && git commit` and
   confirm `git status` is clean before assuming a push will work; (b)
   the repo had project files nested inside an extra subfolder (from a
   manual GitHub upload), Vercel needed `Root Directory` set to match
   that subfolder name in Settings → General, now resolved since this
   project is flattened to one folder, so Root Directory should be left
   blank; (c) Vercel **Deployment Protection** was on, which makes every
   external visitor (including any agent fetching the URL) see a
   generic 404 instead of a login wall, by design, to hide that the
   deployment exists. A clean build + 404 on literally every URL
   including the deployment's own unique link, with zero errors in the
   build log, means check Deployment Protection, not the code.

## Verification habits that actually caught real bugs

Build passing (`next build`, `tsc --noEmit`, `eslint`) does **not** prove
client interactivity works, it caught zero of the landmines above.
What actually caught them: a Playwright script that navigates, clicks
the real button/link, and checks the resulting URL/DOM state (not just
HTTP status codes). Re-run something like that after any change to
Header, forms, or next.config before telling the user it's done.
