import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://withitqaan.com/sitemap.xml',
    host: 'https://withitqaan.com',
  }
}
