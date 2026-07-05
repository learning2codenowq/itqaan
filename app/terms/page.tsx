import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | ITQAAN',
  description:
    'The terms under which ITQAAN provides web design, branding, and related services: fixed prices, 50/50 payment, revisions within scope, and full ownership on handover.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
}

const sections = [
  {
    h2: 'What we provide',
    body: [
      'ITQAAN provides web design, e-commerce development, brand identity, graphic design, SEO and GEO services, and monthly care plans, delivered remotely to clients in the UAE and worldwide.',
    ],
  },
  {
    h2: 'Quotes and pricing',
    body: [
      'Every project starts with a written quote at a fixed price. The price you accept is the price you pay: no hidden fees, and no charges added during the project. Work beyond the agreed scope, such as extra pages or new features, is quoted separately at a fixed price before it begins.',
      'Quotes are valid for 30 days from the date they are issued.',
    ],
  },
  {
    h2: 'Payment',
    body: [
      'Projects begin with a 50% deposit. The remaining 50% is due when you approve the finished work, before it goes live or final files are handed over. Monthly plans, such as the care plan or monthly SEO, are billed monthly and can be cancelled any month with no cancellation fee.',
    ],
  },
  {
    h2: 'Revisions',
    body: [
      'Revision rounds are not limited to a fixed number. We keep refining the work within the agreed project scope until you are happy with the outcome. Requests that change the scope itself, such as a different site structure or additional deliverables, are quoted separately before any work starts.',
    ],
  },
  {
    h2: 'Your responsibilities',
    body: [
      'You provide the content and materials for the project, such as text, photos, and logos, or engage us to help create them, and you confirm you have the right to use everything you provide. You are responsible for the accuracy of business information published on your site and for your own legal compliance, such as licences and product claims.',
    ],
  },
  {
    h2: 'Ownership',
    body: [
      'Once the final payment is made, everything is yours: the design, the code, the content we created for the project, the domain, and all accounts and logins. We may show the finished work in our portfolio unless you ask us not to.',
    ],
  },
  {
    h2: 'Care plans and third parties',
    body: [
      'Care plans cover the work described at the time of purchase, such as small content updates, monitoring, and support. Third-party costs, such as domain registration, hosting fees, or paid plugins, are separate from our fees and are always agreed with you before they are incurred.',
    ],
  },
  {
    h2: 'Liability',
    body: [
      'We build carefully and test before launch. Our liability for any claim related to a project is limited to the amount you paid for that project. We are not liable for indirect losses such as lost profits, or for outages and changes caused by third-party services outside our control.',
    ],
  },
  {
    h2: 'Changes to these terms',
    body: [
      'If these terms change, the updated version will be posted on this page. The terms in place when you accept a quote are the ones that apply to that project. Questions? Email hello@withitqaan.com.',
    ],
  },
]

export default function TermsPage() {
  return (
    <main style={{ minHeight: '100svh', background: 'var(--color-void)' }}>
      <style>{`@media (max-width: 600px) { .legal-wrap { padding: 48px 20px 32px !important; } }`}</style>

      <header style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-ink-8)', background: 'rgba(2,2,2,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>ITQAAN</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>Creative Agency</span>
          </Link>
          <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            Get a quote
          </Link>
        </div>
      </header>

      <article className="legal-wrap" style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 32px 64px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 44px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 16px' }}>
          Terms of service
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: '0 0 32px' }}>
          ITQAAN, withitqaan.com
        </p>
        <p style={{ fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--color-ink-72)', margin: '0 0 8px' }}>
          The short version: fixed prices in writing, 50% to start and 50% when you approve, revisions within scope until you are happy, and everything belongs to you at the end.
        </p>

        {sections.map(s => (
          <section key={s.h2} style={{ marginTop: '44px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 14px' }}>{s.h2}</h2>
            {s.body.map((p, i) => (
              <p key={i} style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 14px' }}>{p}</p>
            ))}
          </section>
        ))}
      </article>

      <Footer />
    </main>
  )
}
