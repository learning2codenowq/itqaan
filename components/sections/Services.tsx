'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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

const services = [
  {
    num: '01',
    name: 'Web Design',
    summary: 'Websites built from scratch, fast and conversion-focused.',
    description: 'Every site we build starts from a blank canvas. No templates, no page builders — just clean code shaped around your business. Fast to load, built for mobile, and designed to turn visitors into clients.',
    tags: ['Landing Pages', 'Business Sites', 'WordPress', 'Custom HTML/CSS', 'Mobile First', 'SEO Ready'],
  },
  {
    num: '02',
    name: 'Brand Identity',
    summary: 'Logo, colour, type, and guidelines — your full visual system.',
    description: 'A brand is more than a logo. We build the complete visual system: mark, palette, typography, and brand guidelines that keep everything consistent whether it shows up on a business card or a billboard.',
    tags: ['Logo Design', 'Brand System', 'Guidelines', 'Typography', 'Colour Palette'],
  },
  {
    num: '03',
    name: 'Graphic Design',
    summary: 'Visuals that make your brand look like it means business.',
    description: 'Social media content, print materials, pitch decks, and document design — all consistent with your brand. We make sure every touchpoint your audience sees reflects the quality of what you actually offer.',
    tags: ['Social Media', 'Print', 'Pitch Decks', 'Document Design', 'Posters'],
  },
]

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.1 + index * 0.08 }}
    >
      <div
        style={{ borderTop: '1px solid rgba(245,240,232,0.08)' }}
      >
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            padding: '32px 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '28px', flex: 1, minWidth: 0 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--color-ink-28)', flexShrink: 0 }}>
              {service.num}
            </span>
            <div style={{ minWidth: 0 }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 3vw, 36px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: open ? 'rgba(245,240,232,1)' : 'rgba(245,240,232,0.72)',
                transition: 'color 0.3s ease',
                lineHeight: 1.1,
              }}>
                {service.name}
              </span>
              {!open && (
                <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-ink-28)', marginTop: '4px', fontWeight: 300 }}>
                  {service.summary}
                </span>
              )}
            </div>
          </div>

          {/* Plus / minus icon */}
          <span style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: '1px solid rgba(245,240,232,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'border-color 0.3s ease, transform 0.4s ease',
            transform: open ? 'rotate(45deg)' : 'none',
            borderColor: open ? 'rgba(196,98,45,0.4)' : 'rgba(245,240,232,0.12)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? '#C4622D' : 'rgba(245,240,232,0.5)'} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_EXPO }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingBottom: '36px', paddingLeft: 'calc(0.65rem * 0 + 28px + 28px)' }}>
                <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', maxWidth: '560px', margin: '0 0 20px' }}>
                  {service.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {service.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '5px 14px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(245,240,232,0.1)',
                      color: 'var(--color-ink-48)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px 0px' })

  return (
    <section
      id="services"
      style={{ position: 'relative', padding: '140px 64px', background: 'var(--color-void)', overflow: 'hidden' }}
    >
      <style>{`
        @media (max-width: 900px) {
          #services { padding: 100px 28px !important; }
          .svc-header { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
        }
        @media (max-width: 600px) {
          #services { padding: 80px 24px !important; }
        }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(55% 55% at 80% 10%, rgba(245,240,232,0.04) 0%, rgba(245,240,232,0) 70%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '64px', right: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(245,240,232,0) 0%, rgba(245,240,232,0.08) 50%, rgba(245,240,232,0) 100%)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="svc-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '72px', gap: '32px' }}>
          <div>
            <Reveal style={{ marginBottom: '20px' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: 0 }}>
                <span aria-hidden="true" style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)', flexShrink: 0 }} />
                Services
              </p>
            </Reveal>
            <h2 ref={headingRef} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: 0 }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <motion.div initial={{ y: '110%' }} animate={headingInView ? { y: 0 } : {}} transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.05 }}>
                  Three things,
                </motion.div>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <motion.div initial={{ y: '110%' }} animate={headingInView ? { y: 0 } : {}} transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.18 }}>
                  done properly.
                </motion.div>
              </div>
            </h2>
          </div>

          <Reveal delay={0.2} style={{ maxWidth: '280px' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0, textAlign: 'right' }}>
              Each service is a complete offering — not a starting point for upsells.
            </p>
          </Reveal>
        </div>

        {/* Service rows */}
        <div>
          {services.map((s, i) => (
            <ServiceRow key={s.num} service={s} index={i} />
          ))}
          <div style={{ height: '1px', background: 'rgba(245,240,232,0.08)' }} />
        </div>

      </div>
    </section>
  )
}