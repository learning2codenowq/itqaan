// app/blog/[slug]/opengraph-image.tsx
//
// Generates a unique, branded Open Graph image per article at build time, so
// each post has its own social card and its own BlogPosting schema image instead
// of every article sharing the generic /og-image.webp. Next auto-wires the output
// into <meta property="og:image"> / twitter:image for the route.

import { ImageResponse } from 'next/og'
import { getArticle, articles } from '@/lib/articles'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'ITQAAN article'

// Pre-render one image per known article.
export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

// Onyx + Candy Blue, matching the site palette (ImageResponse needs literal
// colors, not the CSS var tokens).
const VOID = '#020202'
const INK = '#B2D5E5'
const INK_DIM = 'rgba(178,213,229,0.55)'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = getArticle(slug)
  const title = a?.title ?? 'ITQAAN'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `radial-gradient(120% 120% at 50% 0%, rgba(178,213,229,0.10) 0%, ${VOID} 55%)`,
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
          <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: 6, color: INK }}>ITQAAN</span>
          <span style={{ fontSize: 20, letterSpacing: 5, color: INK_DIM, textTransform: 'uppercase' }}>
            Creative Agency
          </span>
        </div>

        <div
          style={{
            fontSize: title.length > 60 ? 62 : 76,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: INK,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: INK }} />
          <span style={{ fontSize: 26, color: INK_DIM }}>
            Websites for Muslim businesses in Dubai and the UAE, from 997 AED
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
