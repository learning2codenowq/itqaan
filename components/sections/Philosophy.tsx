// components/sections/Philosophy.tsx
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ItqaanCalligraphy from '@/components/ui/ItqaanCalligraphy'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const arabicRef = useRef<HTMLSpanElement>(null)
  const translitRef = useRef<HTMLParagraphElement>(null)
  const definitionRef = useRef<HTMLParagraphElement>(null)
  const hadithLineRef = useRef<HTMLDivElement>(null)
  const hadithTextRef = useRef<HTMLDivElement>(null)
  const closingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 900px)',
        isMobile: '(max-width: 899px)',
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean }

        const ctx = gsap.context(() => {
          gsap.set(eyebrowRef.current, { opacity: 0 })
          gsap.set(arabicRef.current, { opacity: 0, scale: 0.7, filter: 'blur(14px)' })
          gsap.set(translitRef.current, { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
          gsap.set(definitionRef.current, { opacity: 0, y: 24, filter: 'blur(8px)' })
          gsap.set(hadithLineRef.current, { scaleY: 0, transformOrigin: 'top' })
          gsap.set(hadithTextRef.current, { opacity: 0, y: 16 })
          gsap.set(closingRef.current, { opacity: 0, y: 16 })

          const tl = gsap.timeline({
            // Desktop: pinned, scrub-driven (the reveal tracks scroll position).
            // Mobile: NOT pinned, so a scrub would race through the whole reveal
            // in one short scroll. Instead play the timeline once at its own pace
            // when the section enters view, so it always finishes.
            scrollTrigger: isDesktop
              ? {
                  trigger: wrapperRef.current,
                  start: 'top top',
                  end: '+=115%',
                  scrub: 1,
                  pin: true,
                  anticipatePin: 1,
                  // Refresh after Hero, before Process, so its start measures
                  // with Hero's pin-spacer already in place.
                  refreshPriority: 2,
                }
              : {
                  trigger: wrapperRef.current,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
          })

          tl.to(eyebrowRef.current, { opacity: 1, duration: 0.5 })
            .to(arabicRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 }, '-=0.15')
            .to(translitRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.9 }, '-=0.3')
            .to(definitionRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, '-=0.25')
            .to(hadithLineRef.current, { scaleY: 1, duration: 0.7 }, '-=0.3')
            .to(hadithTextRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
            .to(closingRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        }, wrapperRef)

        return () => ctx.revert()
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <section
        id="philosophy"
        style={{ position: 'relative', padding: '160px 64px', background: 'var(--color-void)', overflow: 'hidden', minHeight: '100svh', display: 'flex', alignItems: 'center' }}
      >
        <style>{`
          @media (max-width: 900px) { #philosophy { padding: 100px 28px !important; min-height: auto !important; } }
          @media (max-width: 600px) { #philosophy { padding: 80px 24px !important; } }
        `}</style>

        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>

          <p
            ref={eyebrowRef}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 32px', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)', display: 'inline-block' }} />
            What does Itqaan mean?
          </p>

          <span
            ref={arabicRef}
            style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}
          >
            <ItqaanCalligraphy animate={false} style={{ height: 'clamp(48px, 8vw, 84px)', width: 'auto' }} />
          </span>

          <p
            ref={translitRef}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: '0 0 32px' }}
          >
            Itqaan: from the Arabic root &quot;atqana,&quot; to perfect, to master, to do with precision
          </p>

          <p
            ref={definitionRef}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 600, lineHeight: 1.4, color: 'var(--color-ink)', margin: '0 0 48px' }}
          >
            Itqaan means doing a piece of work with such care and precision that nothing about it is left careless: not &quot;good enough,&quot; but excellent by design.
          </p>

          <div style={{ position: 'relative', paddingLeft: '24px' }}>
            <div
              ref={hadithLineRef}
              aria-hidden="true"
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'var(--color-ember)' }}
            />
            <div ref={hadithTextRef}>
              <p style={{ fontSize: '1.05rem', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.8, color: 'var(--color-ink-72)', margin: '0 0 12px' }}>
                &quot;Verily, Allah loves that when one of you does a job, he perfects it.&quot;
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: 0 }}>
                Prophet Muhammad ﷺ, Shu&apos;ab al-Īmān, al-Bayhaqi
              </p>
            </div>
          </div>

          <p
            ref={closingRef}
            style={{ fontSize: '0.925rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', marginTop: '48px', maxWidth: '520px' }}
          >
            That is the standard the name holds us to. Every project we take on is measured against it.
          </p>

        </div>
      </section>
    </div>
  )
}