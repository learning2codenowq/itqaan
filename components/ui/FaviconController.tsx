'use client'

import { useEffect } from 'react'

const ACTIVE_ICON = '/favicon-active.svg'
const IDLE_ICON = '/favicon-idle.svg'

/* Swaps the SVG favicon between a full-color (tab focused) and dimmed
   (tab backgrounded) version. Dark/light mode is handled inside the SVGs
   themselves via prefers-color-scheme, this only handles focus state
   since there is no CSS hook for it. */
export default function FaviconController() {
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]')
    if (!link) return

    const update = () => {
      link.href = document.visibilityState === 'visible' ? ACTIVE_ICON : IDLE_ICON
    }

    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  return null
}
