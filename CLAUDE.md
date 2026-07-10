# CLAUDE.md — ITQAAN Website

Project context for Claude Code. Read this before making changes.

## Overview

ITQAAN is a creative agency site (withitqaan.com) for a solo freelance web
developer/designer serving **Muslim businesses**, primarily targeting **Dubai /
UAE** clients. Web design is the primary service; brand identity, graphic
design, and SEO/care plans are also offered and configurable in the quote flow.

**Business context (important):**
- The owner currently lives in **Pakistan** and plans to return to the UAE. He
  serves UAE clients **remotely**. This is why there is no physical address in
  the structured data (only `areaServed`), and why Google Business Profile is
  on hold until he is back in the UAE.
- Prices are in **AED**, charm-priced (all end in `…97`), starting from **997 AED**.
- "Halal" positioning is concrete: sites are built with **no images of women and
  no music**, and pricing is fixed with no hidden fees. (See FAQ copy.)
- WhatsApp: `wa.me/923165252296`. Email: `hello@withitqaan.com` (leads are
  delivered to the owner's inbox via Resend).

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, custom `@theme` token system in `app/globals.css`
- Framer Motion — mount-based reveals, hover states, accordion open/close. NOT
  used for scroll-driven animation.
- GSAP + ScrollTrigger + Observer — all scroll-driven animation
- Lenis — smooth scroll, wired to GSAP's ticker (see "Lenis + GSAP sync" below)
- `sharp` — used (via one-off Node scripts) to optimize project images to WebP
- Resend — quote/lead emails (`app/api/quote/route.ts`)
- Google Analytics 4 — id `G-FZG9CL5KHH`, wired in `app/layout.tsx`
- Deployed to Vercel, domain via Cloudflare. GitHub: `learning2codenowq/itqaan`

**Verify visual/animation changes in a browser.** Static analysis will not catch
scroll-timing or Lenis-sync issues. `npm run build` must stay green.

## Design system

Color tokens live in `app/globals.css` inside the `@theme` block. Palette is
"Onyx + Candy Blue" (do not reintroduce any older ash/cream/ember palette):

```css
--color-void:      #020202;
--color-ink:       #B2D5E5;
--color-ember:     #B2D5E5;   /* accent, currently equals ink */
--color-ink-72 … --color-ink-3:  rgba(178,213,229, .72 … .03)
--color-ember-dim: rgba(178,213,229,0.12);
--color-ember-18:  rgba(178,213,229,0.18);
```

Rules:
- Always reference colors via `var(--color-x)` or the matching rgba. Never
  hardcode a hex/rgb that is not one of these (leftover hardcoded literals have
  caused hard-to-track palette bugs before).
- To test another palette, change the token block only.
- One deliberate off-token white exists: the **hero gloss/shimmer**
  (`.hero-excellence` in `Hero.tsx`, now applied to "your time.") uses
  `#ffffff`/`#d3ecf7` gradients so the words pop. That is intentional; leave it.
- Fonts: Plus Jakarta Sans (display), DM Sans (body), DM Mono (mono). There is
  no Arabic web font: the word إتقان is rendered as inline SVG paths in
  `components/ui/ItqaanCalligraphy.tsx` (paths extracted from DigitalKhatt).
  The loader/hero uses the self-drawing variant; Philosophy uses
  `<ItqaanCalligraphy animate={false} />` (static, filled). The old 500KB
  `DigitalKhattV2.otf` was removed for mobile performance, do not reintroduce it.

## Copy rules

**No em dashes anywhere** — not in UI copy, code comments, or this file. Use a
comma, colon, or period. Keep this in all new/edited copy.

## Site structure

`app/page.tsx` renders, in order:
**Navbar, Hero, Philosophy, Services, Process, Packages, Guarantees, Contact, Footer.**
It also injects an `Organization`/`ProfessionalService` JSON-LD block for SEO.

Separate routes:
- **`/quote`** (`app/quote/page.tsx`) — the multi-step quote builder. Reads
  `?plan=<id>` to preselect a package.
- **`/faq`** (`app/faq/page.tsx`) — accordion + `FAQPage` JSON-LD.
- **`/api/quote`** — Resend email of a submitted quote. (There is **no**
  `/api/contact` anymore; it was removed.)

There is **no portfolio section yet** (held until Anas Marble / Wallz are
polished), but the hero shows a marquee of project screenshots (see Hero
showcase). The old "no Pricing section" rule is **obsolete** — Packages is now
the pricing section and the quote builder is the main lead path.

## The quote system (primary lead funnel)

Belgalink-inspired (belgalink.be/offerte). The flow: homepage **Packages**
section shows fixed "from" prices → each card deep-links to **`/quote?plan=…`** →
a **multi-step builder** with a **live estimate** → submits to Resend and fires a
GA4 `generate_lead` conversion event.

- **`lib/quote.ts`** — single source of truth for ALL pricing and options
  (site types, brand scopes, graphic items, SEO plans, add-ons, care plan,
  timelines, and the homepage `packages`). Prices are charm-priced starter
  numbers; the owner adjusts them here. Also holds the **scarcity** config:
  `capacity.slotsLeft` / `capacity.perMonth` and `currentMonthLabel()`.
- **`components/quote/QuoteBuilder.tsx`** — the wizard. Branches by primary
  need (website → type → add-ons; brand; graphic; seo). Live estimate panel,
  validation per step, `?plan` preselect. On success fires
  `window.gtag?.('event','generate_lead', { currency:'AED', value })`.
- **`components/sections/Packages.tsx`** — the pricing cards.
- **`components/ui/ScarcityBadge.tsx`** — "Only N of M project slots left for
  {month}"; flips to a waitlist message at 0. Shown on Packages and `/quote`.
- **`components/sections/Guarantees.tsx`** — trust strip (fixed price, revisions
  until happy, you own everything, support after launch).
- **`lib/faq.ts`** + **`components/sections/Faq.tsx`** — FAQ data + accordion.
- All primary CTAs (Hero, Navbar, Contact, Footer) point to **`/quote`**.

## Hero showcase (project marquee)

- **`components/ui/HeroShowcase.tsx`** — desktop-only (hidden < 980px). Two
  columns of **clean 16:9 website cards** scrolling in opposite directions,
  looping **seamlessly** (each list duplicated, translated by
  `calc(-50% - 9px)` = one copy + half-gap). Speed ~18s.
- **Gotcha (already fixed, keep it):** cards MUST have `flex-shrink: 0` and the
  columns must `align-items: flex-start`. Without this, flexbox squished the
  cards to fit the container height and broke the 16:9. Each card is a 16:9
  container with the image absolutely filling it (`object-fit: cover`).
- **To add/change a project:** put a **16:9 `.webp`** in `public/projects/` and
  add its filename (no extension) to the `projects` array in `HeroShowcase.tsx`.
  Source images from the owner are large PNGs (e.g. 5000×2813) — optimize with a
  one-off `sharp` script: `resize({ width: 1200 }).webp({ quality: 82 })`, then
  delete the source PNG. Current set: anasmarble, halalcert, mathtutor,
  quranteaching, royalthobes, tadabbur (~20–55 KB each).
- Keep to the no-female-imagery rule when choosing screenshots.

## Navbar & brand

`components/Navbar.tsx` renders after the loader (~2.9s): a **brand lockup
top-left** ("ITQAAN / Creative Agency", links to `#hero`) and a **floating pill
top-right** (Services, Process, Pricing links + "Work with us" → `/quote`). Mobile
collapses the pill to a hamburger and hides the brand subtitle.

## Animation architecture (per section)

Each section uses a different scroll treatment; do not collapse them:

- **Hero** (`Hero.tsx`): loader (~2.4s), then Framer entrance for the content,
  then a GSAP ScrollTrigger **pin** with background parallax + content fade-out.
  Two-column layout: left = headline/CTA (title is intentionally **3 lines**:
  "Professional websites," / "without investing" / "your time." with the
  shimmer on the last line, sized `clamp(34px, 4.3vw, 66px)` so each line stays
  single on desktop; the CTA row carries a "From AED 997" price anchor pulled
  from lib/quote.ts), right = `HeroShowcase`. `refreshPriority: 3`.
- **Philosophy** (`Philosophy.tsx`): desktop = GSAP pin + scrub reveal
  (blur-to-focus Arabic word, clip-path transliteration, self-drawing hadith
  line). **Mobile = play-once** (`toggleActions`, NOT scrub) so it finishes
  before scrolling past. `refreshPriority: 2`.
- **Services** (`Services.tsx`): no pin. Row top-borders draw in on scroll
  (non-pinned scrub) + a parallaxing `GeoPattern`. Accordion = Framer
  `AnimatePresence` (click, not scroll) — leave it.
- **Process** (`Process.tsx`): pinned horizontal carousel driven by GSAP
  `Observer` (not scrub). See "Process carousel" below. `refreshPriority: 1`.
- **Packages / Guarantees / Contact**: Framer `useInView` reveals. Services and
  Contact also parallax a low-opacity `GeoPattern` (`components/ui/GeoPattern.tsx`).

**`refreshPriority` matters:** the three pinned triggers (Hero 3, Philosophy 2,
Process 1) MUST refresh top-to-bottom, otherwise pins compute their start ~one
viewport too early and sections overlap / "glitch". Keep these values.

## Process carousel — read before editing

1. **Not scrub-based.** Uses `Observer` to treat each wheel/touch gesture as a
   discrete "advance one step", animates fully, and ignores input via an
   `animating` flag until done.
2. **Scroll direction:** scroll **down** advances (`onDown` → next step; from the
   last step it releases forward into Packages). Scroll **up** goes back
   (`onUp`; from the first step it releases back into Services). Do not swap.
3. **Observer starts disabled**, enabled in the pin's `onEnter`/`onEnterBack`,
   disabled in `onLeave`/`onLeaveBack`.
4. **Lenis is stopped while pinned** (`getLenis()?.stop()` on enter,
   `.start()` on leave) so the wheel-hijack and Lenis don't fight. On enter it
   also snaps Lenis exactly to the pin boundary (`freezeAt`) to avoid a
   momentum-overshoot "clip".
5. **Nav pass-through:** `onEnter`/`onEnterBack` bail out early if
   `window.__navScrolling` is set and `window.__navTarget !== 'process'`, so an
   in-page anchor scroll (e.g. clicking "Pricing") can glide *through* the
   pinned Process section instead of being trapped. This flag is set by the
   anchor-click interceptor in `LenisProvider`.
6. **`end: '+=4000'` is a placeholder**, not a real measurement. The pin
   releases only when told to. Do not tie `end` to step count.
7. **Forced scroll jumps go through Lenis**, never `ScrollTrigger.scroll()`.

## Lenis + GSAP sync — critical, do not violate

Lenis drives scroll smoothing (`components/ui/LenisProvider.tsx`), run off GSAP's
ticker (`gsap.ticker.add(raf)`), with `lenis.on('scroll', ScrollTrigger.update)`.
The instance is exposed on **`window.__lenis`**.

- **Any forced scroll change must go through
  `window.__lenis.scrollTo(target, { immediate: true, force: true })`**, never
  `ScrollTrigger.scroll()` / `st.scroll()`. Raw scroll leaves Lenis with a stale
  position and the whole site "glitches" on the next scroll input.
- **Ticker cleanup:** the ticker callback and the `scroll` listener are removed
  on unmount (prevents a React-Strict-Mode dev double-mount leak that caused
  progressive stutter). Keep this cleanup.
- `ScrollTrigger.config({ ignoreMobileResize: true })` and a
  `document.fonts.ready.then(() => ScrollTrigger.refresh())` run once so pins
  re-measure after fonts swap. Keep both.
- **Anchor nav interceptor:** `LenisProvider` intercepts clicks on `#hash` /
  `/#hash` links, `preventDefault`s, sets `window.__navScrolling`/`__navTarget`,
  and animates via `lenis.scrollTo`. This is how nav links reach sections that
  sit after the pinned Process section. Keep it in sync with the Process
  pass-through guard.
- There is **no** CSS `scroll-behavior: smooth` (it double-animates with Lenis) —
  do not add it back.

## SEO & analytics

- `app/layout.tsx`: page `<title>` = "Websites for Dubai Businesses | ITQAAN |
  From 997 AED", description, Open Graph + Twitter with `/og-image.webp`
  (1731×909), and the GA4 scripts (`G-FZG9CL5KHH`).
- `app/sitemap.ts` → `/sitemap.xml`, `app/robots.ts` → `/robots.txt`
  (both auto-generated by Next; base `https://withitqaan.com`). Submitted to
  Google Search Console.
- Structured data: `ProfessionalService` on the homepage, `FAQPage` on `/faq`.
- Favicon: **`app/icon.svg`** (Next auto-injects it). Do not rely on
  `public/images` — that folder was deleted.
- GA4 conversion: mark `generate_lead` as a key event in GA4. For campaigns, use
  UTM-tagged links so Traffic acquisition attributes the source.
- **Google Business Profile** is intentionally deferred until the owner is back
  in the UAE (needs a verifiable local address). Meanwhile: SEO + geo-targeted
  paid ads (Google/Meta targeting UAE) are the growth levers.

## Deploy notes

- **Vercel env vars required for quote emails:** `RESEND_API_KEY`,
  `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. They live only in local
  `.env.local` (gitignored) and MUST be set in the Vercel dashboard, else
  submitted quotes silently fail to email. `CONTACT_FROM_EMAIL` must be on a
  Resend-verified domain.
- After deploy, test: (1) submit a real quote and confirm the email arrives;
  (2) check the OG preview via opengraph.xyz / a WhatsApp link.

## Known editing pitfall (paste, not a code bug)

Pasting multi-line JSX where a lone opening tag sits on its own line (e.g. `<a`
then its first prop on the next line) has been dropped on paste, producing a
"Did you mean `{'>'}`" error pointing at a *closing* `>` several lines later, not
the real spot. If you see that, look for a missing opening tag above the reported
line. Prefer keeping an opening tag and its first attribute on one line.

## Working conventions

- Prefer targeted, minimal edits for small changes; full-file rewrites are fine
  for larger structural changes.
- Run `npm run dev`, verify in the browser, keep `npm run build` green.
- If a change touches GSAP / ScrollTrigger / Observer / Lenis, re-read
  "Lenis + GSAP sync" and "Process carousel" first.
- Open ideas / backlog (not yet built): WhatsApp float button, sticky mobile
  CTA, real domains shown in the hero cards, a real portfolio section, more
  SEO content pages.
```
