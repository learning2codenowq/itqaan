'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import GeoPattern from '@/components/ui/GeoPattern'

const EASE_EXPO = [0.22, 1, 0.36, 1] as const

const loaderArabicVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_EXPO } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.4, ease: EASE_EXPO } },
}
const loaderLabelVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
}
const loaderLineVariants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 0.4, transition: { duration: 0.55, ease: EASE_EXPO, delay: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
}

function HeroLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE_EXPO, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function HeroFade({ children, delay, style }: { children: React.ReactNode; delay: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: EASE_EXPO, delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const [loaderDone, setLoaderDone] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      setLoaderDone(true)
      setShowContent(true)
      return
    }
    const t1 = setTimeout(() => setLoaderDone(true), 2400)
    const t2 = setTimeout(() => setShowContent(true), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [prefersReduced])

  return (
    <>
      {/* ── Loader ── */}
      <AnimatePresence>
        {!loaderDone && (
          <motion.div
            key="loader"
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '20px',
              background: 'var(--color-void)',
            }}
            exit={{ y: '-100%', transition: { duration: 0.85, ease: EASE_EXPO } }}
          >
            <GeoPattern opacity={0.02} />
            <motion.span
              style={{
                fontFamily: 'DigitalKhatt, serif',
                fontSize: 'clamp(56px, 9vw, 100px)',
                color: 'var(--color-ember)',
                direction: 'rtl',
                display: 'inline-block',
              }}
              variants={loaderArabicVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              إتقان
            </motion.span>
            <motion.div
              style={{
                height: '1px', width: '80px',
                background: 'var(--color-ember)',
                transformOrigin: 'left center',
              }}
              variants={loaderLineVariants}
              initial="hidden" animate="visible" exit="exit"
            />
            <motion.span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(196,98,45,0.45)',
              }}
              variants={loaderLabelVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              Creative Agency
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'var(--color-void)',
        }}
      >
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <GeoPattern opacity={0.04} rotate />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(120% 120% at 50% 50%, rgba(10,8,6,0) 40%, rgba(10,8,6,0.92) 100%)',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(55% 55% at 15% 85%, rgba(196,98,45,0.09) 0%, rgba(196,98,45,0) 70%)',
            }}
          />
        </div>

        {/* Content — centred vertically, padded left */}
        <div
          style={{
            position: 'relative', zIndex: 1,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '96px 64px 0',
          }}
        >
          {showContent && (
            <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

              {/* Headline */}
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(52px, 7vw, 110px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
                margin: '0 0 32px',
              }}>
                <HeroLine delay={0.1}>Design done</HeroLine>
                <HeroLine delay={0.2}>
                  with{' '}
                  <span style={{ color: 'var(--color-ember)' }}>excellence.</span>
                </HeroLine>
              </h1>

              {/* Subtext */}
              <HeroFade delay={0.45} style={{ marginBottom: '48px', maxWidth: '460px' }}>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: 'var(--color-ink-48)',
                  margin: 0,
                }}>
                  Web design, brand identity, and graphic design for Muslim
                  businesses and service brands that want to look the part.
                </p>
              </HeroFade>

              {/* CTAs */}
              <HeroFade delay={0.6} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>

                {/* Primary */}
                <a
                  href="#contact"
                  className="hero-cta-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    background: 'var(--color-ink)',
                    color: 'var(--color-void)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    transition: 'box-shadow 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  Start a project
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
                  </svg>
                </a>

                {/* Secondary */}
                <a
                  href="#services"
                  className="hero-cta-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(245,240,232,0.18)',
                    background: 'rgba(245,240,232,0.05)',
                    color: 'rgba(245,240,232,0.6)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    transition: 'border-color 0.3s, color 0.3s, background 0.3s',
                  }}
                >
                  See our work
                </a>

              </HeroFade>
            </div>
          )}
        </div>

      </section>

      {/* CTA hover styles */}
      <style>{`
        .hero-cta-primary:hover {
          box-shadow: 0 8px 40px rgba(245,240,232,0.15);
        }
        .hero-cta-secondary:hover {
          border-color: rgba(245,240,232,0.28) !important;
          color: rgba(245,240,232,1) !important;
          background: rgba(245,240,232,0.08) !important;
        }
      `}</style>
    </>
  )
}