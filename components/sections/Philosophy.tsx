'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE_EXPO = [0.22, 1, 0.36, 1] as const

function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE_EXPO, delay }} style={style}>
      {children}
    </motion.div>
  )
}

const beliefs = [
  {
    num: '01',
    title: 'Itqaan as standard',
    body: 'The Prophet ﷺ said Allah loves that when one of you does something, he does it with itqaan. That is not inspiration — it is the brief.',
  },
  {
    num: '02',
    title: 'Craft over convenience',
    body: 'Templates exist because speed is easy. We build from scratch because the difference between good and excellent lives in the details no one is asked to notice.',
  },
  {
    num: '03',
    title: 'Halal by design',
    body: 'Every project we take serves businesses we would be proud to recommend. Our work is an amanah — a trust — and we treat it as one.',
  },
  {
    num: '04',
    title: 'Your brand, your asset',
    body: 'We build things you own completely. No lock-in, no dependency on us to update a button. Genuine ownership is part of what we deliver.',
  },
]

export default function Philosophy() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px 0px' })

  return (
    <section
      id="philosophy"
      style={{ position: 'relative', padding: '140px 64px', background: 'var(--color-void)', overflow: 'hidden' }}
    >
      <style>{`
        @media (max-width: 900px) {
          #philosophy { padding: 100px 28px !important; }
          .phil-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        @media (max-width: 600px) {
          #philosophy { padding: 80px 24px !important; }
        }
        .belief-row:hover .belief-num { color: var(--color-ember) !important; }
        .belief-row:hover .belief-title { color: rgba(245,240,232,1) !important; }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(60% 60% at 20% 10%, rgba(196,98,45,0.06) 0%, rgba(196,98,45,0) 70%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '64px', right: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(245,240,232,0) 0%, rgba(245,240,232,0.08) 50%, rgba(245,240,232,0) 100%)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="phil-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '96px', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <Reveal style={{ marginBottom: '28px' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: 0 }}>
                <span aria-hidden="true" style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)', flexShrink: 0 }} />
                Philosophy
              </p>
            </Reveal>

            <h2 ref={headingRef} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 28px' }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <motion.div initial={{ y: '110%' }} animate={headingInView ? { y: 0 } : {}} transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.05 }}>
                  Craft is not
                </motion.div>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <motion.div initial={{ y: '110%' }} animate={headingInView ? { y: 0 } : {}} transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.18 }}>
                  optional.
                </motion.div>
              </div>
            </h2>

            <Reveal delay={0.2}>
              <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', maxWidth: '380px', margin: 0 }}>
                Most agencies treat quality as a selling point. We treat it as an
                obligation. The name ITQAAN comes from a hadith about doing your
                work to the highest standard — and that is the only standard we
                build to.
              </p>
            </Reveal>
          </div>

          {/* Right — belief rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {beliefs.map((b, i) => (
              <Reveal key={b.num} delay={0.1 + i * 0.08}>
                <div
                  className="belief-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr',
                    gap: '20px',
                    padding: '28px 0',
                    borderTop: '1px solid rgba(245,240,232,0.08)',
                    cursor: 'default',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  <span
                    className="belief-num"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--color-ink-28)', paddingTop: '3px', transition: 'color 0.3s ease' }}
                  >
                    {b.num}
                  </span>
                  <div>
                    <h3
                      className="belief-title"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--color-ink-72)', margin: '0 0 8px', transition: 'color 0.3s ease' }}
                    >
                      {b.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--color-ink-48)', margin: 0 }}>
                      {b.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            {/* closing border */}
            <div style={{ height: '1px', background: 'rgba(245,240,232,0.08)' }} />
          </div>

        </div>
      </div>
    </section>
  )
}