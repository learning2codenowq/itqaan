'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    // Avoid gaps when pinned sections re-measure on mobile URL-bar resize
    ScrollTrigger.config({ ignoreMobileResize: true })

    // Keep ScrollTrigger in sync with Lenis's smoothed scroll position
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker instead of its own rAF loop —
    // this is what keeps pinned/scrubbed animations perfectly in sync.
    // Keep a named reference so we can remove it on cleanup (otherwise
    // React Strict Mode's double-mount leaks a ticker callback that keeps
    // firing against a destroyed Lenis instance → stutter).
    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Once web fonts have swapped in (which shifts layout heights), re-measure
    // every ScrollTrigger so pinned/scrubbed start/end positions are correct.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
      ;(window as unknown as { __lenis?: Lenis }).__lenis = undefined
    }
  }, [])

  return <>{children}</>
}