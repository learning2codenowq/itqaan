import type { MetadataRoute } from 'next'

const BASE = 'https://withitqaan.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE,            lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/faq`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
