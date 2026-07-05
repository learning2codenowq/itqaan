import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import ScarcityBadge from '@/components/ui/ScarcityBadge'
import { serviceNav } from '@/lib/serviceNav'
import { landings } from '@/lib/landing'
import { siteTypes, brandScopes, graphicItems, seoPlans, carePlan, formatPrice } from '@/lib/quote'

const BASE = 'https://withitqaan.com'

export const metadata: Metadata = {
  title: 'Web Design & Creative Services in Dubai | ITQAAN',
  description:
    'Web design, e-commerce, branding, SEO and GEO, graphic design, and care plans for Muslim businesses in Dubai, the UAE, and worldwide. Fixed halal prices, no hidden fees.',
  alternates: { canonical: '/services' },
}

/* Starting price per service, pulled live from lib/quote.ts. */
function fromPrice(slug: string): string | null {
  switch (slug) {
    case 'web-design': {
      const p = siteTypes.find(s => s.id === 'one-page')?.price
      return p ? `From ${formatPrice(p)}` : null
    }
    case 'ecommerce': {
      const p = siteTypes.find(s => s.id === 'store')?.price
      return p ? `From ${formatPrice(p)}` : null
    }
    case 'branding': {
      const p = brandScopes.find(s => s.id === 'logo')?.price
      return p ? `From ${formatPrice(p)}` : null
    }
    case 'seo-geo': {
      const p = seoPlans.find(s => s.id === 'setup')?.price
      return p ? `From ${formatPrice(p)}` : null
    }
    case 'graphic-design': {
      const p = Math.min(...graphicItems.map(g => g.price ?? Infinity))
      return Number.isFinite(p) ? `From ${formatPrice(p)}` : null
    }
    case 'care-plans':
      return carePlan.monthly ? `From ${formatPrice(carePlan.monthly)} / month` : null
    default:
      return null
  }
}

export default function ServicesHub() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'ITQAAN services',
        itemListElement: serviceNav.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.label,
          url: s.ready ? `${BASE}${s.href}` : `${BASE}/quote`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/services` },
        ],
      },
    ],
  }

  return (
    <main style={{ minHeight: '100svh', background: 'var(--color-void)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <style>{`
        .svcs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .svcs-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) {
          .svcs-grid { grid-template-columns: 1fr; }
          .svcs-wrap { padding: 48px 20px 32px !important; }
        }
        .svcs-card {
          display: flex; flex-direction: column; padding: 28px 24px; border-radius: 16px;
          border: 1px solid var(--color-ink-10); background: var(--color-ink-3);
          text-decoration: none; transition: border-color .25s ease, background .25s ease;
        }
        .svcs-card:hover { border-color: var(--color-ember-18); background: var(--color-ink-5); }
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

      <section className="svcs-wrap" style={{ maxWidth: '1040px', margin: '0 auto', padding: '72px 32px 40px' }}>
        <ScarcityBadge style={{ marginBottom: '24px' }} />
        <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
          <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
          Our services
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 24px', maxWidth: '760px' }}>
          Web design and creative services for Muslim businesses
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)', margin: '0 0 48px', maxWidth: '700px' }}>
          Everything your business needs to look established online and win customers, in Dubai, across the UAE, and worldwide. Fixed prices agreed before we start, no hidden fees, and you own everything at the end.
        </p>

        <div className="svcs-grid">
          {serviceNav.map(s => {
            const price = fromPrice(s.slug)
            const href = s.ready ? s.href : '/quote'
            return (
              <Link key={s.slug} href={href} className="svcs-card">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 8px' }}>{s.label}</h2>
                <p style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-ink-48)', margin: '0 0 20px' }}>{s.blurb}</p>
                <p style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  {price && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--color-ink-72)' }}>{price}</span>
                  )}
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-ember)' }}>
                    {s.ready ? 'Learn more' : 'Get a quote'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
                  </span>
                </p>
              </Link>
            )
          })}
        </div>

        {/* Who we build for + where we work (internal links to landing pages) */}
        <section style={{ marginTop: '72px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 10px' }}>
            Who we build for
          </h2>
          <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-48)', margin: '0 0 20px', maxWidth: '640px' }}>
            Every industry buys differently. These pages explain how we approach yours.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {landings.filter(l => l.slug.startsWith('websites-for-')).map(l => (
              <li key={l.slug}>
                <Link href={`/${l.slug}`} style={{ display: 'inline-flex', padding: '9px 16px', borderRadius: '9999px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', color: 'var(--color-ink-72)', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}>
                  {l.eyebrow.replace(/^For /, '')}
                </Link>
              </li>
            ))}
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '40px 0 10px' }}>
            Where we work
          </h2>
          <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-48)', margin: '0 0 20px', maxWidth: '640px' }}>
            Serving every emirate remotely, and Muslim businesses worldwide.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {landings.filter(l => l.slug.startsWith('web-design-')).map(l => (
              <li key={l.slug}>
                <Link href={`/${l.slug}`} style={{ display: 'inline-flex', padding: '9px 16px', borderRadius: '9999px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', color: 'var(--color-ink-72)', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}>
                  {l.eyebrow.replace(/^Web design, /, '')}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Bottom CTA */}
        <div style={{ marginTop: '64px', padding: '40px 36px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px' }}>Not sure what you need?</h2>
          <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 24px' }}>Answer a few questions in the quote builder and get a fixed price within 24 hours. No pressure, no obligations.</p>
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
