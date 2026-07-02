'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(ScrollTrigger, Observer)

const steps = [
  {
    num: '01',
    title: 'Diagnose',
    body: 'We start by understanding your business, your audience, and what you actually need, not what you think you need. A short discovery call is all it takes.',
  },
  {
    num: '02',
    title: 'Propose',
    body: 'You get a clear scope, timeline, and fixed price. No hourly rates, no vague estimates, just an honest proposal you can say yes or no to.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'We build with regular check-ins so you always know where things stand. No disappearing for weeks, no surprises at the end.',
  },
  {
    num: '04',
    title: 'Deliver',
    body: 'You receive everything you own: files, code, accounts, logins. We walk you through it and stay available for questions after handover.',
  },
]

function ProcessPanel({
  step,
  index,
  panelRefs,
  numberRefs,
  bodyRefs,
}: {
  step: typeof steps[0]
  index: number
  panelRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  numberRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  bodyRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}) {
  return (
    <div
      ref={(el) => { panelRefs.current[index] = el }}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        ref={(el) => { numberRefs.current[index] = el }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '0%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(160px, 24vw, 320px)',
          fontWeight: 800,
          lineHeight: 1,
          color: 'var(--color-ember)',
          opacity: 0.08,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {step.num}
      </div>

      <div
        ref={(el) => { bodyRefs.current[index] = el }}
        style={{ position: 'relative', zIndex: 1, maxWidth: '460px' }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--color-ember)', display: 'block', marginBottom: '14px' }}>
          STEP {step.num}
        </span>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(30px, 4vw, 52px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
          margin: '0 0 18px',
          lineHeight: 1.05,
        }}>
          {step.title}
        </h3>
        <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0 }}>
          {step.body}
        </p>
      </div>
    </div>
  )
}

