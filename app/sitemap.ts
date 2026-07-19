import type { MetadataRoute } from 'next'
import { landings } from '@/lib/landing'
import { articles } from '@/lib/articles'
import { services } from '@/lib/services'

const BASE = 'https://withitqaan.com'

// Stable content-update dates. Google learns to distrust <lastmod> when it moves
// on every deploy, so we pin real dates here and bump them only when the copy for
// that group actually changes. Articles and landings can carry their own date;
// these are the fallbacks for pages that don't.
const SITE_UPDATED = new Date('2026-07-10')      // core + service pillar pages
const LANDINGS_UPDATED = new Date('2026-07-10')  // landings without their own dateModified

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: BASE,            lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/quote`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/portfolio`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/how-we-work`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/problems-we-solve`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`,   lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,  lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`,   lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const serviceUrls: MetadataRoute.Sitemap = services.map(s => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: s.slug === 'web-design' ? 0.9 : 0.8,
  }))

  const landingUrls: MetadataRoute.Sitemap = landings.map(l => ({
    url: `${BASE}/${l.slug}`,
    lastModified: l.dateModified ? new Date(l.dateModified) : LANDINGS_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const articleUrls: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/blog/${a.slug}`, lastModified: new Date(a.dateModified), changeFrequency: 'monthly', priority: 0.6,
  }))

  return [...core, ...serviceUrls, ...landingUrls, ...articleUrls]
}
