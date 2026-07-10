import Link from 'next/link'
import type { Metadata } from 'next'
import QuoteBuilder from '@/components/quote/QuoteBuilder'
import ScarcityBadge from '@/components/ui/ScarcityBadge'
import { packages, capacity } from '@/lib/quote'

export const metadata: Metadata = {
  title: 'Get a quote, ITQAAN',
  description: 'Tell us what you need and get a fixed-price quote within 24 hours. Web design, brand identity, and graphic design for Muslim businesses.',
  alternates: { canonical: '/quote' },
}

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>
}) {
  const { plan } = await searchParams
  const pkg = plan ? packages.find(p => p.id === plan) : undefined
  const initialPlan = pkg ? { need: pkg.need, choice: pkg.choice } : undefined
  const soldOut = capacity.slotsLeft <= 0
  const nextMonth = capacity.nextAvailable

  return (
    <main style={{ minHeight: '100svh', background: 'var(--color-void)' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-ink-8)', background: 'rgba(2,2,2,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

      {/* Intro + builder */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 32px 120px' }}>
        <style>{`
          @media (max-width: 600px) { .quote-wrap { padding: 40px 20px 80px !important; } }
        `}</style>
        <div className="quote-wrap">
          <ScarcityBadge style={{ marginBottom: '24px' }} />
          <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
            <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
            {soldOut ? 'By application' : 'Build your quote'}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 20px', maxWidth: '640px' }}>
            {soldOut ? 'Apply to work with us.' : 'Tell us what you need.'}
          </h1>
          <p style={{ fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-48)', margin: '0 0 56px', maxWidth: '520px' }}>
            {soldOut
              ? <>We take on a handful of projects at a time so each one gets our full attention, which is why we are fully booked right now. Tell us about yours and see an indicative price. We review new applications as the next intake opens{nextMonth ? <> in {nextMonth}</> : null} and will be in touch, inshaa Allah.</>
              : <>A few quick questions and you'll see a live estimate. We follow up with a fixed price within 24 hours, no obligation.</>}
          </p>

          <QuoteBuilder initialPlan={initialPlan} />
        </div>
      </section>
    </main>
  )
}