export default function Process() {
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const numberRefs = useRef<(HTMLDivElement | null)[]>([])
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      { isDesktop: '(min-width: 900px)', isMobile: '(max-width: 899px)' },
      (context) => {
        const { isDesktop: desktop } = context.conditions as { isDesktop: boolean }
        setIsDesktop(desktop)

        if (!desktop || !outerRef.current || !trackRef.current) return

        // Shared Lenis instance (exposed by LenisProvider). While the pin is
        // active the Observer hijacks the wheel, so Lenis must be stopped or
        // the two fight over the same wheel events.
        const getLenis = () =>
          (window as unknown as { __lenis?: { stop: () => void; start: () => void; scrollTo: (target: number, opts?: object) => void } }).__lenis

        const ctx = gsap.context(() => {
          const track = trackRef.current!
          const currentIndex = { value: 0 }
          const animating = { value: false }

          function snapToStep(index: number, instant = false) {
            currentIndex.value = index
            setActiveIndex(index)
            animating.value = !instant

            gsap.to(track, {
              xPercent: -100 * index,
              duration: instant ? 0 : 0.85,
              ease: 'power2.inOut',
              onComplete: () => { animating.value = false },
            })

            panelRefs.current.forEach((panel, i) => {
              if (!panel) return
              const isActive = i === index
              gsap.to(numberRefs.current[i], { scale: isActive ? 1 : 0.75, duration: instant ? 0 : 0.85, ease: 'power2.inOut' })
              gsap.to(bodyRefs.current[i], { opacity: isActive ? 1 : 0.15, y: isActive ? 0 : 24, duration: instant ? 0 : 0.85, ease: 'power2.inOut' })
            })
          }

          const observer = Observer.create({
            target: window,
            type: 'wheel,touch',
            tolerance: 10,
            preventDefault: true,
            // Scroll DOWN → advance to the next step; from the last step, release
            // the pin and continue down into the Contact section.
            onDown: () => {
              if (animating.value) return
              if (currentIndex.value >= steps.length - 1) {
                observer.disable()
                const lenis = getLenis()
                if (lenis) {
                  lenis.scrollTo(st.end + 50, { immediate: true, force: true })
                } else {
                  st.scroll(st.end + 50)
                }
                return
              }
              snapToStep(currentIndex.value + 1)
            },
            // Scroll UP → go back a step; from the first step, release the pin
            // and continue up into the Services section.
            onUp: () => {
              if (animating.value) return
              if (currentIndex.value <= 0) {
                observer.disable()
                const lenis = getLenis()
                if (lenis) {
                  lenis.scrollTo(st.start - 50, { immediate: true, force: true })
                } else {
                  st.scroll(st.start - 1)
                }
                return
              }
              snapToStep(currentIndex.value - 1)
            },
          })
          observer.disable()

          const st = ScrollTrigger.create({
            trigger: outerRef.current,
            start: 'top top',
            end: '+=4000',
            pin: true,
            anticipatePin: 1,
            // Lowest of the three pins — refreshed last, after Hero and
            // Philosophy have restored their pin-spacers above it.
            refreshPriority: 1,
            onEnter: () => { snapToStep(0, true); observer.enable(); getLenis()?.stop() },
            onEnterBack: () => { snapToStep(steps.length - 1, true); observer.enable(); getLenis()?.stop() },
            onLeave: () => { observer.disable(); getLenis()?.start() },
            onLeaveBack: () => { observer.disable(); getLenis()?.start() },
          })
        }, outerRef)

        // If we tear down while the pin is active (unmount / breakpoint flip),
        // ScrollTrigger's onLeave won't fire — make sure Lenis is running again.
        return () => { ctx.revert(); getLenis()?.start() }
      }
    )

    return () => mm.revert()
  }, [])

  const HeaderBlock = ({ compact }: { compact?: boolean }) => (
    <>
      <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
        <span aria-hidden="true" style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)', flexShrink: 0 }} />
        The Method
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: compact ? 'clamp(26px, 2.6vw, 38px)' : 'clamp(32px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 20px' }}>
        A precise process. Every time.
      </h2>
      <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0, maxWidth: '340px' }}>
        The same four steps behind every project, no reinventing the wheel, no chaos, no surprises, just disciplined execution from start to finish.
      </p>
    </>
  )

  return (
    <section id="process" style={{ position: 'relative', background: 'var(--color-void)' }}>
      <style>{`
        .process-mobile-header { padding: 140px 28px 60px; max-width: 1100px; margin: 0 auto; }
        @media (max-width: 600px) { .process-mobile-header { padding: 100px 24px 48px; } }
      `}</style>

      {isDesktop ? (
        <div ref={outerRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '36% 64%', height: '100%', padding: '0 64px', alignItems: 'center', gap: '24px' }}>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <HeaderBlock compact />
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '32px' }}>
                {steps.map((s, i) => (
                  <div
                    key={s.num}
                    style={{
                      width: activeIndex === i ? '32px' : '10px',
                      height: '3px',
                      borderRadius: '2px',
                      background: activeIndex === i ? 'var(--color-ember)' : 'rgba(178,213,229,0.18)',
                      transition: 'width 0.3s ease, background 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
              <div ref={trackRef} style={{ display: 'flex', height: '100%', width: `${steps.length * 100}%` }}>
                {steps.map((step, i) => (
                  <ProcessPanel
                    key={step.num}
                    step={step}
                    index={i}
                    panelRefs={panelRefs}
                    numberRefs={numberRefs}
                    bodyRefs={bodyRefs}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : (
        <>
          <div className="process-mobile-header">
            <HeaderBlock />
          </div>
          <div style={{ padding: '0 24px 80px' }}>
            {steps.map((step) => (
              <div key={step.num} style={{ borderTop: '1px solid rgba(178,213,229,0.08)', padding: '32px 0' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--color-ember)', display: 'block', marginBottom: '12px' }}>
                  STEP {step.num}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 12px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.925rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}