'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { siteTypes, formatPrice } from '@/lib/quote'

const FROM_PRICE = siteTypes.find(s => s.id === 'one-page')?.price ?? 997

/*
 * Mobile-only sticky bottom bar with the quote CTA. Appears after the visitor
 * scrolls past the hero (~one viewport), so it never covers the hero's own CTA.
 * While visible it adds `sticky-cta-visible` to <body>, which lifts the global
 * WhatsApp FAB above the bar (CSS below) so the two never overlap.
 * Rendered on the homepage only; /quote is where the bar sends people.
 */
export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('sticky-cta-visible', visible)
    return () => document.body.classList.remove('sticky-cta-visible')
  }, [visible])

  return (
    <>
      <style>{`
        .sticky-cta {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          display: none;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 12px 16px;
          padding-bottom: max(12px, env(safe-area-inset-bottom));
          border-top: 1px solid var(--color-ink-10);
          background: rgba(2,2,2,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sticky-cta.show { transform: translateY(0); }
        @media (max-width: 767px) {
          .sticky-cta { display: flex; }
          /* keep the WhatsApp FAB clear of the bar */
          body.sticky-cta-visible .wa-fab {
            bottom: calc(max(12px, env(safe-area-inset-bottom)) + 72px);
          }
        }
        .sticky-cta-price {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .sticky-cta-price strong {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-ink);
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .sticky-cta-price span {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-ink-28);
          white-space: nowrap;
        }
        .sticky-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 9999px;
          background: var(--color-ink);
          color: var(--color-void);
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
        }
      `}</style>

      <div className={`sticky-cta ${visible ? 'show' : ''}`} aria-hidden={!visible}>
        <p className="sticky-cta-price" style={{ margin: 0 }}>
          <strong>From {formatPrice(FROM_PRICE)}</strong>
          <span>Fixed price.</span>
        </p>
        <Link href="/quote" className="sticky-cta-btn" data-cta="sticky_mobile_bar" tabIndex={visible ? 0 : -1}>
          Get a quote
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
          </svg>
        </Link>
      </div>
    </>
  )
}
