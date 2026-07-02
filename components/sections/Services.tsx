'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE_EXPO = [0.22, 1, 0.36, 1] as const

const services = [
  {
    num: '01',
    name: 'Web Design',
    summary: 'Websites built from scratch, fast and conversion-focused.',
    description: 'Every site we build starts from a blank canvas. No templates, no page builders, just clean code shaped around your business. Fast to load, built for mobile, and designed to turn visitors into clients.',
    tags: ['Landing Pages', 'Business Sites', 'WordPress', 'Custom HTML/CSS', 'Mobile First', 'SEO Ready'],
  },
  {
    num: '02',
    name: 'Brand Identity',
    summary: 'Logo, colour, type, and guidelines, your full visual system.',
    description: 'A brand is more than a logo. We build the complete visual system: mark, palette, typography, and brand guidelines that keep everything consistent whether it shows up on a business card or a billboard.',
    tags: ['Logo Design', 'Brand System', 'Guidelines', 'Typography', 'Colour Palette'],
  },
  {
    num: '03',
    name: 'Graphic Design',
    summary: 'Visuals that make your brand look like it means business.',
    description: 'Social media content, print materials, pitch decks, and document design, all consistent with your brand. We make sure every touchpoint your audience sees reflects the quality of what you actually offer.',
    tags: ['Social Media', 'Print', 'Pitch Decks', 'Document Design', 'Posters'],
  },
]

function ServiceRow({ service }: { service: typeof services[0] }) {
  const [open, setOpen] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rowRef.current || !lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.set(rowRef.current, { opacity: 0, y: 20 })
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
      })

      tl.to(lineRef.current, { scaleX: 1, duration: 0.5 })
        .to(rowRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rowRef}>
      <div style={{ position: 'relative', borderTop: '1px solid rgba(178,213,229,0.08)' }}>
        <div
          ref={lineRef}
          aria-hidden="true"
          style={{ position: 'absolute', top: '-1px', left: 0, right: 0, height: '1px', background: 'var(--color-ember)' }}
        />

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
                color: open ? 'var(--color-ink)' : 'var(--color-ink-72)',
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

          <span style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: '1px solid rgba(178,213,229,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'border-color 0.3s ease, transform 0.4s ease',
            transform: open ? 'rotate(45deg)' : 'none',
            borderColor: open ? 'rgba(178,213,229,0.4)' : 'rgba(178,213,229,0.12)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? 'var(--color-ember)' : 'rgba(178,213,229,0.5)'} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
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
              <div style={{ paddingBottom: '36px', paddingLeft: '56px' }}>
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
                      border: '1px solid rgba(178,213,229,0.1)',
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
    </div>
  )
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!headerRef.current) return
    const ctx = gsap.context(() => {
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 })
      gsap.set([line1Ref.current, line2Ref.current], { yPercent: 110 })
      gsap.set(introRef.current, { opacity: 0, y: 16 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.4 })
        .to(line1Ref.current, { yPercent: 0, duration: 0.6 }, '-=0.1')
        .to(line2Ref.current, { yPercent: 0, duration: 0.6 }, '-=0.4')
        .to(introRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    }, headerRef)
    return () => ctx.revert()
  }, [])

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

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(55% 55% at 80% 10%, rgba(178,213,229,0.04) 0%, rgba(178,213,229,0) 70%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '64px', right: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(178,213,229,0) 0%, rgba(178,213,229,0.08) 50%, rgba(178,213,229,0) 100%)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div ref={headerRef} className="svc-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '72px', gap: '32px' }}>
          <div>
            <p ref={eyebrowRef} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
              <span aria-hidden="true" style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)', flexShrink: 0 }} />
              Services
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: 0 }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <div ref={line1Ref}>Three things,</div>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <div ref={line2Ref}>done properly.</div>
              </div>
            </h2>
          </div>

          <p ref={introRef} style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0, textAlign: 'right', maxWidth: '280px' }}>
            Each service is a complete offering, not a starting point for upsells.
          </p>
        </div>

        <div>
          {services.map((s) => (
            <ServiceRow key={s.num} service={s} />
          ))}
          <div style={{ height: '1px', background: 'rgba(178,213,229,0.08)' }} />
        </div>

      </div>
    </section>
  )
}