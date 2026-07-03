'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqs } from '@/lib/faq'

const EASE = [0.22, 1, 0.36, 1] as const

function Row({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid var(--color-ink-8)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', padding: '28px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(17px, 2vw, 21px)', fontWeight: 600, color: open ? 'var(--color-ink)' : 'var(--color-ink-72)', transition: 'color 0.3s ease', lineHeight: 1.3 }}>
          {q}
        </span>
        <span style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--color-ink-18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.3s ease, transform 0.4s ease', transform: open ? 'rotate(45deg)' : 'none', borderColor: open ? 'var(--color-ember-18)' : 'var(--color-ink-18)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? 'var(--color-ember)' : 'var(--color-ink-48)'} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0, paddingBottom: '28px', maxWidth: '640px' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  return (
    <div>
      {faqs.map(f => <Row key={f.q} q={f.q} a={f.a} />)}
      <div style={{ borderTop: '1px solid var(--color-ink-8)' }} />
    </div>
  )
}
