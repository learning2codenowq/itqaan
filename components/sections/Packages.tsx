'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { packages, formatPrice } from '@/lib/quote'
import ScarcityBadge from '@/components/ui/ScarcityBadge'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Packages() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section id="packages" style={{ position: 'relative', padding: '140px 64px', background: 'var(--color-void)', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 900px) { #packages { padding: 100px 28px !important; } .pkg-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { #packages { padding: 80px 24px !important; } }
        .pkg-card { display: flex; flex-direction: column; padding: 32px 28px; border-radius: 16px; border: 1px solid var(--color-ink-10); background: var(--color-ink-3); transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease; }
        .pkg-card:hover { border-color: var(--color-ink-28); transform: translateY(-4px); background: var(--color-ink-5); }
        .pkg-card.pop { border-color: var(--color-ember); background: var(--color-ember-dim); }
        .pkg-cta { margin-top: auto; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 20px; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; text-decoration: none; transition: box-shadow 0.3s ease, border-color 0.25s ease, color 0.25s ease; }
        .pkg-cta-solid { background: var(--color-ink); color: var(--color-void); }
        .pkg-cta-solid:hover { box-shadow: 0 8px 32px rgba(178,213,229,0.16); }
        .pkg-cta-ghost { border: 1px solid var(--color-ink-18); color: var(--color-ink); }
        .pkg-cta-ghost:hover { border-color: var(--color-ember); color: var(--color-ember); }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '64px', right: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(178,213,229,0) 0%, rgba(178,213,229,0.08) 50%, rgba(178,213,229,0) 100%)' }} />

      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', marginBottom: '64px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
              <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
              Packages
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 20px' }}>
              Transparent Pricing.
            </h2>
            <ScarcityBadge />
          </div>
          <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0, maxWidth: '300px' }}>
            Fixed starting prices, confirmed in writing before we begin. Pick a package or build a custom quote.
          </p>
        </div>

        <div className="pkg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {packages.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className={`pkg-card ${p.popular ? 'pop' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-ink)' }}>{p.name}</span>
                {p.popular && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ember)', border: '1px solid var(--color-ember-18)', borderRadius: '9999px', padding: '3px 8px' }}>Popular</span>}
              </div>

              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-ink-48)' }}>from </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>{formatPrice(p.price)}</span>
              </div>
              {p.care && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-ink-28)', margin: '0 0 18px' }}>+ {formatPrice(p.care)}/mo care (optional)</p>}
              {!p.care && <div style={{ height: '18px' }} />}

              <p style={{ fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-ink-48)', margin: '0 0 20px' }}>{p.desc}</p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.82rem', color: 'var(--color-ink-72)', fontWeight: 300 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-ember)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }}><path d="M20 6 9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={`/quote?plan=${p.id}`} className={`pkg-cta ${p.popular ? 'pkg-cta-solid' : 'pkg-cta-ghost'}`}>
                Start with {p.name}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 16px' }}>
            Not sure which fits? Build a quote in under a minute.
          </p>
          <Link href="/quote" className="pkg-cta pkg-cta-solid" style={{ display: 'inline-flex' }}>
            Build a custom quote
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
