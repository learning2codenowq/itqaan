import { projects } from '@/lib/projects'

/*
 * Social-proof block for the SEO entry pages (landing pages + blog articles).
 * Server component with inline styles, no client JS, so it adds trust and
 * E-E-A-T signals without weighing down the pages crawlers land on.
 *
 * Pulls real, named client testimonials from lib/projects.ts (excluding the
 * founder's own entry) plus a compact guarantees row.
 */

const guarantees = [
  'Fixed price agreed upfront',
  'Revisions until you are happy',
  'You own everything',
  'Support after launch',
]

export default function ProofStrip({ count = 2 }: { count?: number }) {
  const items = projects
    .filter(p => p.testimonial && p.testimonial.author !== 'Shayan Qureshi')
    .slice(0, count)

  if (items.length === 0) return null

  return (
    <section aria-label="What clients say" style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid var(--color-ink-8)' }}>
      <style>{`@media (max-width: 600px) { .proof-grid { grid-template-columns: 1fr !important; } }`}</style>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-48)', margin: '0 0 24px' }}>
        What clients say
      </p>

      <div className="proof-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {items.map(p => (
          <figure key={p.slug} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', padding: '24px 22px', borderRadius: '14px', border: '1px solid var(--color-ink-10)', background: 'var(--color-ink-3)' }}>
            <blockquote style={{ margin: 0, fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--color-ink-72)' }}>
              &ldquo;{p.testimonial!.quote}&rdquo;
            </blockquote>
            <figcaption style={{ marginTop: 'auto' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-ink)' }}>{p.testimonial!.author}</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-28)', marginTop: '4px' }}>{p.testimonial!.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {guarantees.map(g => (
          <li key={g} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '9999px', border: '1px solid var(--color-ember-18)', background: 'var(--color-ember-dim)', fontSize: '0.78rem', fontWeight: 400, color: 'var(--color-ink-72)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-ember)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
            {g}
          </li>
        ))}
      </ul>
    </section>
  )
}
