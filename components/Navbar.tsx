'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const EASE_EXPO = [0.22, 1, 0.36, 1] as const

const links = [
  { label: 'Services', href: '/#services' },
  { label: 'Process',  href: '/#process'  },
  { label: 'Pricing',  href: '/#packages' },
]

export default function Navbar() {
  const [visible, setVisible]       = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <style>{`
        .nav-link {
          display: inline-flex;
          align-items: center;
          padding: 11px 22px;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(178,213,229,0.6);
          transition: color 0.25s ease;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-link:hover { color: rgba(178,213,229,1); }
        .nav-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-left: 6px;
          padding: 12px 26px;
          border-radius: 9999px;
          background: rgba(178,213,229,1);
          color: #020202;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: box-shadow 0.3s ease;
        }
        .nav-cta-btn:hover {
          box-shadow: 0 6px 28px rgba(178,213,229,0.22);
        }
        .mobile-link {
          display: block;
          padding: 14px 4px;
          font-size: 1rem;
          font-weight: 500;
          color: rgba(178,213,229,0.6);
          border-bottom: 1px solid rgba(178,213,229,0.08);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .mobile-link:hover { color: rgba(178,213,229,1); }
        .ham-line {
          display: block;
          width: 18px;
          height: 1px;
          background: rgba(178,213,229,0.8);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-ham-btn { display: flex !important; }
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <motion.header
            key="navbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            style={{
              position: 'fixed',
              top: '20px',
              right: '24px',
              zIndex: 40,
              pointerEvents: 'auto',
            }}
          >
            {/* Desktop pill */}
            <nav
              className="nav-desktop"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 8px 8px 10px',
                borderRadius: '9999px',
                border: '1px solid rgba(178,213,229,0.12)',
                background: 'rgba(178,213,229,0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(178,213,229,0.08)',
                gap: '3px',
              }}
            >
              {links.map(link => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
              <Link href="/quote" className="nav-cta-btn">
                Get a quote
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
                </svg>
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="nav-ham-btn"
              style={{
                display: 'none',
                width: '42px',
                height: '42px',
                borderRadius: '9999px',
                border: '1px solid rgba(178,213,229,0.12)',
                background: 'rgba(178,213,229,0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '5px',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span className="ham-line" style={{ transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
              <span className="ham-line" style={{ opacity: mobileOpen ? 0 : 1 }} />
              <span className="ham-line" style={{ transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
            </button>

            {/* Mobile dropdown */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  key="mobile-menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: EASE_EXPO }}
                  style={{
                    position: 'absolute',
                    top: '50px',
                    right: 0,
                    minWidth: '220px',
                    borderRadius: '16px',
                    border: '1px solid rgba(178,213,229,0.1)',
                    background: 'rgba(2,2,2,0.95)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    padding: '8px 16px 16px',
                  }}
                >
                  {links.map(link => (
                    <a key={link.href} href={link.href} className="mobile-link" onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </a>
                  ))}
                  <Link
                    href="/quote"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      marginTop: '12px',
                      padding: '13px',
                      borderRadius: '9999px',
                      background: 'rgba(178,213,229,1)',
                      color: '#020202',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    Get a quote
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  )
}