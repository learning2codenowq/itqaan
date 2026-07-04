import type { MetadataRoute } from 'next'
import { landings } from '@/lib/landing'
import { articles } from '@/lib/articles'

const BASE = 'https://withitqaan.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core: MetadataRoute.Sitemap = [
    { url: BASE,            lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/problems-we-solve`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
  ]

  const landingUrls: MetadataRoute.Sitemap = landings.map(l => ({
    url: `${BASE}/${l.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8,
  }))

  const articleUrls: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/blog/${a.slug}`, lastModified: new Date(a.dateModified), changeFrequency: 'monthly', priority: 0.6,
  }))

  return [...core, ...landingUrls, ...articleUrls]
}
