import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | ITQAAN',
  description:
    'How ITQAAN collects, uses, and protects your information when you visit withitqaan.com or request a quote.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

const sections = [
  {
    h2: 'What we collect',
    body: [
      'When you request a quote or contact us, we collect what you give us: your name, email address, phone number, and the details of your project. Nothing more is asked for than what we need to respond to you.',
      'When you browse the site, we use Google Analytics to understand how visitors use it: pages visited, approximate location, and device type. This data is aggregated and does not identify you personally.',
    ],
  },
  {
    h2: 'How we use it',
    body: [
      'Your contact details are used to respond to your enquiry, prepare your quote, and deliver the project you hire us for. That is all.',
      'We do not sell your information, share it with advertisers, or add you to mailing lists you did not ask for.',
    ],
  },
  {
    h2: 'Where it goes',
    body: [
      'Quote submissions are delivered to our inbox through Resend, an email delivery service. Analytics data is processed by Google Analytics. If you contact us on WhatsApp, that conversation is handled under WhatsApp’s own terms and privacy policy.',
      'We keep enquiry information only as long as it is useful for serving you, and we delete it on request.',
    ],
  },
  {
    h2: 'Cookies',
    body: [
      'The site uses cookies set by Google Analytics to measure visits. You can block cookies in your browser settings; the site works fine without them.',
    ],
  },
  {
    h2: 'Your choices',
    body: [
      'You can ask us at any time to see, correct, or delete the information we hold about you. Email hello@withitqaan.com and we will handle it promptly.',
    ],
  },
  {
    h2: 'Changes',
    body: [
      'If this policy changes, the updated version will be posted on this page. Continued use of the site means you accept the current version.',
    ],
  },
]

export default function PrivacyPage() {
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
            Work with us
          </Link>
        </div>
      </header>

      <article className="legal-wrap" style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 32px 64px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 44px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 16px' }}>
          Privacy policy
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', margin: '0 0 32px' }}>
          ITQAAN, withitqaan.com
        </p>
        <p style={{ fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--color-ink-72)', margin: '0 0 8px' }}>
          The short version: we collect only what we need to reply to you and do your project, we never sell it, and you can ask us to delete it at any time.
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
