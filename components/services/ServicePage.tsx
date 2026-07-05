import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import ScarcityBadge from '@/components/ui/ScarcityBadge'
import { getService } from '@/lib/services'
import { getProject } from '@/lib/projects'
import { packages, brandScopes, graphicItems, seoPlans, carePlan, formatPrice } from '@/lib/quote'

const BASE = 'https://withitqaan.com'
const WHATSAPP = 'https://wa.me/923165252296'

/*
 * Renders one detailed service page from lib/services.ts. Server component, so
 * all copy ships in the initial HTML for crawlers and AI assistants. Every
 * block is optional; lighter services simply omit blocks in their data entry.
 * Prices in the pricing tiers come live from lib/quote.ts, never hardcoded.
 */

const optionSets = { brandScopes, graphicItems, seoPlans } as const

const guarantees = [
  { title: 'Fixed price', desc: 'The price we agree on is the price you pay. No hidden fees, no scope games.' },
  { title: 'Not done until you are happy', desc: 'Your feedback shapes the process, and we keep refining within the agreed scope until you are happy with the outcome.' },
  { title: 'You own everything', desc: 'Files, code, accounts and logins. It is all handed to you and it is all yours.' },
  { title: 'Support after launch', desc: 'We stay reachable once your project is live. You are never left to figure it out alone.' },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 18px' }}>
      <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
      {children}
    </p>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.4vw, 38px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 18px' }}>
      {children}
    </h2>
  )
}

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function CheckIcon({ color = 'var(--color-ember)' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: '4px' }}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-28)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: '4px' }}>
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  )
}

