'use client'

import { useEffect } from 'react'

/*
 * Floating WhatsApp button — site-wide tap-to-chat for WhatsApp-group traffic.
 * The green (#25D366) and WhatsApp glyph are deliberately off-palette, the same
 * way the Hero "excellence" gloss is: brand recognition drives taps here, so we
 * keep WhatsApp's own colour rather than the Onyx + Candy Blue tokens.
 *
 * This component also owns a single delegated click listener that fires GA4
 * events for the whole site:
 *  - `whatsapp_click` for every wa.me link. Label with `data-wa-loc="..."`.
 *  - `cta_click` for every link into /quote, so GA shows which CTA actually
 *    drives quote starts. Label with `data-cta="..."`; unlabeled links fall
 *    back to the id of the section they sit in, then to 'page'. Every event
 *    carries the pathname it fired on.
 */

const WA_NUMBER = '923165252296'
const WA_TEXT = 'Assalamu alaikum, I found ITQAAN and I would like a quote.'
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`

export default function WhatsAppFab() {
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const w = window as unknown as { gtag?: (...args: unknown[]) => void }

      const wa = target?.closest?.('a[href*="wa.me"]') as HTMLAnchorElement | null
      if (wa) {
        w.gtag?.('event', 'whatsapp_click', { location: wa.dataset.waLoc || 'link', page: window.location.pathname })
        return
      }

      const cta = target?.closest?.('a[href^="/quote"]') as HTMLAnchorElement | null
      if (cta) {
        const location =
          cta.dataset.cta ||
          (cta.closest('section[id], footer, header') as HTMLElement | null)?.id ||
          (cta.closest('footer') ? 'footer' : cta.closest('header') ? 'header' : 'page')
        w.gtag?.('event', 'cta_click', { location, page: window.location.pathname })
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      data-wa-loc="floating_button"
      aria-label="Chat with us on WhatsApp"
      className="wa-fab"
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="#fff" aria-hidden="true">
        <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.5 1.128 6.746 3.046 9.38L1.05 31.24l6.06-1.938A15.9 15.9 0 0 0 16.004 32C24.828 32 32 24.826 32 16S24.828 0 16.004 0Zm9.31 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.702-1.948-7.73-6.726-7.966-7.036-.226-.31-1.9-2.53-1.9-4.826s1.166-3.42 1.58-3.888c.34-.386.902-.562 1.442-.562.174 0 .332.008.474.016.414.018.622.042.896.696.34.82 1.17 2.85 1.27 3.06.102.21.204.494.062.804-.132.32-.248.46-.458.708-.21.248-.41.438-.62.704-.192.232-.408.482-.166.898.242.408 1.076 1.774 2.31 2.874 1.594 1.418 2.878 1.87 3.34 2.062.344.142.752.108 1.002-.164.318-.35.71-.93 1.108-1.502.284-.408.642-.458 1.018-.316.384.132 2.41 1.136 2.824 1.342.414.21.688.31.79.484.1.174.1 1.004-.286 2.094Z" />
      </svg>
      <style>{`
        .wa-fab {
          position: fixed;
          right: max(20px, env(safe-area-inset-right));
          bottom: max(20px, env(safe-area-inset-bottom));
          z-index: 60;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #25D366;
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .wa-fab:hover { transform: scale(1.06); box-shadow: 0 10px 34px rgba(37,211,102,0.4); }
        .wa-fab:active { transform: scale(0.96); }
        @media (max-width: 600px) { .wa-fab { width: 52px; height: 52px; } }
      `}</style>
    </a>
  )
}
