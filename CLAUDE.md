# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project overview

ITQAAN is a single-page static marketing website for a halal creative agency (web design, graphic design, brand identity). UAE-based, founded by Shayan. No framework, no build step — plain HTML, CSS, and vanilla JS.

## Development

No build tools or package manager. To preview:
- Open `index.html` directly in a browser, or
- Use any static server: `npx serve .` or VS Code Live Server

There are no tests, no linting config, and no CI pipeline.

## File structure

```
index.html       — entire page (single file, all sections)
css/style.css    — all styles
js/main.js       — all interactivity (6 self-contained IIFEs)
images/          — hero-bg.png, photo.jpeg, work/*.png, projects/*.png
fonts/           — RoxboroughCF.ttf, DigitalKhattV2.otf
```

## Architecture

**Sections (in order):** Nav → Hero → Ticker → Stats → Services → Work (poster stack) → Websites (preview strip) → Testimonials → About → Contact → Footer

**CSS design tokens** are all in `:root` at the top of `style.css`:
- `--gold` (#d5be60), `--emerald` (#155c29), `--ivory` / `--ivory-mid` / `--ivory-dark`
- `--ink` / `--ink-mid` / `--ink-light`
- `--serif` (RoxboroughCF → Cormorant Garamond fallback), `--sans` (DM Sans)

**Scroll animations:** Add `.reveal` class to any element — `IntersectionObserver` adds `.visible` when it enters the viewport. Set `style="--d:.1s"` on the element to stagger the transition delay.

**JS modules (all in `main.js`):**
1. Reveal on scroll — IntersectionObserver
2. Navbar scroll shadow — adds `.scrolled` class past 40px
3. Mobile nav toggle — hamburger + drawer (`#nav-mobile`)
4. Testimonials carousel — reviews array hardcoded in JS, rendered into two auto-scrolling rows (`#tc-r1`, `#tc-r2`)
5. Poster stack — click to cycle cards, double-click to open lightbox; images from `images/work/`
6. Slide-to-WhatsApp — drag handle in `#contact`; uses pointer events for mouse, touch events for mobile (split to prevent double-fire)

**Responsive breakpoints:** `<1100px` (2-col services), `<900px` (mobile layout — hamburger nav, stacked sections), `<600px` (small phone tweaks)

## Key content locations

- **WhatsApp number:** `923165252296` — appears in multiple `href` attributes across `index.html` and in `main.js` (slide-to-WA IIFE)
- **Testimonials:** hardcoded `reviews` array at the top of the testimonials IIFE in `main.js`
- **Poster stack images:** `images/work/` — referenced in the `posters` array in the poster stack IIFE in `main.js`
- **Live project cards:** hardcoded in `index.html` inside `#websites .preview-strip`
- **Stats (10+, 20+, 100%):** hardcoded in `index.html` inside `#stats`

## Brand constraints

- All CTAs must go to WhatsApp or email — no forms, no backend
- Halal positioning is intentional and core to the brand — do not remove Islamic references or the hadith quote
- Colour palette is fixed; do not introduce colours outside the token set
- `.arabic` class uses the DigitalKhatt font (`fonts/DigitalKhattV2.otf`) — use it for any Arabic text
