'use client'

import { readyServices } from '@/lib/serviceNav'

const navLinks = [
  { label: 'Portfolio',       href: '/portfolio' },
  { label: 'How we work',     href: '/how-we-work' },
  { label: 'Pricing',         href: '/pricing'  },
  { label: 'Problems we solve', href: '/problems-we-solve' },
  { label: 'Blog',            href: '/blog'     },
  { label: 'FAQ',             href: '/faq'      },
]

const seoLinks = [
  { label: 'Web design in Dubai',          href: '/web-design-dubai' },
  { label: 'Web design in Abu Dhabi',      href: '/web-design-abu-dhabi' },
  { label: 'Web design in the UAE',        href: '/web-design-uae' },
  { label: 'Websites for Muslim businesses', href: '/websites-for-muslim-businesses' },
  { label: 'Websites for Quran academies', href: '/websites-for-quran-academies' },
]

const contactLinks = [
  { label: 'Get a quote', href: '/quote' },
  { label: 'WhatsApp',    href: 'https://wa.me/923165252296', external: true },
  { label: 'Instagram',   href: 'https://www.instagram.com/withitqaan', external: true },
  { label: 'Email us',    href: 'mailto:hello@withitqaan.com' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(178,213,229,0.08)', padding: '64px 64px 40px', background: 'var(--color-void)' }}>
      <style>{`
        @media (max-width: 900px) {
          .footer-inner { padding: 48px 28px 32px !important; }
          .footer-grid  { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
          .footer-brand { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 600px) {
          .footer-inner { padding: 40px 24px 28px !important; }
          .footer-grid  { grid-template-columns: 1fr !important; }
          .footer-brand { grid-column: auto !important; }
        }
        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          color: rgba(178,213,229,0.48);
          text-decoration: none;
          transition: color 0.25s ease;
          font-weight: 300;
        }
        .footer-link:hover { color: rgba(178,213,229,0.9); }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '64px' }}>

          {/* Brand */}
          <div className="footer-brand">
            <a href="/#hero" style={{ textDecoration: "none", display: "inline-flex", alignItems: "baseline", gap: "8px", marginBottom: "16px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(178,213,229,0.7)" }}>ITQAAN</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-ink-28)" }}>Creative Agency</span>
            </a>
            <p style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--color-ink-48)', maxWidth: '280px', margin: '0 0 24px' }}>
              Web design, brand identity, and graphic design
              for established Muslim businesses that want
              a premium brand presence.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '8px 18px' }}>
              {seoLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="footer-link" style={{ fontSize: '0.8rem' }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: '0 0 20px' }}>
              Services
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {readyServices.map(s => (
                <li key={s.slug}>
                  <a href={s.href} className="footer-link">{s.label}</a>
                </li>
              ))}
              <li>
                <a href="/services" className="footer-link">All services</a>
              </li>
            </ul>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: '0 0 20px' }}>
              Navigate
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="footer-link">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: '0 0 20px' }}>
              Contact
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contactLinks.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="footer-link"
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer', 'data-wa-loc': 'footer' } : {})}
                  >
                    {l.label}
                    {l.external && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '28px', borderTop: '1px solid rgba(178,213,229,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--color-ink-28)', margin: 0 }}>
            &copy; {year} ITQAAN. Built with excellence.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--color-ink-18)', margin: 0, fontStyle: 'italic' }}>
            The details matter.
          </p>
        </div>
      </div>
    </footer>
  )
}