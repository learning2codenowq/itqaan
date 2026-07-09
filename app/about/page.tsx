import Link from 'next/link'
import type { Metadata } from 'next'
import Footer from '@/components/sections/Footer'
import { AUTHOR, AUTHOR_ID, authorSchemaNode } from '@/lib/author'

const BASE = 'https://withitqaan.com'

export const metadata: Metadata = {
  title: 'About Shayan Qureshi | Founder of ITQAAN',
  description:
    'ITQAAN is the work of Shayan Qureshi, a Sharjah-raised, self-taught designer with over a decade building websites, brands, and campaigns for Muslim businesses. Halal by default, no music, no images of women, seen by hundreds of millions.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Shayan Qureshi | Founder of ITQAAN',
    description:
      'Over a decade of premium, halal creative work for Muslim businesses across the UAE, the GCC, and Europe.',
    url: '/about',
    type: 'profile',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${BASE}/about`,
      url: `${BASE}/about`,
      name: 'About Shayan Qureshi | Founder of ITQAAN',
      isPartOf: { '@id': `${BASE}/#website` },
      about: { '@id': AUTHOR_ID },
      mainEntity: { '@id': AUTHOR_ID },
      breadcrumb: { '@id': `${BASE}/about#breadcrumb` },
    },
    authorSchemaNode,
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE}/about#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${BASE}/about` },
      ],
    },
  ],
}

const sections = [
  {
    h2: 'The standard behind the name',
    body: [
      'The word itqaan appears in the Quran and in the words of the Prophet ﷺ, who taught that Allah loves that when one of you does a work, he does it with itqaan, with excellence and care.',
      'Shayan came across this hadith after years of already working that way: taking his time, obsessing over the detail, refusing to hand over anything he was not proud of. The hadith named the standard he already held, and it became the name of the studio. He works to embody it in every part of life, not only in the professional work.',
    ],
  },
  {
    h2: 'Self-taught, from the very first project',
    body: [
      'Shayan taught himself Photoshop on his own early projects, then taught it to others. Graphic design came first, then freelance clients, then web design and video editing. The last five years brought his strongest work and his highest-paying clients.',
      'Today he designs and builds websites, brand identities, graphic design. A client works with one person who understands how every piece fits together, not a chain of handoffs between strangers.',
    ],
  },
  {
    h2: 'Halal by default, and it still outperforms',
    body: [
      'Every project is built the halal way: no music, no images of women, and honest fixed pricing. Most agencies lean on music and women to make work perform, and treat anything else as a handicap.',
      'Shayan’s work has been seen by hundreds of millions of views and impressions online without either. The discipline is the skill. Working within these limits forces sharper ideas, stronger design, and closer attention to the details that move results, alhamdulillah. Clients get work that respects their deen and beats what the shortcut would have produced.',
    ],
  },
  {
    h2: 'Rooted in Sharjah, working across the world',
    body: [
      'Shayan was raised in Sharjah and knows the UAE market from the inside. He has delivered work for major clients across the UAE, the wider GCC, and Europe, including Saudi Arabia, Oman, the UK, Sweden, and Ireland.',
      'Everything runs remotely over WhatsApp, email, and screen shares, so distance never changes the standard or the price.',
    ],
  },
  {
    h2: 'What working with ITQAAN feels like',
    body: [
      'Calm and unhurried. A client is working with one professional who has over a decade of experience and a record of results behind him.',
      'The pace is steady, the communication is direct, and the details are handled, so the business owner stays free to run the business.',
    ],
  },
]

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100svh', background: 'var(--color-void)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-ink-8)', background: 'rgba(2,2,2,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>ITQAAN</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>Creative Agency</span>
          </Link>
          <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            Get a quote
          </Link>
        </div>
      </header>

      <article style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 32px 40px' }}>
        <style>{`
          @media (max-width: 760px) {
            .about-hero { grid-template-columns: 1fr !important; gap: 36px !important; }
            .about-photo { max-width: 280px; }
            .about-wrap { padding: 48px 20px 32px !important; }
          }
          .about-body { max-width: 680px; }
        `}</style>

        <div className="about-wrap">
          {/* Hero */}
          <div className="about-hero" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '72px' }}>
            <div>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
                <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
                About ITQAAN
              </p>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 24px' }}>
                Halal and premium were never a trade-off.
              </h1>
              <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)', margin: 0 }}>
                ITQAAN is the work of Shayan Qureshi, a self-taught designer raised in Sharjah who has spent over a decade building websites, brands, and campaigns for Muslim businesses. All of it without music, without images of women, and seen by hundreds of millions.
              </p>
            </div>

            <figure style={{ margin: 0 }}>
              <div className="about-photo" style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5', borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)' }}>
                <img src={AUTHOR.image} alt={`${AUTHOR.name}, founder of ITQAAN`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', marginTop: '12px', lineHeight: 1.5 }}>
                {AUTHOR.name}, founder of ITQAAN. Over a decade of halal creative work.
              </figcaption>
            </figure>
          </div>

          {/* Body sections */}
          <div className="about-body">
            {sections.map((s, i) => (
              <section key={i} style={{ marginBottom: '48px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 18px', lineHeight: 1.2 }}>
                  {s.h2}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 16px' }}>{p}</p>
                ))}
              </section>
            ))}

            {/* Proof, linked out */}
            <section style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid var(--color-ink-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 16px' }}>
                See the work, hear from clients
              </h2>
              <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 22px' }}>
                The clearest measure of a standard is the work it produces and the people it is produced for.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', borderRadius: '9999px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', color: 'var(--color-ink-72)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}>
                  View recent work
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
                </Link>
                <Link href="/#testimonials" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', borderRadius: '9999px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', color: 'var(--color-ink-72)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}>
                  Read client stories
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
                </Link>
              </div>
            </section>

            {/* Bottom CTA */}
            <div style={{ marginTop: '56px', padding: '36px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px' }}>Start your project with itqaan</h2>
              <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 24px' }}>Build your quote in under a minute and get a fixed price within 24 hours.</p>
              <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                Get a quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
