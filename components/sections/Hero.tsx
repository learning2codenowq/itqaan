'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GeoPattern from '@/components/ui/GeoPattern'
import HeroShowcase from '@/components/ui/HeroShowcase'
import ItqaanCalligraphy from '@/components/ui/ItqaanCalligraphy'
import { siteTypes, formatPrice } from '@/lib/quote'

const HERO_FROM_PRICE = siteTypes.find(s => s.id === 'one-page')?.price ?? 997

gsap.registerPlugin(ScrollTrigger)

const EASE_EXPO = [0.22, 1, 0.36, 1] as const

// The line and label follow the calligraphy draw-on (~1.4s), so their delays
// sit after it rather than at loader start.
const loaderLabelVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 1.5 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
}
const loaderLineVariants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 0.4, transition: { duration: 0.55, ease: EASE_EXPO, delay: 1.25 } },
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

  const wrapperRef = useRef<HTMLDivElement>(null)
  const geoRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!showContent || prefersReduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          // Topmost pin — must refresh first so sections below measure with
          // Hero's pin-spacer already in place (higher priority = refreshed earlier).
          refreshPriority: 3,
        },
      })

      tl.to(geoRef.current, { y: -80, ease: 'none' }, 0)
        .to(contentRef.current, { y: -40, opacity: 0, scale: 0.96, transformOrigin: 'left center', ease: 'none' }, 0)
        // The showcase columns drift apart and dissolve as you scroll out, so
        // the hero "opens" to let you through. Targets the .hero-colwrap
        // wrappers, never .hero-col (its transform belongs to the marquee CSS).
        .to('.hero-colwrap--up', { x: -44, y: -28, opacity: 0, ease: 'none' }, 0)
        .to('.hero-colwrap--down', { x: 44, y: -28, opacity: 0, ease: 'none' }, 0)

      // This pin is created ~2.8s after the other sections' triggers (it waits
      // for `showContent`). Inserting its pin-spacer shifts the document below,
      // so re-measure every trigger to keep downstream start/end positions correct.
      ScrollTrigger.refresh()
    }, wrapperRef)

    return () => ctx.revert()
  }, [showContent, prefersReduced])

  return (
    <>
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
            <ItqaanCalligraphy style={{ height: 'clamp(56px, 9vw, 100px)', width: 'auto' }} />
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
                color: 'rgba(178,213,229,0.45)',
              }}
              variants={loaderLabelVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              Creative Agency
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={wrapperRef} style={{ position: 'relative' }}>
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
          <div ref={geoRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <GeoPattern opacity={0.04} rotate />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(120% 120% at 50% 50%, rgba(2,2,2,0) 40%, rgba(2,2,2,0.92) 100%)',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(55% 55% at 15% 85%, rgba(178,213,229,0.09) 0%, rgba(178,213,229,0) 70%)',
              }}
            />
          </div>

          <div
            style={{
              position: 'relative', zIndex: 1,
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              padding: '96px 64px 0',
            }}
          >
            <div className="hero-inner" style={{ width: '100%', maxWidth: '1480px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: '48px', alignItems: 'center' }}>
              <div>
            {showContent && (
              <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(34px, 4.3vw, 66px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-ink)',
                  margin: '0 0 28px',
                }}>
                  <HeroLine delay={0.1}>Professional websites,</HeroLine>
                  <HeroLine delay={0.18}>without investing</HeroLine>
                  <HeroLine delay={0.26}>
                    <span className="hero-excellence">your time.</span>
                  </HeroLine>
                </h1>

                <HeroFade delay={0.45} style={{ marginBottom: '40px', maxWidth: '480px' }}>
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: 'var(--color-ink-48)',
                    margin: 0,
                  }}>
                    Custom websites, branding, and design for Muslim businesses.
                    One short conversation, a fixed price in writing, and your
                    first design within days. We handle the rest.
                  </p>
                </HeroFade>

                <HeroFade delay={0.6} style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <Link href="/quote" className="hero-cta-primary"
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
                    Get a quote
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
                    </svg>
                  </Link>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: 'var(--color-ink)',
                    }}>
                      From {formatPrice(HERO_FROM_PRICE)}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ink-28)',
                    }}>
                      Fixed price.
                    </span>
                  </span>
                </HeroFade>

              </div>
            )}
              </div>

              <div className="hero-right">
                {showContent && (
                  <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE_EXPO, delay: 0.55 }}>
                    <HeroShowcase />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .hero-cta-primary:hover {
          box-shadow: 0 8px 40px rgba(178,213,229,0.15);
        }
        @media (max-width: 980px) {
          .hero-inner { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
        }
        /* "excellence" — glossy bright-to-candy gradient with a white shine
           sweeping across it, so the word pops through luminance contrast
           against the flat candy-blue of the rest of the heading.
           Two layered backgrounds (both clipped to the text): a moving shine
           highlight on top, a fixed vertical gloss underneath. No drop-shadow,
           which previously clipped against the line's overflow-hidden wrapper. */
        .hero-excellence {
          background-image:
            linear-gradient(110deg, transparent 42%, #ffffff 50%, transparent 58%),
            linear-gradient(180deg, #ffffff 0%, #d3ecf7 42%, var(--color-ink) 100%);
          background-size: 250% 100%, 100% 100%;
          background-position: 140% 0, 0 0;
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: hero-excellence-shine 5.5s ease-in-out infinite;
          animation-delay: 1.2s;
        }
        @keyframes hero-excellence-shine {
          0%   { background-position: 140% 0, 0 0; }
          42%  { background-position: -40% 0, 0 0; }
          100% { background-position: -40% 0, 0 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-excellence { animation: none; background-position: 50% 0, 0 0; }
        }
      `}</style>
    </>
  )
}