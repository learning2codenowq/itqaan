'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()

  useEffect(() => {
    // scrollRestoration is forced to 'manual' by an inline <head> script in
    // layout.tsx (it must run before first paint to stop the browser restoring
    // the previous page's scroll onto a freshly loaded page). Here we just own
    // the smoothed scroll; the route-change effect below resets to top.
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

    // In-page anchor navigation, routed through Lenis so it stays in sync.
    // We flag `__navScrolling` + `__navTarget` so a pinned wheel-hijack section
    // (Process) lets a nav-scroll pass straight through instead of trapping it.
    const nav = window as unknown as { __navScrolling?: boolean; __navTarget?: string | null }
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const a = (e.target as HTMLElement)?.closest('a')
      const href = a?.getAttribute('href')
      if (!href) return
      let id: string | null = null
      if (href.startsWith('#')) id = href.slice(1)
      else if (href.startsWith('/#') && window.location.pathname === '/') id = href.slice(2)
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      nav.__navScrolling = true
      nav.__navTarget = id
      lenis.scrollTo(el, {
        duration: 1.2,
        force: true,
        onComplete: () => { nav.__navScrolling = false; nav.__navTarget = null },
      })
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
      ;(window as unknown as { __lenis?: Lenis }).__lenis = undefined
    }
  }, [])

  // On every route change (and initial load), start the new page at the top —
  // unless the URL targets an in-page anchor. Skipping when a hash is present
  // preserves deep-links like `/#services`. Runs separately from the Lenis
  // init effect so navigating never tears down / recreates the instance.
  useEffect(() => {
    if (window.location.hash) return
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}