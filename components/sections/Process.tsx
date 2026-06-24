'use client'

import { useRef, useState } from 'react'
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

const steps = [
  {
    num: '01',
    title: 'Diagnose',
    body: 'We start by understanding your business, your audience, and what you actually need — not what you think you need. A short discovery call is all it takes.',
  },
  {
    num: '02',
    title: 'Propose',
    body: 'You get a clear scope, timeline, and fixed price. No hourly rates, no vague estimates — just an honest proposal you can say yes or no to.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'We build with regular check-ins so you always know where things stand. No disappearing for weeks, no surprises at the end.',
  },
  {
    num: '04',
    title: 'Deliver',
    body: 'You receive everything you own — files, code, accounts, logins. We walk you through it and stay available for questions after handover.',
  },
]

function StepRow({ step, index }: { step: typeof steps[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.1 + index * 0.09 }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '48px 1fr',
          gap: '24px',
          padding: '36px 0',
          borderTop: '1px solid rgba(245,240,232,0.08)',
          cursor: 'default',
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Number with animated line */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', paddingTop: '4px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            color: hovered ? 'var(--color-ember)' : 'var(--color-ink-28)',
            transition: 'color 0.3s ease',
          }}>
            {step.num}
          </span>
          {/* Animated connector dot */}
          <span style={{
            display: 'block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: hovered ? 'var(--color-ember)' : 'rgba(245,240,232,0.12)',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
            boxShadow: hovered ? '0 0 12px rgba(196,98,45,0.5)' : 'none',
          }} />
        </div>

        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 2.5vw, 32px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: hovered ? 'rgba(245,240,232,1)' : 'rgba(245,240,232,0.72)',
            transition: 'color 0.3s ease',
            margin: '0 0 12px',
            lineHeight: 1.1,
          }}>
            {step.title}
          </h3>
          <p style={{
            fontSize: '0.925rem',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'var(--color-ink-48)',
            margin: 0,
            maxWidth: '520px',
          }}>
            {step.body}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px 0px' })

  return (
    <section
      id="process"
      style={{ position: 'relative', padding: '140px 64px', background: 'var(--color-void)', overflow: 'hidden' }}
    >
      <style>{`
        @media (max-width: 900px) {
          #process { padding: 100px 28px !important; }
          .process-layout { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        @media (max-width: 600px) {
          #process { padding: 80px 24px !important; }
        }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(50% 50% at 90% 50%, rgba(245,240,232,0.03) 0%, rgba(245,240,232,0) 70%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '64px', right: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(245,240,232,0) 0%, rgba(245,240,232,0.08) 50%, rgba(245,240,232,0) 100%)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="process-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '96px', alignItems: 'start' }}>

          {/* Left — sticky label */}
          <div style={{ position: 'sticky', top: '120px' }}>
            <Reveal style={{ marginBottom: '28px' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: 0 }}>
                <span aria-hidden="true" style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)', flexShrink: 0 }} />
                The Method
              </p>
            </Reveal>

            <h2 ref={headingRef} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 24px' }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <motion.div initial={{ y: '110%' }} animate={headingInView ? { y: 0 } : {}} transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.05 }}>
                  A precise process.
                </motion.div>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <motion.div initial={{ y: '110%' }} animate={headingInView ? { y: 0 } : {}} transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.18 }}>
                  Every time.
                </motion.div>
              </div>
            </h2>

            <Reveal delay={0.2}>
              <p style={{ fontSize: '0.925rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0, maxWidth: '320px' }}>
                The same four steps behind every project. No reinventing the wheel,
                no chaos, no surprises — just disciplined execution from start to finish.
              </p>
            </Reveal>
          </div>

          {/* Right — steps */}
          <div>
            {steps.map((s, i) => (
              <StepRow key={s.num} step={s} index={i} />
            ))}
            <div style={{ height: '1px', background: 'rgba(245,240,232,0.08)' }} />
          </div>

        </div>
      </div>
    </section>
  )
}