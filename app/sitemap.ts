import type { MetadataRoute } from 'next'
import { landings } from '@/lib/landing'
import { articles } from '@/lib/articles'
import { services } from '@/lib/services'

const BASE = 'https://withitqaan.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core: MetadataRoute.Sitemap = [
    { url: BASE,            lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/how-we-work`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/problems-we-solve`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`,   lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const serviceUrls: MetadataRoute.Sitemap = services.map(s => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: s.slug === 'web-design' ? 0.9 : 0.8,
  }))

  const landingUrls: MetadataRoute.Sitemap = landings.map(l => ({
    url: `${BASE}/${l.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8,
  }))

  const articleUrls: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/blog/${a.slug}`, lastModified: new Date(a.dateModified), changeFrequency: 'monthly', priority: 0.6,
  }))

  return [...core, ...serviceUrls, ...landingUrls, ...articleUrls]
}
