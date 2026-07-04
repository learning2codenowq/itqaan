import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import ScarcityBadge from '@/components/ui/ScarcityBadge'
import { problems, problemsPage } from '@/lib/problems'

const BASE = 'https://withitqaan.com'

export const metadata: Metadata = {
  title: problemsPage.metaTitle,
  description: problemsPage.metaDescription,
  alternates: { canonical: '/problems-we-solve' },
  openGraph: { title: problemsPage.metaTitle, description: problemsPage.metaDescription, url: '/problems-we-solve' },
}

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: problemsPage.h1, item: `${BASE}/${problemsPage.slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: problemsPage.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <main style={{ minHeight: '100svh', background: 'var(--color-void)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-ink-8)', background: 'rgba(2,2,2,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>ITQAAN</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>Creative Agency</span>
          </Link>
          <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            Get a quote
          </Link>
        </div>
      </header>

      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 32px 40px' }}>
        <style>{`@media (max-width: 600px) { .prbp-wrap { padding: 48px 20px 32px !important; } }`}</style>
        <div className="prbp-wrap">
          <ScarcityBadge style={{ marginBottom: '24px' }} />
          <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
            <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
            {problemsPage.eyebrow}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 24px' }}>
            {problemsPage.h1}
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)', margin: '0 0 20px' }}>
            {problemsPage.intro}
          </p>

          <div style={{ marginTop: '28px' }}>
            <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
              Get your fixed price
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
            </Link>
          </div>

          {/* Problems, one block each: pain, cost, fix */}
          {problems.map(p => (
            <section key={p.id} id={p.id} style={{ marginTop: '56px', scrollMarginTop: '90px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ember)', margin: '0 0 14px' }}>{p.tag}</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 18px', lineHeight: 1.25 }}>
                &ldquo;{p.pain}&rdquo;
              </h2>
              <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 16px' }}>
                <span style={{ color: 'var(--color-ink-72)', fontWeight: 500 }}>What it costs you. </span>
                {p.cost}
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0 }}>
                <span style={{ color: 'var(--color-ember)', fontWeight: 500 }}>How we fix it. </span>
                {p.fix}
              </p>
            </section>
          ))}

          {/* FAQ (visible for AEO) */}
          <section style={{ marginTop: '64px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 28px' }}>
              Common questions
            </h2>
            {problemsPage.faqs.map((f, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--color-ink-8)', padding: '24px 0' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-ink)', margin: '0 0 10px' }}>{f.q}</h3>
                <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--color-ink-48)', margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </section>

          {/* Bottom CTA */}
          <div style={{ marginTop: '56px', padding: '36px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px' }}>Let us fix yours.</h2>
            <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 24px' }}>Build your quote in under a minute and get a fixed price within 24 hours. No payment, no obligation.</p>
            <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
              Get a quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
