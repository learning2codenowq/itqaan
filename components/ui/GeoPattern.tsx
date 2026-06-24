'use client'

import { useEffect, useRef } from 'react'

interface GeoPatternProps {
  className?: string
  opacity?: number
  rotate?: boolean
}

export default function GeoPattern({
  className = '',
  opacity = 0.035,
  rotate = false,
}: GeoPatternProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!rotate || !svgRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let angle = 0
    let rafId: number

    function tick() {
      angle += 0.003
      if (svgRef.current) {
        svgRef.current.style.transform = `rotate(${angle}deg)`
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [rotate])

  /*
    8-pointed star tile built from two overlapping squares rotated 45deg.
    The pattern repeats at 120px intervals.
    All paths are stroked, not filled, for the correct look.
  */
  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity, willChange: rotate ? 'transform' : 'auto' }}
    >
      <defs>
        {/* 8-pointed star tile */}
        <pattern
          id="geo-star"
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          {/* Outer square */}
          <rect
            x="10" y="10"
            width="100" height="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {/* Inner square rotated 45deg around center (60,60) */}
          <rect
            x="10" y="10"
            width="100" height="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            transform="rotate(45 60 60)"
          />
          {/* Cross lines connecting midpoints */}
          <line x1="60" y1="10" x2="60" y2="110" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10" y1="60" x2="110" y2="60" stroke="currentColor" strokeWidth="0.5" />
          {/* Diagonal lines */}
          <line x1="10" y1="10" x2="110" y2="110" stroke="currentColor" strokeWidth="0.5" />
          <line x1="110" y1="10" x2="10" y2="110" stroke="currentColor" strokeWidth="0.5" />
          {/* Inner octagon points */}
          <polygon
            points="60,25 75,35 85,50 85,70 75,85 60,95 45,85 35,70 35,50 45,35"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>

        {/* Radial mask — fades the pattern at edges */}
        <radialGradient id="geo-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="65%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="geo-mask">
          <rect width="100%" height="100%" fill="url(#geo-fade)" />
        </mask>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="url(#geo-star)"
        color="var(--color-ink)"
        mask="url(#geo-mask)"
      />
    </svg>
  )
}