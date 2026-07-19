import Link from 'next/link'
import type { Metadata } from 'next'
import Footer from '@/components/sections/Footer'
import { articles } from '@/lib/articles'

const BASE = 'https://withitqaan.com'

export const metadata: Metadata = {
  title: 'Blog | Web Design for Muslim Businesses | ITQAAN',
  description:
    'Honest, practical articles on web design, pricing, and growing online for Muslim businesses in Dubai, the UAE, and worldwide.',
  alternates: { canonical: '/blog' },
}

export default function BlogIndex() {
  const sorted = [...articles].sort((a, b) => b.datePublished.localeCompare(a.datePublished))

  // Blog + ItemList schema: tells Google this is a content hub and enumerates
  // every post, so the listing can be understood and surfaced as a set.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${BASE}/blog#blog`,
    name: 'ITQAAN Blog',
    description:
      'Honest, practical articles on web design, pricing, and growing online for Muslim businesses in Dubai, the UAE, and worldwide.',
    url: `${BASE}/blog`,
    inLanguage: 'en',
    publisher: { '@id': `${BASE}/#organization` },
    blogPost: sorted.map(a => ({
      '@type': 'BlogPosting',
      headline: a.title,
      url: `${BASE}/blog/${a.slug}`,
      datePublished: a.datePublished,
      dateModified: a.dateModified,
    })),
  }

  return (
    <main style={{ minHeight: '100svh', background: 'var(--color-void)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-ink-8)', background: 'rgba(2,2,2,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>ITQAAN</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>Creative Agency</span>
          </Link>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-ink-48)', textDecoration: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            Back to site
          </Link>
        </div>
      </header>

      <section style={{ maxWidth: '820px', margin: '0 auto', padding: '72px 32px 120px' }}>
        <style>{`@media (max-width: 600px) { .blog-wrap { padding: 48px 20px 80px !important; } }`}</style>
        <div className="blog-wrap">
          <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
            <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
            Articles
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 20px' }}>
            Practical advice, honestly written.
          </h1>
          <p style={{ fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-48)', margin: '0 0 48px', maxWidth: '520px' }}>
            Straight answers on web design, pricing, and growing online for Muslim businesses in Dubai, the UAE, and worldwide.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sorted.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} style={{ display: 'block', padding: '28px 0', borderTop: '1px solid var(--color-ink-8)', textDecoration: 'none' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: '0 0 10px' }}>
                  {new Date(a.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 2.4vw, 24px)', fontWeight: 600, color: 'var(--color-ink)', margin: '0 0 8px', lineHeight: 1.3 }}>{a.title}</h2>
                <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-ink-48)', margin: 0, maxWidth: '560px' }}>{a.dek}</p>
              </Link>
            ))}
            <div style={{ borderTop: '1px solid var(--color-ink-8)' }} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
