import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import ScarcityBadge from '@/components/ui/ScarcityBadge'
import { projects } from '@/lib/projects'

const BASE = 'https://withitqaan.com'

export const metadata: Metadata = {
  title: 'Portfolio | Websites Built for Muslim Businesses | ITQAAN',
  description:
    'Recent websites built by ITQAAN for Muslim businesses: marble companies, Quran academies, tutors, menswear stores, and more. Custom design, fixed halal prices, from 997 AED.',
  alternates: { canonical: '/portfolio' },
}

export default function PortfolioPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'ITQAAN portfolio',
        url: `${BASE}/portfolio`,
        description: 'Websites built by ITQAAN for Muslim businesses in Dubai, the UAE, and worldwide.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${BASE}/portfolio` },
        ],
      },
    ],
  }

  return (
    <main style={{ minHeight: '100svh', background: 'var(--color-void)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <style>{`
        .pf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px 24px; }
        @media (max-width: 700px) {
          .pf-grid { grid-template-columns: 1fr; }
          .pf-wrap { padding: 48px 20px 32px !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-ink-8)', background: 'rgba(2,2,2,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>ITQAAN</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>Creative Agency</span>
          </Link>
          <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            Get a quote
          </Link>
        </div>
      </header>

      <section className="pf-wrap" style={{ maxWidth: '1040px', margin: '0 auto', padding: '72px 32px 40px' }}>
        <ScarcityBadge style={{ marginBottom: '24px' }} />
        <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
          <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
          Portfolio
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 24px', maxWidth: '760px' }}>
          Built for businesses like yours
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)', margin: '0 0 56px', maxWidth: '700px' }}>
          Recent projects for Muslim businesses: each one custom designed, mobile-first, and delivered at a fixed price agreed upfront.
        </p>

        <div className="pf-grid">
          {projects.map(p => (
            <div key={p.slug}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-ink-10)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/projects/${p.slug}.webp`}
                  alt={`${p.name} website by ITQAAN`}
                  loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', marginTop: '14px' }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-ink)' }}>{p.name}</p>
                <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', whiteSpace: 'nowrap' }}>{p.category}</p>
              </div>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-ember)', textDecoration: 'none' }}>
                  Visit live site
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              )}
              {p.testimonial && (
                <figure style={{ margin: '14px 0 0', padding: '18px 20px', borderRadius: '12px', border: '1px solid var(--color-ink-8)', background: 'var(--color-ink-3)' }}>
                  <blockquote style={{ margin: 0, fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--color-ink-72)' }}>
                    &ldquo;{p.testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption style={{ marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>
                    {p.testimonial.role}
                  </figcaption>
                </figure>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '72px', padding: '40px 36px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px' }}>Want yours here next?</h2>
          <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 24px' }}>Build your quote in under a minute and get a fixed price within 24 hours.</p>
          <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
            Get a quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
