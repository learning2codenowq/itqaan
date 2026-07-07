'use client'

import { readyServices } from '@/lib/serviceNav'

const navLinks = [
  { label: 'Portfolio',         href: '/portfolio' },
  { label: 'How we work',       href: '/how-we-work' },
  { label: 'Pricing',           href: '/pricing'  },
  { label: 'Problems we solve', href: '/problems-we-solve' },
  { label: 'Blog',              href: '/blog'     },
  { label: 'FAQ',               href: '/faq'      },
]

const contactLinks = [
  { label: 'WhatsApp',  href: 'https://wa.me/923165252296', external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/withitqaan', external: true },
  { label: 'Email us',  href: 'mailto:hello@withitqaan.com' },
]

const columns = [
  { heading: 'Services', links: [
    ...readyServices.map(s => ({ label: s.label, href: s.href })),
    { label: 'All services', href: '/services' },
  ] },
  { heading: 'Explore',  links: navLinks },
  { heading: 'Connect',  links: contactLinks },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ position: 'relative', background: 'var(--color-void)', padding: '0 24px 24px' }}>
      <style>{`
        .footer-shell {
          position: relative;
          max-width: 1240px;
          margin: 0 auto;
          border: 1px solid var(--color-ink-8);
          border-radius: 40px;
          background:
            radial-gradient(120% 140% at 50% 0%, rgba(178,213,229,0.06) 0%, rgba(178,213,229,0) 55%),
            var(--color-void);
          padding: 72px 64px 40px;
          overflow: hidden;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 48px;
          position: relative;
          z-index: 1;
        }
        .footer-colhead {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-72);
          margin: 0 0 22px;
        }
        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }
        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: var(--color-ink-48);
          text-decoration: none;
          transition: color 0.22s ease;
          font-weight: 300;
          width: fit-content;
        }
        .footer-link:hover { color: var(--color-ink); }
        .footer-brand-lockup {
          text-decoration: none;
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 18px;
        }
        .footer-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 22px;
          padding: 11px 22px;
          border-radius: var(--radius-pill);
          background: var(--color-ember);
          color: var(--color-void);
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .footer-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -12px rgba(178,213,229,0.5);
        }
        .footer-wordmark {
          position: relative;
          z-index: 0;
          margin: 56px 0 -8px;
          text-align: center;
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          line-height: 0.9;
          font-size: clamp(56px, 13vw, 180px);
          color: transparent;
          background: linear-gradient(180deg, var(--color-ink-8) 0%, rgba(178,213,229,0) 92%);
          -webkit-background-clip: text;
          background-clip: text;
          user-select: none;
          pointer-events: none;
        }
        .footer-bottom {
          position: relative;
          z-index: 1;
          margin-top: 40px;
          padding-top: 26px;
          border-top: 1px solid var(--color-ink-8);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }
        .footer-legal {
          display: inline-flex;
          gap: 22px;
          align-items: center;
        }
        @media (max-width: 1080px) {
          .footer-top { grid-template-columns: 1fr 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 720px) {
          .footer-shell { padding: 48px 28px 32px; border-radius: 28px; }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 460px) {
          .footer-top { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="footer-shell">
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <a href="/#hero" className="footer-brand-lockup">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>ITQAAN</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>Creative Agency</span>
            </a>
            <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--color-ink-48)', maxWidth: '260px', margin: 0 }}>
              Web design, brand identity, and graphic design for established Muslim businesses that want a premium brand presence.
            </p>
            <a href="/quote" className="footer-cta">
              Get a quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.heading}>
              <p className="footer-colhead">{col.heading}</p>
              <ul className="footer-list">
                {col.links.map(l => {
                  const external = 'external' in l && l.external === true
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="footer-link"
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer', 'data-wa-loc': 'footer' } : {})}
                      >
                        {l.label}
                        {external && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

        </div>

        {/* Ghost wordmark */}
        <div className="footer-wordmark" aria-hidden="true">ITQAAN</div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--color-ink-28)', margin: 0 }}>
            &copy; {year} ITQAAN. Built with excellence.
          </p>
          <div className="footer-legal">
            <a href="/privacy" className="footer-link" style={{ fontSize: '0.75rem' }}>Privacy Policy</a>
            <a href="/terms" className="footer-link" style={{ fontSize: '0.75rem' }}>Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
