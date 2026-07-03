'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const guarantees = [
  {
    title: 'Fixed price, no surprises',
    desc: 'The price we agree on is the price you pay. No hidden fees, no scope games.',
    icon: (
      <><path d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5l-8-3z" /><path d="m9 12 2 2 4-4" /></>
    ),
  },
  {
    title: 'Revisions until you are happy',
    desc: 'We keep refining until it feels right to you, not just until it is technically done.',
    icon: (
      <><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></>
    ),
  },
  {
    title: 'You own everything',
    desc: 'Files, code, accounts and logins. It is all handed to you and it is all yours.',
    icon: (
      <><circle cx="7.5" cy="15.5" r="4.5" /><path d="m10.5 12.5 6-6" /><path d="m14 6 4 4" /><path d="m18 10 2-2-4-4-2 2" /></>
    ),
  },
  {
    title: 'Support after launch',
    desc: 'We stay reachable once your site is live. You are never left to figure it out alone.',
    icon: (
      <><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></>
    ),
  },
]

export default function Guarantees() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section id="guarantees" style={{ position: 'relative', padding: '120px 64px', background: 'var(--color-void)', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 900px) { #guarantees { padding: 90px 28px !important; } .grt-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { #guarantees { padding: 72px 24px !important; } .grt-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '64px', right: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(178,213,229,0) 0%, rgba(178,213,229,0.08) 50%, rgba(178,213,229,0) 100%)' }} />

      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '56px', maxWidth: '620px' }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
            <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
            Our guarantees
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: 0 }}>
            What you can expect, every time.
          </h2>
        </div>

        <div className="grt-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {guarantees.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              style={{ padding: '28px 24px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)' }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', border: '1px solid var(--color-ember-18)', background: 'var(--color-ember-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ember)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {g.icon}
                </svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px', lineHeight: 1.25 }}>{g.title}</h3>
              <p style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--color-ink-48)', margin: 0 }}>{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
