# CLAUDE.md — ITQAAN Website

Project context for Claude Code. Read this before making changes.

## Overview

ITQAAN is a creative agency site (withitqaan.com) for a solo freelance web
developer/designer serving Muslim businesses and service brands. Web design
is the primary marketed service; brand identity and graphic design are
retained as upsells during client conversations, not marketed separately.

## Tech stack

- Next.js 15 (App Router), React 19
- Tailwind CSS v4, custom `@theme` token system in `app/globals.css`
- Framer Motion — used for mount-based reveals, hover states, accordion
  open/close animations. NOT used for scroll-driven animation.
- GSAP + ScrollTrigger + Observer — used for all scroll-driven animation
- Lenis — smooth scroll, wired to GSAP's ticker (see "Lenis + GSAP sync" below)
- Deployed to Vercel, domain via Cloudflare
- GitHub: `learning2codenowq/itqaan`

## Design system

Color tokens live in `app/globals.css` inside the `@theme` block. Current
palette is "Onyx + Candy Blue" (previously ash/cream/ember, do not reintroduce
the old palette):

```css
--color-void:      #020202;
--color-ink:       #B2D5E5;
--color-ember:     #B2D5E5;   /* accent, currently equals ink; see note below */

--color-ink-72:    rgba(178, 213, 229, 0.72);
--color-ink-48:    rgba(178, 213, 229, 0.48);
--color-ink-28:    rgba(178, 213, 229, 0.28);
--color-ink-18:    rgba(178, 213, 229, 0.18);
--color-ink-10:    rgba(178, 213, 229, 0.10);
--color-ink-8:     rgba(178, 213, 229, 0.08);
--color-ink-5:     rgba(178, 213, 229, 0.05);
--color-ink-3:     rgba(178, 213, 229, 0.03);

--color-ember-dim: rgba(178, 213, 229, 0.12);
--color-ember-18:  rgba(178, 213, 229, 0.18);
```

Rules:
- Always reference colors via `var(--color-x)` or the matching rgba value.
  Never hardcode a hex/rgb that isn't one of the above, this is how the site
  ended up with leftover lime accents during a previous palette test, and it
  was hard to track down because some components had inline hardcoded values
  instead of using the tokens.
- If asked to test another palette, update the token block only, do not
  hand-edit individual component files unless a component is found to have a
  hardcoded literal instead of a `var()` reference.
- Global text selection style is set via `::selection` in `globals.css`,
  keep it high-contrast against whatever the current accent is.

Fonts: Plus Jakarta Sans, DM Sans, DM Mono (site), DigitalKhatt (Arabic loader
text only).

## Copy rules

**No em dashes anywhere.** Not in UI copy, not in code comments, not in this
file. Use a comma, colon, or period instead. This has been retrofitted across
Hero, Philosophy, Services, and Process already, keep it that way in any new
or edited copy.

## Site structure

`app/page.tsx` renders, in order: Navbar, Hero, Philosophy, Services, Process,
Contact, Footer. There is no Pricing section, it was intentionally removed:
the Contact form is the single CTA and the place where pricing gets discussed
directly with the client. Do not re-add a Pricing section unless explicitly
asked.

There is no portfolio section yet. It's intentionally being held until the
Anas Marble and Wallz client projects are fully polished.

## Animation architecture (per section)

Each section deliberately uses a different scroll-driven treatment, do not
collapse them into one shared pattern:

