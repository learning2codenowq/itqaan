'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/lib/projects'

const EASE = [0.22, 1, 0.36, 1] as const

/*
 * Homepage social proof: real client testimonials from lib/projects.ts,
 * rendered right before Packages so trust peaks at the pricing moment.
 * Framer useInView reveal, same treatment as Packages/Guarantees (no GSAP).
 */
export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const items = projects.filter(p => p.testimonial)

  return (
    <section id="testimonials" style={{ position: 'relative', padding: '120px 64px', background: 'var(--color-void)', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 900px) { #testimonials { padding: 90px 28px !important; } .tst-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { #testimonials { padding: 72px 24px !important; } .tst-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '64px', right: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(178,213,229,0) 0%, rgba(178,213,229,0.08) 50%, rgba(178,213,229,0) 100%)' }} />

      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '56px', maxWidth: '620px' }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
            <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
            What clients say
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: 0 }}>
            In their words, alhamdulillah.
          </h2>
        </div>

        <div className="tst-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {items.map((p, i) => (
            <motion.figure
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '18px', padding: '28px 24px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-ember-18)" aria-hidden="true">
                <path d="M10 8c-3.3 0-6 2.7-6 6v2h5v-6H6.5C6.8 8.9 8.2 8 10 8zm10 0c-3.3 0-6 2.7-6 6v2h5v-6h-2.5c.3-1.1 1.7-2 3.5-2z" transform="translate(0,1)" />
              </svg>
              <blockquote style={{ margin: 0, fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)' }}>
                &ldquo;{p.testimonial!.quote}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: 'auto' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink)' }}>{p.testimonial!.author}</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', marginTop: '4px' }}>{p.testimonial!.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