export default function ServicePage({ slug }: { slug: string }) {
  const page = getService(slug)
  if (!page) return null

  const quoteHref = page.quotePlan ? `/quote?plan=${page.quotePlan}` : '/quote'
  const pricingPackages = page.pricing?.packageIds
    ?.map(id => packages.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const pricingOptions = page.pricing?.optionSet ? optionSets[page.pricing.optionSet] : undefined
  const proofProjects = (page.projectSlugs ?? [])
    .map(getProject)
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const testimonials = proofProjects.filter(p => p.testimonial).slice(0, 3)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: page.serviceName,
        serviceType: page.serviceName,
        provider: { '@type': 'ProfessionalService', name: 'ITQAAN', url: BASE },
        areaServed: page.areaServed,
        url: `${BASE}/services/${page.slug}`,
        description: page.metaDescription,
        ...(pricingPackages && pricingPackages.length > 0
          ? {
              offers: pricingPackages.map(p => ({
                '@type': 'Offer',
                name: p.name,
                price: p.price,
                priceCurrency: 'AED',
                description: p.desc,
              })),
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/services` },
          { '@type': 'ListItem', position: 3, name: page.serviceName, item: `${BASE}/services/${page.slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <main style={{ minHeight: '100svh', background: 'var(--color-void)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <style>{`
        .svc-wrap { max-width: 1040px; margin: 0 auto; padding: 72px 32px 40px; }
        .svc-prose { max-width: 760px; }
        .svc-section { margin-top: 88px; }
        .svc-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .svc-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .svc-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .svc-cta {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px;
          border-radius: 9999px; background: var(--color-ink); color: var(--color-void);
          font-size: 0.9rem; font-weight: 600; text-decoration: none; white-space: nowrap;
        }
        .svc-cta-ghost {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px;
          border-radius: 9999px; border: 1px solid var(--color-ink-18); background: var(--color-ink-3);
          color: var(--color-ink-72); font-size: 0.9rem; font-weight: 500; text-decoration: none; white-space: nowrap;
        }
        .svc-card { padding: 28px 24px; border-radius: 16px; border: 1px solid var(--color-ink-10); background: var(--color-ink-3); }
        .svc-table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; border: 1px solid var(--color-ink-10); border-radius: 16px; }
        .svc-table { width: 100%; border-collapse: collapse; min-width: 720px; font-size: 0.875rem; }
        .svc-table th, .svc-table td { padding: 14px 18px; text-align: left; border-bottom: 1px solid var(--color-ink-8); vertical-align: top; }
        .svc-table tr:last-child td { border-bottom: none; }
        .svc-header-link { color: var(--color-ink-48); font-size: 0.85rem; font-weight: 500; text-decoration: none; transition: color .2s ease; white-space: nowrap; }
        .svc-header-link:hover { color: var(--color-ink); }
        @media (max-width: 900px) {
          .svc-grid-3, .svc-grid-4 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .svc-wrap { padding: 48px 20px 32px; }
          .svc-section { margin-top: 64px; }
          .svc-grid-2, .svc-grid-3, .svc-grid-4 { grid-template-columns: 1fr; }
          .svc-header-nav { display: none; }
        }
      `}</style>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-ink-8)', background: 'rgba(2,2,2,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>ITQAAN</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>Creative Agency</span>
          </Link>
          <nav className="svc-header-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/services" className="svc-header-link">Services</Link>
            <Link href="/portfolio" className="svc-header-link">Portfolio</Link>
            <Link href="/pricing" className="svc-header-link">Pricing</Link>
            <Link href="/faq" className="svc-header-link">FAQ</Link>
          </nav>
          <Link href={quoteHref} data-cta="service_header" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Get a quote
          </Link>
        </div>
      </header>

      <article className="svc-wrap">
        {/* Hero */}
        <div className="svc-prose">
          <ScarcityBadge style={{ marginBottom: '24px' }} />
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 24px' }}>
            {page.h1}
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)', margin: '0 0 24px' }}>
            {page.intro}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {page.heroBullets.map(b => (
              <li key={b} style={{ display: 'flex', gap: '10px', fontSize: '0.95rem', fontWeight: 400, color: 'var(--color-ink-72)', lineHeight: 1.5 }}>
                <CheckIcon />
                {b}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Link href={quoteHref} className="svc-cta" data-cta="service_hero">
              Get your fixed price
              <ArrowIcon />
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" data-wa-loc={`service_${page.slug}`} className="svc-cta-ghost">
              WhatsApp us, reply within 24h
            </a>
          </div>
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="svc-section">
            <Eyebrow>What clients say</Eyebrow>
            <div className="svc-grid-3">
              {testimonials.map(p => (
                <figure key={p.slug} className="svc-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <blockquote style={{ margin: 0, fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)' }}>
                    &ldquo;{p.testimonial!.quote}&rdquo;
                  </blockquote>
                  <figcaption style={{ marginTop: 'auto' }}>
                    <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-ink)' }}>{p.testimonial!.author}</span>
                    <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', marginTop: '4px' }}>{p.testimonial!.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Comparison table */}
        {page.comparison && (
          <section className="svc-section">
            <Eyebrow>Compare honestly</Eyebrow>
            <H2>{page.comparison.h2}</H2>
            <p className="svc-prose" style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 28px' }}>{page.comparison.sub}</p>
            <div className="svc-table-scroll">
              <table className="svc-table">
                <thead>
                  <tr>
                    <th style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', fontWeight: 500 }}> </th>
                    {page.comparison.columns.map((c, i) => (
                      <th key={c} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: i === 0 ? 'var(--color-ember)' : 'var(--color-ink-72)', background: i === 0 ? 'var(--color-ember-dim)' : 'transparent', whiteSpace: 'nowrap' }}>
                        {i === 0 ? `★ ${c}` : c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.comparison.rows.map(row => (
                    <tr key={row.label}>
                      <td style={{ color: 'var(--color-ink-48)', fontWeight: 400, whiteSpace: 'nowrap' }}>{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} style={{ color: i === 0 ? 'var(--color-ink)' : 'var(--color-ink-48)', fontWeight: i === 0 ? 500 : 300, background: i === 0 ? 'var(--color-ember-dim)' : 'transparent' }}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Project proof grid */}
        {proofProjects.length > 0 && (
          <section className="svc-section">
            <Eyebrow>Recent work</Eyebrow>
            <H2>Built for businesses like yours.</H2>
            <div className="svc-grid-3" style={{ marginTop: '28px' }}>
              {proofProjects.map(p => (
                <div key={p.slug}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-ink-10)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/projects/${p.slug}.webp`}
                      alt={`${p.name} website by ITQAAN`}
                      loading="lazy"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-ink)' }}>{p.name}</p>
                  <p style={{ margin: '2px 0 0', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>{p.category}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Problem / urgency */}
        {page.problem && (
          <section className="svc-section svc-prose">
            <Eyebrow>Why it matters</Eyebrow>
            <H2>{page.problem.h2}</H2>
            {page.problem.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 16px' }}>{p}</p>
            ))}
          </section>
        )}

        {/* What we don't do / what we do */}
        {page.notWe && (
          <section className="svc-section">
            <Eyebrow>Our approach</Eyebrow>
            <H2>{page.notWe.h2}</H2>
            <div className="svc-grid-2" style={{ marginTop: '28px', alignItems: 'stretch' }}>
              <div className="svc-card">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 18px' }}>{page.notWe.dontHeading}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {page.notWe.dont.map(d => (
                    <li key={d} style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-ink-48)' }}>
                      <CrossIcon />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="svc-card" style={{ border: '1px solid var(--color-ember-18)', background: 'var(--color-ember-dim)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 18px' }}>{page.notWe.doHeading}</h3>
                {page.notWe.doParagraphs.map((p, i) => (
                  <p key={i} style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)', margin: '0 0 14px' }}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process */}
        {page.processSteps && page.processSteps.length > 0 && (
          <section className="svc-section">
            <Eyebrow>The process</Eyebrow>
            <H2>How your project goes, step by step.</H2>
            <p className="svc-prose" style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 28px' }}>
              From you it takes less than an hour of total time. We handle everything else.
            </p>
            <div className="svc-grid-4">
              {page.processSteps.map((s, i) => (
                <div key={s.title} className="svc-card">
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em', color: 'var(--color-ink-28)', margin: '0 0 14px' }}>0{i + 1}</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px', lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--color-ink-48)', margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fit check */}
        {page.fit && (
          <section className="svc-section">
            <Eyebrow>For who?</Eyebrow>
            <H2>{page.fit.h2}</H2>
            <p className="svc-prose" style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 28px' }}>{page.fit.sub}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {page.fit.rows.map(r => (
                <div key={r.tag} className="svc-grid-2" style={{ gap: '14px' }}>
                  <div className="svc-card" style={{ padding: '20px 22px' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ember)', margin: '0 0 10px' }}>For you &middot; {r.tag}</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--color-ink-72)', margin: 0 }}>{r.forYou}</p>
                  </div>
                  <div className="svc-card" style={{ padding: '20px 22px', background: 'transparent' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: '0 0 10px' }}>Not for you</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--color-ink-48)', margin: 0 }}>{r.notForYou}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deliverables */}
        {page.deliverables && (
          <section className="svc-section">
            <Eyebrow>Included</Eyebrow>
            <H2>{page.deliverables.h2}</H2>
            <ul className="svc-grid-2" style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', gap: '14px' }}>
              {page.deliverables.items.map(item => (
                <li key={item} style={{ display: 'flex', gap: '10px', padding: '16px 18px', borderRadius: '12px', border: '1px solid var(--color-ink-8)', background: 'var(--color-ink-3)', fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.55, color: 'var(--color-ink-72)' }}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pricing */}
        {page.pricing && (
          <section className="svc-section">
            <Eyebrow>Pricing</Eyebrow>
            <H2>{page.pricing.h2}</H2>
            <p className="svc-prose" style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 28px' }}>{page.pricing.intro}</p>

            {pricingPackages && pricingPackages.length > 0 && (
              <div className="svc-grid-3">
                {pricingPackages.map(p => (
                  <div key={p.id} className="svc-card" style={{ display: 'flex', flexDirection: 'column', gap: '0', ...(p.popular ? { border: '1px solid var(--color-ember-18)', background: 'var(--color-ember-dim)' } : {}) }}>
                    {p.popular && (
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ember)', margin: '0 0 12px' }}>Most chosen</p>
                    )}
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 6px' }}>{p.name}</h3>
                    <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 18px', lineHeight: 1.5 }}>{p.desc}</p>
                    <p style={{ margin: '0 0 20px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', display: 'block', marginBottom: '4px' }}>From</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>{formatPrice(p.price)}</span>
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {p.features.map(f => (
                        <li key={f} style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.5, color: 'var(--color-ink-48)' }}>
                          <CheckIcon />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/quote?plan=${p.id}`} className="svc-cta" data-cta="service_pricing_card" style={{ marginTop: 'auto', justifyContent: 'center' }}>
                      Get your fixed price
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {pricingOptions && (
              <div className="svc-grid-3">
                {pricingOptions.map(o => (
                  <div key={o.id} className="svc-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 6px' }}>{o.label}</h3>
                    {o.desc && <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 18px', lineHeight: 1.5 }}>{o.desc}</p>}
                    <p style={{ margin: '0 0 20px' }}>
                      {o.from && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', display: 'block', marginBottom: '4px' }}>From</span>}
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
                        {o.price ? formatPrice(o.price) : o.monthly ? `${formatPrice(o.monthly)} / mo` : ''}
                      </span>
                    </p>
                    <Link href="/quote" className="svc-cta" data-cta="service_pricing_card" style={{ marginTop: 'auto', justifyContent: 'center' }}>
                      Get your fixed price
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {page.pricing.showCarePlan && (
              <div className="svc-grid-3">
                <div className="svc-card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--color-ember-18)', background: 'var(--color-ember-dim)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 6px' }}>{carePlan.label}</h3>
                  {carePlan.desc && <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 18px', lineHeight: 1.5 }}>{carePlan.desc}</p>}
                  <p style={{ margin: '0 0 20px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', display: 'block', marginBottom: '4px' }}>From</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
                      {carePlan.monthly ? `${formatPrice(carePlan.monthly)} / mo` : ''}
                    </span>
                  </p>
                  <Link href="/quote" className="svc-cta" data-cta="service_pricing_card" style={{ marginTop: 'auto', justifyContent: 'center' }}>
                    Get your fixed price
                  </Link>
                </div>
              </div>
            )}

            {page.pricing.note && (
              <p className="svc-prose" style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-48)', margin: '24px 0 0' }}>{page.pricing.note}</p>
            )}
          </section>
        )}

        {/* Guarantees */}
        {page.showGuarantees && (
          <section className="svc-section">
            <Eyebrow>Our guarantees</Eyebrow>
            <H2>What you can expect, every time.</H2>
            <div className="svc-grid-4" style={{ marginTop: '28px' }}>
              {guarantees.map((g, i) => (
                <div key={g.title} className="svc-card">
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em', color: 'var(--color-ink-28)', margin: '0 0 14px' }}>0{i + 1}</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px', lineHeight: 1.3 }}>{g.title}</h3>
                  <p style={{ fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--color-ink-48)', margin: 0 }}>{g.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Aftercare */}
        {page.aftercare && (
          <section className="svc-section svc-prose">
            <Eyebrow>After launch</Eyebrow>
            <H2>{page.aftercare.h2}</H2>
            {page.aftercare.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 20px' }}>{p}</p>
            ))}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {page.aftercare.items.map(item => (
                <li key={item} style={{ display: 'flex', gap: '10px', fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.55, color: 'var(--color-ink-72)' }}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Two options close */}
        {page.twoOptions && (
          <section className="svc-section">
            <Eyebrow>Decide</Eyebrow>
            <H2>{page.twoOptions.h2}</H2>
            <div className="svc-grid-2" style={{ marginTop: '28px' }}>
              <div className="svc-card" style={{ background: 'transparent' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: '0 0 8px' }}>Option 1</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-ink-72)', margin: '0 0 16px' }}>{page.twoOptions.stayTitle}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {page.twoOptions.stay.map(s => (
                    <li key={s} style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-ink-48)' }}>
                      <CrossIcon />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="svc-card" style={{ border: '1px solid var(--color-ember-18)', background: 'var(--color-ember-dim)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ember)', margin: '0 0 8px' }}>Option 2</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 16px' }}>{page.twoOptions.moveTitle}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {page.twoOptions.move.map(s => (
                    <li key={s} style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-ink-72)' }}>
                      <CheckIcon />
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href={quoteHref} className="svc-cta" data-cta="service_two_options">
                  Get your fixed price
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* FAQ (visible for AEO) */}
        <section className="svc-section svc-prose">
          <Eyebrow>FAQ</Eyebrow>
          <H2>Common questions</H2>
          {page.faqs.map((f, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--color-ink-8)', padding: '24px 0' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-ink)', margin: '0 0 10px' }}>{f.q}</h3>
              <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--color-ink-48)', margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </section>

        {/* Related pages */}
        {page.related.length > 0 && (
          <section className="svc-section svc-prose" style={{ marginTop: '64px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 20px' }}>Keep reading</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {page.related.map(r => (
                <li key={r.href}>
                  <Link href={r.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '9999px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', color: 'var(--color-ink-72)', fontSize: '0.82rem', fontWeight: 500, textDecoration: 'none' }}>
                    {r.label}
                    <ArrowIcon size={12} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bottom CTA */}
        <div style={{ marginTop: '64px', padding: '40px 36px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px' }}>Ready to start?</h2>
          <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 24px' }}>Build your quote in under a minute and get a fixed price within 24 hours.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href={quoteHref} className="svc-cta" data-cta="service_bottom">
              Get a quote
              <ArrowIcon />
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" data-wa-loc={`service_${page.slug}_bottom`} className="svc-cta-ghost">
              WhatsApp us
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
