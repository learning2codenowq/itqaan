'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { problems } from '@/lib/problems'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Problems() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section id="problems" style={{ position: 'relative', padding: '120px 64px', background: 'var(--color-void)', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 900px) { #problems { padding: 90px 28px !important; } .prb-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { #problems { padding: 72px 24px !important; } }
        .prb-card { padding: 28px 26px; border-radius: 16px; border: 1px solid var(--color-ink-10); background: var(--color-ink-3); transition: border-color 0.25s ease, background 0.25s ease; }
        .prb-card:hover { border-color: var(--color-ink-28); background: var(--color-ink-5); }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '64px', right: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(178,213,229,0) 0%, rgba(178,213,229,0.08) 50%, rgba(178,213,229,0) 100%)' }} />

      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '56px', maxWidth: '680px' }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
            <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
            Problems we solve
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 20px' }}>
            Somewhere out there, a client just chose your competitor. Here is why...
          </h2>
          <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--color-ink-48)', margin: 0, maxWidth: '560px' }}>
            Most Muslim business owners we meet are stuck on the same handful of problems. Here is what we hear most often, and how we put it right.
          </p>
        </div>

        <div className="prb-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {problems.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.06 }}
              className="prb-card"
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ember)', margin: '0 0 16px' }}>{p.tag}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.08rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--color-ink)', margin: '0 0 14px' }}>
                &ldquo;{p.pain}&rdquo;
              </p>
              <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)', margin: '0 0 14px' }}>
                <span style={{ color: 'var(--color-ember)', fontWeight: 500 }}>Our fix. </span>
                {p.fix}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link href="/problems-we-solve" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '9999px', border: '1px solid var(--color-ink-18)', color: 'var(--color-ink)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            See how we solve each one
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
          </Link>
          <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            Work with us
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
