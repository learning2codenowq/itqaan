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

const plans = [
  {
    label: 'Project',
    badge: 'One-time',
    headline: 'One project, done properly.',
    description: 'A fixed scope, fixed price engagement. You brief us, we build it, you own everything at the end. Best for clients who know what they need.',
    features: [
      'Fixed scope and fixed price',
      'Regular progress check-ins',
      'Revisions included',
      'Full ownership on delivery',
      'Post-delivery support window',
    ],
    cta: 'Start a project',
    href: '#contact',
    featured: false,
  },
  {
    label: 'Retainer',
    badge: 'Recommended',
    headline: 'Ongoing design, as a partner.',
    description: 'Monthly design support for businesses that need consistent output. A set number of hours each month, no briefing a new agency every time.',
    features: [
      'Dedicated monthly hours',
      'Priority turnaround',
      'Design and development both covered',
      'Brand consistency guaranteed',
      'Cancel any time',
    ],
    cta: 'Discuss retainer',
    href: '#contact',
    featured: true,
  },
]

function PricingCard({ plan, delay }: { plan: typeof plans[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE_EXPO, delay }}
      style={{ height: '100%' }}
    >
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px',
        borderRadius: '8px',
        border: plan.featured ? '1px solid rgba(178,213,229,0.18)' : '1px solid rgba(178,213,229,0.08)',
        background: plan.featured ? 'rgba(178,213,229,0.05)' : 'rgba(178,213,229,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top shimmer line */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: plan.featured
            ? 'linear-gradient(90deg, rgba(178,213,229,0) 0%, rgba(178,213,229,0.28) 50%, rgba(178,213,229,0) 100%)'
            : 'linear-gradient(90deg, rgba(178,213,229,0) 0%, rgba(178,213,229,0.1) 50%, rgba(178,213,229,0) 100%)',
        }} />

        {/* Radial glow for featured */}
        {plan.featured && (
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(80% 80% at 80% 10%, rgba(178,213,229,0.07) 0%, rgba(178,213,229,0) 70%)',
          }} />
        )}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-48)' }}>
            {plan.label}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '5px 12px',
            borderRadius: '9999px',
            border: plan.featured ? '1px solid rgba(178,213,229,0.2)' : '1px solid rgba(178,213,229,0.1)',
            color: plan.featured ? 'var(--color-ink)' : 'var(--color-ink-48)',
          }}>
            {plan.badge}
          </span>
        </div>

        {/* Headline */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(20px, 2vw, 26px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
          margin: '0 0 16px',
          lineHeight: 1.15,
        }}>
          {plan.headline}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 32px' }}>
          {plan.description}
        </p>

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(178,213,229,0.08)', paddingTop: '28px', flex: 1 }}>
          {plan.features.map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.875rem', color: 'var(--color-ink-72)', fontWeight: 300 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href={plan.href}
            className={plan.featured ? 'pricing-cta-primary' : 'pricing-cta-secondary'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              textDecoration: 'none',
              transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              background: plan.featured ? 'var(--color-ink)' : 'transparent',
              color: plan.featured ? 'var(--color-void)' : 'var(--color-ink-72)',
              border: plan.featured ? 'none' : '1px solid rgba(178,213,229,0.12)',
            }}
          >
            {plan.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
            </svg>
          </a>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', textAlign: 'center', margin: 0 }}>
            Pricing will be evaluated after audit or discussion
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px 0px' })

  return (
    <section
      id="pricing"
      style={{ position: 'relative', padding: '140px 64px', background: 'var(--color-void)', overflow: 'hidden' }}
    >
      <style>{`
        @media (max-width: 900px) {
          #pricing { padding: 100px 28px !important; }
          .pricing-cards { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          #pricing { padding: 80px 24px !important; }
        }
        .pricing-cta-primary:hover { box-shadow: 0 8px 40px rgba(178,213,229,0.18); }
        .pricing-cta-secondary:hover {
          border-color: rgba(178,213,229,0.24) !important;
          color: rgba(178,213,229,1) !important;
        }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(60% 60% at 50% 0%, rgba(178,213,229,0.04) 0%, rgba(178,213,229,0) 70%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '64px', right: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(178,213,229,0) 0%, rgba(178,213,229,0.08) 50%, rgba(178,213,229,0) 100%)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: '72px' }}>
          <Reveal style={{ marginBottom: '20px' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: 0 }}>
              <span aria-hidden="true" style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)', flexShrink: 0 }} />
              Pricing
            </p>
          </Reveal>

          <h2 ref={headingRef} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 20px' }}>
            <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
              <motion.div initial={{ y: '110%' }} animate={headingInView ? { y: 0 } : {}} transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.05 }}>
                Two ways to work together.
              </motion.div>
            </div>
          </h2>

          <Reveal delay={0.2}>
            <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0 }}>
              Every engagement is scoped to your situation. These are the two
              structures — pick the one that fits and we will work out the details on a call.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div
          className="pricing-cards"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'stretch' }}
        >
          {plans.map((plan, i) => (
            <PricingCard key={plan.label} plan={plan} delay={0.1 + i * 0.1} />
          ))}
        </div>

        {/* Footer note */}
        <Reveal delay={0.3} style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: 0 }}>
            We take a limited number of partners at a time
          </p>
        </Reveal>

      </div>
    </section>
  )
}