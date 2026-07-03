'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GeoPattern from '@/components/ui/GeoPattern'

gsap.registerPlugin(ScrollTrigger)

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

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px 0px' })

  // Parallax accent: drift the geometric pattern as the section scrolls past.
  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -10 },
        { yPercent: 10, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{ position: 'relative', padding: '140px 64px', background: 'var(--color-void)', overflow: 'hidden' }}
    >
      {/* Parallax geometric accent */}
      <div ref={bgRef} aria-hidden="true" style={{ position: 'absolute', top: '-18%', left: 0, right: 0, height: '136%', zIndex: 0, pointerEvents: 'none' }}>
        <GeoPattern opacity={0.03} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact { padding: 100px 28px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 600px) { #contact { padding: 80px 24px !important; } }
        .cta-primary:hover { box-shadow: 0 8px 40px rgba(178,213,229,0.18); }
        .wa-link:hover { color: rgba(178,213,229,0.85) !important; }
      `}</style>

      {/* Glows */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(60% 60% at 50% 0%, rgba(178,213,229,0.05) 0%, rgba(178,213,229,0) 70%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '64px', right: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(178,213,229,0) 0%, rgba(178,213,229,0.08) 50%, rgba(178,213,229,0) 100%)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '96px', alignItems: 'center' }}>

          {/* Left — copy */}
          <div>
            <Reveal style={{ marginBottom: '20px' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: 0 }}>
                <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
                Get started
              </p>
            </Reveal>

            <h2 ref={headingRef} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 24px' }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <motion.div initial={{ y: '110%' }} animate={headingInView ? { y: 0 } : {}} transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.05 }}>Get a fixed price,</motion.div>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <motion.div initial={{ y: '110%' }} animate={headingInView ? { y: 0 } : {}} transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.18 }}>not a guessing game.</motion.div>
              </div>
            </h2>

            <Reveal delay={0.2} style={{ marginBottom: '36px' }}>
              <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0, maxWidth: '380px' }}>
                Answer a few quick questions, see a live estimate, and get a fixed-price proposal within two business days, inshaa Allah.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {['A live estimate as you choose', 'A fixed price, no surprises later', 'No obligation, no pressure'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem', color: 'var(--color-ink-48)', fontWeight: 300 }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ink-28)', flexShrink: 0 }} aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — CTA card */}
          <Reveal delay={0.15}>
            <div style={{
              padding: '44px 40px',
              borderRadius: '16px',
              border: '1px solid rgba(178,213,229,0.1)',
              background: 'rgba(178,213,229,0.03)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}>
              <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, rgba(178,213,229,0) 0%, rgba(178,213,229,0.16) 50%, rgba(178,213,229,0) 100%)' }} />

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 16px' }}>Takes under a minute</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 12px', lineHeight: 1.25 }}>Build your quote</h3>
              <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-48)', margin: '0 0 28px' }}>Tell us what you need and watch the estimate build up as you go.</p>

              <Link href="/quote" className="cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.02em', textDecoration: 'none', transition: 'box-shadow 0.3s ease' }}>
                Start your quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
              </Link>

              <div style={{ margin: '28px 0', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ flex: 1, height: '1px', background: 'rgba(178,213,229,0.1)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>or</span>
                <span style={{ flex: 1, height: '1px', background: 'rgba(178,213,229,0.1)' }} />
              </div>

              <a
                href="https://wa.me/923165252296?text=Assalamu%20Alaykum%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20ITQAAN."
                target="_blank"
                rel="noopener noreferrer"
                className="wa-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: 'var(--color-ink-48)', fontWeight: 400, textDecoration: 'none', transition: 'color 0.25s ease' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Or message us on WhatsApp
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
