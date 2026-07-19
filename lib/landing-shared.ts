// lib/landing-shared.ts
//
// Types + shared content blocks for the SEO/AEO landing pages. Lives in its own
// module so lib/landing.ts, lib/landing-emirates.ts, and lib/landing-niches.ts
// can all use it without circular imports.

export type LandingSection = { h2: string; body: string[] }
export type LandingFaq = { q: string; a: string }
export type RelatedLink = { label: string; href: string }

export type Landing = {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  intro: string
  sections: LandingSection[]
  faqs: LandingFaq[]
  serviceName: string
  areaServed: string[]
  // ISO date the page copy last changed. Feeds <lastmod> in the sitemap. Set it
  // when you meaningfully edit a page; omit it to inherit the shared fallback.
  dateModified?: string
  // Internal links to sibling pages / articles, for SEO and to help readers and
  // AI assistants discover related intent. Rendered at the foot of the page.
  related?: RelatedLink[]
}

export const VALUES_SECTION: LandingSection = {
  h2: 'Built the halal way, with no compromise on quality',
  body: [
    'Every project comes with a fixed price agreed before we start. No hidden fees, and no surprise invoices at the end.',
    'The work itself respects your values too: no music and no images of women, by default. You get a site that looks premium and that you are comfortable sharing with your community.',
    'When the project is done, you own everything. The design, the code, the domain, and the content are all yours.',
  ],
}
