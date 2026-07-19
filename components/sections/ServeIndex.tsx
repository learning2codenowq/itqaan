// components/sections/ServeIndex.tsx
//
// In-content internal-link section on the homepage. The footer belt already
// links every landing page sitewide, but an in-body link from the homepage (the
// site's highest-authority page) with descriptive anchor text carries more
// weight for crawl discovery and helps the "Discovered - currently not indexed"
// landings get picked up. Server component, so the links are in the initial HTML.
//
// Curated on purpose: a focused set of priority areas + industries concentrates
// link equity better than dumping all 24 landings here. Keep this list short.

import Link from 'next/link'

const areas: { label: string; href: string }[] = [
  { label: 'Web design in Dubai', href: '/web-design-dubai' },
  { label: 'Web design in Abu Dhabi', href: '/web-design-abu-dhabi' },
  { label: 'Web design in Sharjah', href: '/web-design-sharjah' },
  { label: 'Web design across the UAE', href: '/web-design-uae' },
]

const industries: { label: string; href: string }[] = [
  { label: 'Websites for Muslim businesses', href: '/websites-for-muslim-businesses' },
  { label: 'Websites for Quran academies', href: '/websites-for-quran-academies' },
  { label: 'Websites for restaurants', href: '/websites-for-restaurants' },
  { label: 'Websites for real estate', href: '/websites-for-real-estate' },
  { label: 'Websites for dental clinics', href: '/websites-for-dental-clinics' },
  { label: 'Websites for e-commerce brands', href: '/websites-for-ecommerce-brands' },
]

const groups = [
  { heading: 'By area', links: areas },
  { heading: 'By industry', links: industries },
]

export default function ServeIndex() {
  return (
    <section
      aria-label="Where and who we build websites for"
      style={{ position: 'relative', background: 'var(--color-void)', padding: '0 24px 64px' }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          borderTop: '1px solid var(--color-ink-8)',
          paddingTop: '56px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-48)',
            margin: '0 0 14px',
          }}
        >
          Explore
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 3.4vw, 38px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: 'var(--color-ink)',
            margin: '0 0 12px',
            maxWidth: '640px',
          }}
        >
          Websites for your city and your industry
        </h2>
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--color-ink-48)',
            margin: '0 0 40px',
            maxWidth: '640px',
          }}
        >
          We design fast, mobile-first websites for Muslim businesses across the
          UAE, at a fixed price from 997 AED. Start with the page closest to your
          business.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
          }}
        >
          {groups.map(group => (
            <div key={group.heading}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-72)',
                  margin: '0 0 18px',
                }}
              >
                {group.heading}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.links.map(l => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.95rem',
                        fontWeight: 400,
                        color: 'var(--color-ink-72)',
                        textDecoration: 'none',
                      }}
                    >
                      {l.label}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