- **Hero** (`components/sections/Hero.tsx`): time-based entrance via Framer
  Motion right after the loader (so it's never empty on load), then a GSAP
  ScrollTrigger pin holds the section while the background pattern
  parallaxes and the content fades/lifts out, releasing into Philosophy.
- **Philosophy** (`components/sections/Philosophy.tsx`): GSAP pin (desktop
  only, disabled under 900px via `gsap.matchMedia`) with a blur-to-focus
  reveal on the Arabic word, a clip-path wipe on the transliteration line,
  and a hadith border line that draws itself (`scaleY`).
- **Services** (`components/sections/Services.tsx`): no pin. Each row's top
  border draws left-to-right as it scrolls into view, non-pinned scrub tied
  to each row's own position. Accordion open/close stays on Framer Motion
  `AnimatePresence`, that's a click interaction, not scroll, leave it alone.
- **Process** (`components/sections/Process.tsx`): the most complex one, a
  pinned horizontal panel carousel driven by GSAP `Observer`, not scrub.
  See "Process carousel" below before touching this file.

## Process carousel — read before editing

This section went through several iterations to get right, the current
architecture exists for specific reasons:

1. **Not scrub-based.** An earlier version tied panel position directly to
   scroll offset (`scrub: true`). This caused two problems: (a) a single
   fast scroll/flick blew past multiple steps before `snap` could catch it,
   and (b) `snap`'s eased catch-up still felt loose. Current version uses
   `Observer` to treat each scroll gesture as a discrete "advance one step"
   command, animates fully to that step, and ignores further input via an
   `animating` flag until the transition completes.

2. **Observer starts disabled.** It's only enabled inside the pinning
   ScrollTrigger's `onEnter`/`onEnterBack`, and disabled in
   `onLeave`/`onLeaveBack`. Without this, wheel events kept driving step
   changes even after scrolling past the section entirely, which is what
   caused the "still animating in a section I already left" bug.

3. **The pin does not release based on scroll distance.** `end: '+=4000'`
   is a large placeholder, not a real measurement. The pin only releases
   when explicitly told to, after reaching the last step and scrolling
   again (or the first step and scrolling back). Do not change this to a
   calculated `end` value tied to step count, that was tried and caused the
   pin to release mid-sequence.

4. **Forced scroll jumps MUST go through Lenis, never `ScrollTrigger.scroll()`
   directly.** See "Lenis + GSAP sync" immediately below, this is the most
   important rule in this file.

## Lenis + GSAP sync — critical, do not violate

Lenis drives scroll smoothing. It's wired in `LenisProvider.tsx` to run off
GSAP's ticker (`gsap.ticker.add(...)`) rather than its own `requestAnimationFrame`
loop, and `lenis.on('scroll', ScrollTrigger.update)` keeps ScrollTrigger in
sync with Lenis's smoothed position.

**The instance is exposed on `window.__lenis`** specifically so any component
can force a scroll position change through it correctly.

**Rule: any code that needs to forcibly change scroll position (jump, snap,
release a pin) must call `window.__lenis.scrollTo(target, { immediate: true,
force: true })`, never `ScrollTrigger.scroll()` or `st.scroll()` directly.**

Why this matters: `st.scroll()` moves the raw browser scroll position without
telling Lenis. Lenis then has a stale internal position, and on the next
scroll input tries to animate from that wrong position back to reality. This
was the root cause of a bug where the whole site felt like it was "glitching"
after Process's forced release, sections downstream of Process inherited a
corrupted scroll state that only showed up on the next scroll interaction,
which made it look like unrelated sections were broken.

If you add any new forced-scroll logic anywhere in the site, route it through
`window.__lenis.scrollTo()` the same way. Test by scrolling all the way
through the affected section and past it, in both directions, not just
scrolling into it once.

## Known editing pitfall (paste, not a code bug)

When pasting multi-line JSX from chat into VS Code on this project, a lone
opening tag on its own line (e.g. `<a` immediately followed by its first prop
on the next line) has been dropped during paste more than once, causing a
"Did you mean `{'>'}`" parser error pointing at the *closing* `>` several
lines later, not the actual missing tag. If that exact error shows up, check
for a missing opening tag above the reported line, don't assume the reported
line number is where the real problem is. Prefer keeping an opening tag and
its first attribute on the same line (`<a href="#contact" className="...">`)
to avoid this entirely.

## Working conventions

- Prefer targeted, minimal edits over full-file rewrites when the change is
  small. For larger structural changes (adding a new scroll-driven section,
  reworking a layout), a full file replacement is fine and often clearer.
- Run `npm run dev`, test in the browser, and confirm before considering a
  change done, this is a visual/animation-heavy project, static analysis
  alone won't catch scroll-timing or Lenis-sync issues.
- If a change touches how GSAP, ScrollTrigger, Observer, or Lenis interact,
  re-read the "Lenis + GSAP sync" section above first.