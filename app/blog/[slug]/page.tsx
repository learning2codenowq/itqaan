import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/sections/Footer'
import ProofStrip from '@/components/ui/ProofStrip'
import { articles, getArticle } from '@/lib/articles'
import { AUTHOR, AUTHOR_ID, authorSchemaNode } from '@/lib/author'

const BASE = 'https://withitqaan.com'

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = getArticle(slug)
  if (!a) return {}
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { title: a.metaTitle, description: a.metaDescription, url: `/blog/${a.slug}`, type: 'article' },
  }
}

// Evergreen destinations rotated across articles so link equity spreads to the
// landings (the pages stuck in "Discovered - not indexed"), not just one page.
const EVERGREEN_LINKS = [
  { label: 'Web design in Dubai', href: '/web-design-dubai' },
  { label: 'Websites for Muslim businesses', href: '/websites-for-muslim-businesses' },
  { label: 'Web design across the UAE', href: '/web-design-uae' },
  { label: 'Our web design service', href: '/services/web-design' },
  { label: 'See our pricing', href: '/pricing' },
]

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = getArticle(slug)
  if (!a) notFound()

  // "Related reading": 3 sibling articles (rotated by position so each page shows
  // a different set) + 2 evergreen landing/service links. Auto-derived, so new
  // articles get related links without any per-article config.
  const idx = articles.findIndex(x => x.slug === a.slug)
  const others = articles.filter(x => x.slug !== a.slug)
  const relatedArticles = [0, 1, 2].map(k => others[(idx + k) % others.length])
  const relatedLinks = [
    ...relatedArticles.map(r => ({ label: r.title, href: `/blog/${r.slug}` })),
    EVERGREEN_LINKS[idx % EVERGREEN_LINKS.length],
    EVERGREEN_LINKS[(idx + 1) % EVERGREEN_LINKS.length],
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.metaDescription,
        datePublished: a.datePublished,
        dateModified: a.dateModified,
        inLanguage: 'en',
        image: `${BASE}/blog/${a.slug}/opengraph-image`,
        author: { '@id': AUTHOR_ID },
        publisher: {
          '@type': 'Organization',
          '@id': `${BASE}/#organization`,
          name: 'ITQAAN',
          logo: { '@type': 'ImageObject', url: `${BASE}/og-image.webp` },
        },
        mainEntityOfPage: `${BASE}/blog/${a.slug}`,
        url: `${BASE}/blog/${a.slug}`,
      },
      authorSchemaNode,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
          { '@type': 'ListItem', position: 3, name: a.title, item: `${BASE}/blog/${a.slug}` },
        ],
      },
    ],
  }

  const dateLabel = new Date(a.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <main style={{ minHeight: '100svh', background: 'var(--color-void)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-ink-8)', background: 'rgba(2,2,2,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>ITQAAN</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>Creative Agency</span>
          </Link>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-ink-48)', textDecoration: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            All articles
          </Link>
        </div>
      </header>

      <article style={{ maxWidth: '680px', margin: '0 auto', padding: '72px 32px 40px' }}>
        <style>{`@media (max-width: 600px) { .art-wrap { padding: 48px 20px 32px !important; } }`}</style>
        <div className="art-wrap">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: '0 0 16px' }}>{dateLabel}</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.6vw, 48px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 18px' }}>
            {a.title}
          </h1>
          <p style={{ fontSize: '1.15rem', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-ink-48)', margin: '0 0 28px' }}>{a.dek}</p>

          {/* Author byline (E-E-A-T) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 40px' }}>
            <img src={AUTHOR.image} alt={AUTHOR.name} width={40} height={40} loading="lazy" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-ink-10)' }} />
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-ink)' }}>{AUTHOR.name}</span>
              <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 300, color: 'var(--color-ink-48)', marginTop: '2px' }}>{AUTHOR.role}, ITQAAN</span>
            </div>
          </div>

          {/* Quick answer box (AEO-friendly direct answer) */}
          <div style={{ padding: '24px 26px', borderRadius: '14px', border: '1px solid var(--color-ember-18)', background: 'var(--color-ember-dim)', margin: '0 0 40px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 10px' }}>Quick answer</p>
            <p style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.7, color: 'var(--color-ink)', margin: 0 }}>{a.quickAnswer}</p>
          </div>

          {a.sections.map((s, i) => (
            <section key={i} style={{ marginBottom: '36px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 16px', lineHeight: 1.25 }}>{s.h2}</h2>
              {s.body.map((p, j) => (
                <p key={j} style={{ fontSize: '1.02rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 16px' }}>{p}</p>
              ))}
            </section>
          ))}

          {/* Related reading (internal links for crawl + discovery) */}
          <section style={{ marginTop: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 20px' }}>
              Related reading
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {relatedLinks.map(r => (
                <li key={r.href}>
                  <Link href={r.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '9999px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', color: 'var(--color-ink-72)', fontSize: '0.82rem', fontWeight: 500, textDecoration: 'none' }}>
                    {r.label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* About the author (E-E-A-T) */}
          <aside style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid var(--color-ink-8)', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
            <img src={AUTHOR.image} alt={AUTHOR.name} width={56} height={56} loading="lazy" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-ink-10)', flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 8px' }}>About the author</p>
              <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)', margin: 0 }}>{AUTHOR.fullBio}</p>
            </div>
          </aside>

          {/* Social proof */}
          <ProofStrip />

          {/* CTA */}
          <div style={{ marginTop: '48px', padding: '36px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px' }}>Get your fixed price</h2>
            <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 24px' }}>Build a quote in under a minute. Fixed price within 24 hours, no obligation.</p>
            <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
              Work with us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
