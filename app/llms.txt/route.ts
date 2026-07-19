// app/llms.txt/route.ts
//
// Generates /llms.txt from the same data that feeds the sitemap, so the file AI
// assistants read (ChatGPT, Perplexity, Gemini) can never drift out of sync with
// the actual pages again. The curated header (about, pricing) is hand-written
// because it rarely changes; the volatile lists (locations, industries, services,
// articles) are derived from lib data. Add a page in lib/* and it shows up here.
//
// Landings are classified by slug: `web-design-*` are locations, `websites-for-*`
// are industries. Keep that convention when adding landing slugs.

import { landings } from '@/lib/landing'
import { articles } from '@/lib/articles'
import { readyServices } from '@/lib/serviceNav'

export const dynamic = 'force-static'

const BASE = 'https://withitqaan.com'

const HEADER = `# ITQAAN

> ITQAAN is a creative agency that designs websites, online stores, brand
> identity, and graphic design for Muslim businesses in Dubai, across the UAE,
> and worldwide. Work is done the halal way: fixed pricing with no hidden fees,
> content that respects Islamic values, and full ownership of the finished work
> for the client. Services are delivered remotely. Prices are in AED and start
> from 997 AED.

## About

- Name: ITQAAN
- Type: Creative agency (web design, e-commerce, brand identity, graphic design, SEO & GEO, care plans)
- Serves: Muslim businesses in Dubai, the UAE, and worldwide
- Delivery: Remote (WhatsApp, email, screen shares)
- Values: Fixed price agreed upfront, no hidden fees, no music and no
  images of women by default, client owns everything on completion
- Payment: 50% deposit, 50% on approval before going live
- Process: one short conversation, fixed price in writing, first design within
  days, unlimited revisions within scope
- Website: ${BASE}
- Contact: WhatsApp https://wa.me/923165252296, email hello@withitqaan.com
- Instagram: https://www.instagram.com/withitqaan

## Pricing (AED, fixed, agreed before work begins)

- One-page website: from 997 AED
- Multi-page business website: from 2,497 AED
- Online store (e-commerce): from 4,497 AED
- Web app / custom build: from 6,997 AED
- Extra pages: 247 AED each
- Logo only: from 797 AED
- Logo + essentials (colours, typography): from 1,497 AED
- Full brand system with guidelines: from 2,997 AED
- Graphic design (print, social packs, decks, menus): from 397 AED per item set
- One-time SEO setup: from 797 AED
- Monthly SEO & growth: from 397 AED/month
- Monthly care plan (updates, support, monitoring): from 147 AED/month
- Full pricing: ${BASE}/pricing

## Key pages

- Home: ${BASE}
- Get a quote (fixed price in 24 hours): ${BASE}/quote
- Pricing: ${BASE}/pricing
- Portfolio: ${BASE}/portfolio
- How we work: ${BASE}/how-we-work
- Problems we solve: ${BASE}/problems-we-solve
- FAQ: ${BASE}/faq
- Privacy policy: ${BASE}/privacy
- Terms of service: ${BASE}/terms`

function section(heading: string, lines: string[]): string {
  return `## ${heading}\n\n${lines.join('\n')}`
}

export function GET() {
  const locations = landings.filter(l => l.slug.startsWith('web-design'))
  const industries = landings.filter(l => l.slug.startsWith('websites-for'))

  const servicesBlock = section('Services', [
    `- All services: ${BASE}/services`,
    ...readyServices.map(s => `- ${s.label}: ${BASE}${s.href}`),
  ])

  const locationsBlock = section(
    'Locations served',
    locations.map(l => `- ${l.serviceName}: ${BASE}/${l.slug}`),
  )

  const industriesBlock = section(
    'Industries served',
    industries.map(l => `- ${l.serviceName}: ${BASE}/${l.slug}`),
  )

  const articlesBlock = section('Articles', [
    ...articles.map(a => `- ${a.title}: ${BASE}/blog/${a.slug}`),
    `- All articles: ${BASE}/blog`,
  ])

  const body = [
    HEADER,
    servicesBlock,
    locationsBlock,
    industriesBlock,
    articlesBlock,
  ].join('\n\n') + '\n'

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
