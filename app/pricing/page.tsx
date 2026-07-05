import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import ScarcityBadge from '@/components/ui/ScarcityBadge'
import { siteTypes, brandScopes, graphicItems, seoPlans, carePlan, packages, EXTRA_PAGE_PRICE, formatPrice } from '@/lib/quote'
import type { Option } from '@/lib/quote'

const BASE = 'https://withitqaan.com'

export const metadata: Metadata = {
  title: 'Pricing | Fixed Halal Prices From 997 AED | ITQAAN',
  description:
    'All ITQAAN prices in one place: websites from 997 AED, online stores from 4,497 AED, branding from 797 AED, SEO from 797 AED, graphic design from 397 AED, care plans from 147 AED per month. Fixed, no hidden fees.',
  alternates: { canonical: '/pricing' },
}

/* Every price on this page comes from lib/quote.ts. Update prices there only. */

const groups: { title: string; blurb: string; options: Option[]; serviceHref: string }[] = [
  {
    title: 'Websites',
    blurb: 'Custom, mobile-first, and SEO-ready. Every website is designed around your business, never a template.',
    options: siteTypes,
    serviceHref: '/services/web-design',
  },
  {
    title: 'Brand identity',
    blurb: 'From a single strong logo to a complete brand system with guidelines.',
    options: brandScopes,
    serviceHref: '/services/branding',
  },
  {
    title: 'Graphic design',
    blurb: 'Per-item pricing. Combine what you need and get one fixed quote.',
    options: graphicItems,
    serviceHref: '/services/graphic-design',
  },
  {
    title: 'SEO & GEO',
    blurb: 'Get found on Google and recommended by AI assistants. No lock-in contracts.',
    options: seoPlans,
    serviceHref: '/services/seo-geo',
  },
  {
    title: 'Care plan',
    blurb: 'Updates, monitoring, and direct support after launch. Cancel any month.',
    options: [carePlan],
    serviceHref: '/services/care-plans',
  },
]

/* Map an option to a /quote preselect where one exists. */
function quoteHrefFor(option: Option): string {
  const pkg = packages.find(p => p.choice === option.id || p.id === option.id)
  return pkg ? `/quote?plan=${pkg.id}` : '/quote'
}

function priceLabel(o: Option): string {
  if (o.price) return formatPrice(o.price)
  if (o.monthly) return `${formatPrice(o.monthly)} / mo`
  return ''
}

export default function PricingPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        name: 'ITQAAN pricing',
        url: `${BASE}/pricing`,
        itemListElement: groups.flatMap(g =>
          g.options.map(o => ({
            '@type': 'Offer',
            name: `${g.title}: ${o.label}`,
            price: o.price ?? o.monthly,
            priceCurrency: 'AED',
            ...(o.desc ? { description: o.desc } : {}),
          })),
        ),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${BASE}/pricing` },
        ],
      },
    ],
  }

  return (
    <main style={{ minHeight: '100svh', background: 'var(--color-void)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <style>{`
        .pr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 900px) { .pr-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) {
          .pr-grid { grid-template-columns: 1fr; }
          .pr-wrap { padding: 48px 20px 32px !important; }
        }
        .pr-card {
          display: flex; flex-direction: column; padding: 24px 22px; border-radius: 16px;
          border: 1px solid var(--color-ink-10); background: var(--color-ink-3); text-decoration: none;
          transition: border-color .25s ease;
        }
        .pr-card:hover { border-color: var(--color-ember-18); }
      `}</style>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-ink-8)', background: 'rgba(2,2,2,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>ITQAAN</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>Creative Agency</span>
          </Link>
          <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            Get a quote
          </Link>
        </div>
      </header>

      <section className="pr-wrap" style={{ maxWidth: '1040px', margin: '0 auto', padding: '72px 32px 40px' }}>
        <ScarcityBadge style={{ marginBottom: '24px' }} />
        <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
          <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
          Pricing
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 24px', maxWidth: '760px' }}>
          Every price, fixed and in the open
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)', margin: '0 0 16px', maxWidth: '700px' }}>
          These are the starting prices for everything we do. After one short conversation you get an exact fixed price for your situation, in writing. No hidden fees, and what we agree is what you pay.
        </p>

        {groups.map(g => (
          <section key={g.title} style={{ marginTop: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: 0 }}>{g.title}</h2>
              <Link href={g.serviceHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-ember)', textDecoration: 'none' }}>
                About this service
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
              </Link>
            </div>
            <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-48)', margin: '0 0 22px', maxWidth: '640px' }}>{g.blurb}</p>
            <div className="pr-grid">
              {g.options.map(o => (
                <Link key={o.id} href={quoteHrefFor(o)} className="pr-card" data-cta="pricing_page_card">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 4px' }}>{o.label}</h3>
                  {o.desc && <p style={{ fontSize: '0.82rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 16px', lineHeight: 1.5 }}>{o.desc}</p>}
                  <p style={{ margin: 'auto 0 0', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    {o.from && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>From</span>}
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>{priceLabel(o)}</span>
                  </p>
                </Link>
              ))}
            </div>
            {g.title === 'Websites' && (
              <p style={{ fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-48)', margin: '18px 0 0' }}>
                Extra pages beyond the agreed scope are {formatPrice(EXTRA_PAGE_PRICE)} each, agreed before they are added.
              </p>
            )}
          </section>
        ))}

        {/* Bottom CTA */}
        <div style={{ marginTop: '72px', padding: '40px 36px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px' }}>Get your exact price</h2>
          <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 24px' }}>Build your quote in under a minute and get a fixed price in writing within 24 hours.</p>
          <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
            Get a quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
