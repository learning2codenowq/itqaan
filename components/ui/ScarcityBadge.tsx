'use client'

import { capacity, currentMonthLabel } from '@/lib/quote'

/**
 * Small availability badge that creates urgency. Update `capacity.slotsLeft`
 * in lib/quote.ts as projects get booked. When it reaches 0 it flips to a
 * waitlist message.
 */
export default function ScarcityBadge({ style }: { style?: React.CSSProperties }) {
  const { slotsLeft, perMonth, nextAvailable } = capacity
  const month = currentMonthLabel()
  const soldOut = slotsLeft <= 0

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 16px',
        borderRadius: '9999px',
        border: '1px solid var(--color-ember-18)',
        background: 'var(--color-ember-dim)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        letterSpacing: '0.06em',
        color: 'var(--color-ink)',
        ...style,
      }}
    >
      <span aria-hidden="true" style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px' }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--color-ember)', animation: soldOut ? 'none' : 'scarcity-ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }} />
        <span style={{ position: 'relative', display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-ember)' }} />
      </span>
      {soldOut
        ? <>Fully booked for {month}{nextAvailable ? <> · next intake opens {nextAvailable}</> : <> · join the waitlist</>}</>
        : <>Only <strong style={{ fontWeight: 700 }}>{slotsLeft}</strong> of {perMonth} project slots left for {month}</>}
      <style>{`
        @keyframes scarcity-ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </span>
  )
}
