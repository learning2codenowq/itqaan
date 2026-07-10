import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import ScarcityBadge from '@/components/ui/ScarcityBadge'

const BASE = 'https://withitqaan.com'
const WHATSAPP = 'https://wa.me/923165252296'

export const metadata: Metadata = {
  title: 'How We Work | Less Than an Hour of Your Time | ITQAAN',
  description:
    'How an ITQAAN project works: one short conversation, a fixed price in writing, your first design within days, and unlimited revisions until you are happy. 50% deposit, the rest when you approve.',
  alternates: { canonical: '/how-we-work' },
}

const steps = [
  {
    title: 'One short conversation',
    time: 'About 15 minutes',
    body: 'A WhatsApp chat or a quick call about your business, your customers, and what you want the project to achieve. By the end of it you have a fixed price in writing. No obligation, no pressure, and no meetings marathon.',
  },
  {
    title: 'You send what you have',
    time: '15 to 30 minutes',
    body: 'Your logo if you have one, any text or a rough idea of it, and photos of your work. Content not ready? We help write it. This is genuinely the biggest part of what we need from you.',
  },
  {
    title: 'We design, you react',
    time: 'A few minutes per round',
    body: 'Your first design arrives within days. You tell us what feels right and what does not, in plain words, and we refine it. Unlimited revision rounds within the agreed scope, until you are happy.',
  },
  {
    title: 'Launch, and we stay reachable',
    time: 'Zero effort from you',
    body: 'We handle the domain, hosting setup, forms, and SEO basics, and your project goes live. Everything is handed over to you: files, code, accounts, logins. The optional care plan keeps it maintained afterwards.',
  },
]

const faqs = [
  {
    q: 'How does payment work?',
    a: 'A 50% deposit to begin, and the remaining 50% once you approve the finished work, before it goes live. The price is fixed in writing before we start and no hidden fees.',
  },
  {
    q: 'How much of my time does a project take?',
    a: 'Less than an hour in total for a typical website: a short conversation, sending your materials, and reacting to designs. We deliberately keep it that light, because you have a business to run.',
  },
  {
    q: 'How do we communicate during the project?',
    a: 'Mostly WhatsApp, plus email and screen shares when useful. You talk directly to the person building your project, not an account manager, and you see the work at every stage.',
  },
  {
    q: 'What if I do not like the design?',
    a: 'You tell us, plainly. Revision rounds are unlimited within the agreed scope, and the project is not done until you are happy with it. Honest feedback makes the work better, so we ask for it.',
  },
  {
    q: 'Do you work remotely?',
    a: 'Yes, fully. We serve clients in Dubai, across the UAE, and worldwide over WhatsApp, email, and screen shares. It keeps overhead low and prices fair, without cutting quality.',
  },
]

export default function HowWeWorkPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'How we work', item: `${BASE}/how-we-work` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
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

      <style>{`@media (max-width: 600px) { .hww-wrap { padding: 48px 20px 32px !important; } }`}</style>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-ink-8)', background: 'rgba(2,2,2,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>ITQAAN</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>Creative Agency</span>
          </Link>
          <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            Work with us
          </Link>
        </div>
      </header>

      <article className="hww-wrap" style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 32px 40px' }}>
        <ScarcityBadge style={{ marginBottom: '24px' }} />
        <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 20px' }}>
          <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-ember)' }} />
          How we work
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 24px' }}>
          Less than an hour of your time, start to launch
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)', margin: '0 0 20px' }}>
          You run your business; we handle everything technical. Here is exactly what working with ITQAAN looks like, from the first message to your project going live.
        </p>

        {/* Steps */}
        <section style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {steps.map((s, i) => (
            <div key={s.title} style={{ display: 'flex', gap: '20px', padding: '26px 24px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--color-ember)', flexShrink: 0, paddingTop: '4px' }}>0{i + 1}</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>{s.title}</h2>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)' }}>{s.time}</span>
                </div>
                <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--color-ink-48)', margin: '10px 0 0' }}>{s.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Payment / halal way */}
        <section style={{ marginTop: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 18px' }}>
            Payment, the halal way
          </h2>
          <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: '0 0 16px' }}>
            The price is fixed in writing before anything starts. You pay a 50% deposit to begin, and the remaining 50% only once you approve the finished work, before it goes live. No hidden fees, no surprise invoices at the end.
          </p>
          <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-ink-48)', margin: 0 }}>
            When the project is done, everything is handed to you: design files, code, accounts, and logins. You are never locked in.
          </p>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 28px' }}>
            Common questions
          </h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--color-ink-8)', padding: '24px 0' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-ink)', margin: '0 0 10px' }}>{f.q}</h3>
              <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--color-ink-48)', margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <div style={{ marginTop: '56px', padding: '36px', borderRadius: '16px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 10px' }}>Start with the 15 minutes</h2>
          <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-ink-48)', margin: '0 0 24px' }}>Build your quote in under a minute, or message us directly on WhatsApp.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', borderRadius: '9999px', background: 'var(--color-ink)', color: 'var(--color-void)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
              Work with us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" data-wa-loc="how_we_work" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', borderRadius: '9999px', border: '1px solid var(--color-ink-18)', background: 'var(--color-ink-3)', color: 'var(--color-ink-72)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}>
              WhatsApp us
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
