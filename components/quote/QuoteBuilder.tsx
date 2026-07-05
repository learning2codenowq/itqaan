'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  primaryNeeds, siteTypes, brandScopes, graphicItems, seoPlans,
  addons, carePlan, timelines, EXTRA_PAGE_PRICE, formatPrice,
} from '@/lib/quote'

const EASE = [0.22, 1, 0.36, 1] as const

type StepKey = 'need' | 'siteType' | 'brandScope' | 'graphicItems' | 'seoPlan' | 'websiteAddons' | 'timeline' | 'contact'

function stepsFor(need: string | null): StepKey[] {
  if (need === 'website') return ['need', 'siteType', 'websiteAddons', 'timeline', 'contact']
  if (need === 'brand')   return ['need', 'brandScope', 'timeline', 'contact']
  if (need === 'graphic') return ['need', 'graphicItems', 'timeline', 'contact']
  if (need === 'seo')     return ['need', 'seoPlan', 'timeline', 'contact']
  if (need === 'unsure')  return ['need', 'timeline', 'contact']
  return ['need']
}

type State = {
  need: string | null
  siteType: string | null
  brandScope: string | null
  graphic: string[]
  seoPlan: string | null
  addons: string[]
  extraPages: number
  care: boolean
  timeline: string | null
  name: string
  email: string
  business: string
  whatsapp: string
  message: string
  hp: string // honeypot, must stay empty
}

// WhatsApp with a country code: needs at least 10 digits.
const isValidWhatsapp = (v: string) => v.replace(/\D/g, '').length >= 10

const WA_FALLBACK_HREF = `https://wa.me/923165252296?text=${encodeURIComponent(
  'Assalamu alaikum, I was building a quote on withitqaan.com and would rather talk it through.',
)}`

// Draft persistence: a refresh or accidental back-swipe should not wipe the
// visitor's answers. Saved per change, restored on mount, cleared on submit.
const DRAFT_KEY = 'itqaan-quote-draft'

export default function QuoteBuilder({ initialPlan }: { initialPlan?: { need: string; choice?: string } }) {
  const [state, setState] = useState<State>({
    need: initialPlan?.need ?? null,
    siteType: initialPlan?.need === 'website' ? initialPlan.choice ?? null : null,
    brandScope: initialPlan?.need === 'brand' ? initialPlan.choice ?? null : null,
    graphic: [],
    seoPlan: initialPlan?.need === 'seo' ? initialPlan.choice ?? null : null,
    addons: [],
    extraPages: 0,
    care: false,
    timeline: null,
    name: '', email: '', business: '', whatsapp: '', message: '', hp: '',
  })
  // Captured on mount; used server-side to reject implausibly fast (bot) submits.
  const [startedAt] = useState(() => Date.now())
  // if a plan preselected the need + choice, skip straight to the step after the choice
  const [stepIndex, setStepIndex] = useState(initialPlan?.need && initialPlan?.choice ? 2 : 0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const steps = stepsFor(state.need)
  const stepKey = steps[Math.min(stepIndex, steps.length - 1)]
  const set = <K extends keyof State>(k: K, v: State[K]) => setState(s => ({ ...s, [k]: v }))

  /* ── GA4 funnel events ── */
  const track = (event: string, params?: Record<string, unknown>) =>
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', event, params)

  // quote_start fires once, on the first real engagement.
  const startedRef = useRef(false)
  const markStart = (need: string | null) => {
    if (startedRef.current) return
    startedRef.current = true
    track('quote_start', { need })
  }
  // Arriving via ?plan= means they already engaged from the Packages section.
  useEffect(() => {
    if (initialPlan?.need) markStart(initialPlan.need)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Restore a saved draft on mount (after hydration, to avoid SSR mismatch).
  // An explicit ?plan= choice takes precedence over any old draft.
  useEffect(() => {
    if (initialPlan?.need) return
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (!raw) return
      const draft = JSON.parse(raw) as { v?: number; state?: Partial<State>; stepIndex?: number }
      if (draft?.v !== 1 || !draft.state?.need) return
      setState(s => ({ ...s, ...draft.state, hp: '' }))
      setStepIndex(Math.min(draft.stepIndex ?? 0, stepsFor(draft.state.need).length - 1))
    } catch { /* corrupt or unavailable storage: start fresh */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Save the draft as answers change. Nothing is saved until a need is chosen.
  useEffect(() => {
    if (status === 'success' || !state.need) return
    try {
      const { hp: _hp, ...rest } = state
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ v: 1, state: rest, stepIndex }))
    } catch { /* storage full or blocked: continue without saving */ }
  }, [state, stepIndex, status])

  /* ── live estimate ── */
  const estimate = useMemo(() => {
    let oneOff = 0
    let monthly = 0
    let from = false
    const lines: { label: string; amount: string }[] = []

    if (state.need === 'website') {
      const t = siteTypes.find(x => x.id === state.siteType)
      if (t?.price) { oneOff += t.price; from = from || !!t.from; lines.push({ label: t.label, amount: formatPrice(t.price) }) }
      state.addons.forEach(id => {
        const a = addons.find(x => x.id === id)
        if (a?.price) { oneOff += a.price; lines.push({ label: a.label, amount: formatPrice(a.price) }) }
      })
      if (state.extraPages > 0) {
        const amt = state.extraPages * EXTRA_PAGE_PRICE
        oneOff += amt
        lines.push({ label: `${state.extraPages} extra page${state.extraPages > 1 ? 's' : ''}`, amount: formatPrice(amt) })
      }
      if (state.care && carePlan.monthly) { monthly += carePlan.monthly; lines.push({ label: carePlan.label, amount: `${formatPrice(carePlan.monthly)}/mo` }) }
    } else if (state.need === 'brand') {
      const b = brandScopes.find(x => x.id === state.brandScope)
      if (b?.price) { oneOff += b.price; from = from || !!b.from; lines.push({ label: b.label, amount: formatPrice(b.price) }) }
    } else if (state.need === 'graphic') {
      state.graphic.forEach(id => {
        const g = graphicItems.find(x => x.id === id)
        if (g?.price) { oneOff += g.price; lines.push({ label: g.label, amount: formatPrice(g.price) }) }
      })
    } else if (state.need === 'seo') {
      const p = seoPlans.find(x => x.id === state.seoPlan)
      if (p?.price) { oneOff += p.price; from = from || !!p.from; lines.push({ label: p.label, amount: formatPrice(p.price) }) }
      if (p?.monthly) { monthly += p.monthly; from = from || !!p.from; lines.push({ label: p.label, amount: `${formatPrice(p.monthly)}/mo` }) }
    }

    return { oneOff, monthly, from, lines }
  }, [state])

  /* ── per-step validation ── */
  const canProceed = (() => {
    switch (stepKey) {
      case 'need': return !!state.need
      case 'siteType': return !!state.siteType
      case 'brandScope': return !!state.brandScope
      case 'graphicItems': return state.graphic.length > 0
      case 'seoPlan': return !!state.seoPlan
      case 'websiteAddons': return true
      case 'timeline': return !!state.timeline
      case 'contact': return !!state.name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email) && !!state.business && isValidWhatsapp(state.whatsapp)
      default: return false
    }
  })()

  const isLast = stepKey === 'contact'

  const next = () => {
    if (canProceed && !isLast) {
      const target = steps[stepIndex + 1]
      track('quote_step', { step: target, index: stepIndex + 1 })
      setStepIndex(i => i + 1)
    }
  }
  const back = () => setStepIndex(i => Math.max(0, i - 1))

  const chooseNeed = (id: string) => {
    markStart(id)
    // changing the primary need resets downstream choices
    setState(s => ({ ...s, need: id, siteType: null, brandScope: null, graphic: [], seoPlan: null, addons: [], extraPages: 0, care: false }))
    setStepIndex(1)
    track('quote_step', { step: stepsFor(id)[1], index: 1 })
  }

  const toggle = (key: 'graphic' | 'addons', id: string) =>
    setState(s => ({ ...s, [key]: s[key].includes(id) ? s[key].filter(x => x !== id) : [...s[key], id] }))

  const submit = async () => {
    setStatus('loading'); setError('')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          honeypot: state.hp,
          startedAt,
          contact: { name: state.name, email: state.email, business: state.business, whatsapp: state.whatsapp, message: state.message },
          selections: {
            need: state.need, siteType: state.siteType, brandScope: state.brandScope,
            graphic: state.graphic, seoPlan: state.seoPlan, addons: state.addons,
            extraPages: state.extraPages, care: state.care, timeline: state.timeline,
          },
          estimate: { oneOff: estimate.oneOff, monthly: estimate.monthly, lines: estimate.lines },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
      try { localStorage.removeItem(DRAFT_KEY) } catch { /* nothing to clear */ }
      // GA4 conversion event. Fall back to the monthly value for plans with no
      // one-off (e.g. monthly SEO) so the lead value is never reported as 0.
      const leadValue = estimate.oneOff > 0 ? estimate.oneOff : estimate.monthly
      track('generate_lead', { currency: 'AED', value: leadValue, need: state.need })
    } catch (e: unknown) {
      setStatus('error')
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    }
  }

  const totalSteps = steps.length

  if (status === 'success') {
    return (
      <div className="qb-success">
        <div className="qb-check">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h2>Request received</h2>
        <p>JazakAllahu khayran, {state.name.split(' ')[0]}. We have your details and your estimate. You will get a fixed-price proposal within 24 hours, inshaa Allah.</p>
        <Link href="/" className="qb-home">Back to home</Link>
        <style>{qbCss}</style>
      </div>
    )
  }

  return (
    <div className="qb-grid">
      {/* ── Left: steps ── */}
      <div className="qb-main">
        <div className="qb-progress">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span key={i} className={`qb-dot ${i <= stepIndex ? 'on' : ''}`} />
          ))}
          <span className="qb-progress-label">Step {Math.min(stepIndex + 1, totalSteps)} of {totalSteps}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stepKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {stepKey === 'need' && (
              <Step title="What can we help you build?" sub="Pick the main thing you need. You can add extras later.">
                <div className="qb-cards">
                  {primaryNeeds.map(o => (
                    <OptionCard key={o.id} option={o} selected={state.need === o.id} onClick={() => chooseNeed(o.id)} />
                  ))}
                </div>
              </Step>
            )}

            {stepKey === 'siteType' && (
              <Step title="What kind of website?" sub="A rough idea is fine, we'll refine it together.">
                <div className="qb-cards">
                  {siteTypes.map(o => (
                    <OptionCard key={o.id} option={o} selected={state.siteType === o.id} onClick={() => set('siteType', o.id)} showPrice />
                  ))}
                </div>
              </Step>
            )}

            {stepKey === 'brandScope' && (
              <Step title="How much brand do you need?" sub="From a single logo to a full identity system.">
                <div className="qb-cards">
                  {brandScopes.map(o => (
                    <OptionCard key={o.id} option={o} selected={state.brandScope === o.id} onClick={() => set('brandScope', o.id)} showPrice />
                  ))}
                </div>
              </Step>
            )}

            {stepKey === 'graphicItems' && (
              <Step title="What do you need designed?" sub="Choose as many as you like.">
                <div className="qb-cards">
                  {graphicItems.map(o => (
                    <OptionCard key={o.id} option={o} selected={state.graphic.includes(o.id)} onClick={() => toggle('graphic', o.id)} showPrice multi />
                  ))}
                </div>
              </Step>
            )}

            {stepKey === 'seoPlan' && (
              <Step title="How would you like to grow?" sub="A one-time boost, or ongoing month to month.">
                <div className="qb-cards">
                  {seoPlans.map(o => (
                    <OptionCard key={o.id} option={o} selected={state.seoPlan === o.id} onClick={() => set('seoPlan', o.id)} showPrice />
                  ))}
                </div>
              </Step>
            )}

            {stepKey === 'websiteAddons' && (
              <Step title="Want to add anything?" sub="All optional. Skip whatever you don't need.">
                <div className="qb-cards">
                  {addons.map(o => (
                    <OptionCard key={o.id} option={o} selected={state.addons.includes(o.id)} onClick={() => toggle('addons', o.id)} showPrice multi />
                  ))}
                </div>

                <div className="qb-stepper">
                  <div>
                    <span className="qb-stepper-label">Extra pages</span>
                    <span className="qb-stepper-sub">{formatPrice(EXTRA_PAGE_PRICE)} each</span>
                  </div>
                  <div className="qb-stepper-ctrl">
                    <button type="button" onClick={() => set('extraPages', Math.max(0, state.extraPages - 1))} aria-label="Fewer pages">−</button>
                    <span>{state.extraPages}</span>
                    <button type="button" onClick={() => set('extraPages', state.extraPages + 1)} aria-label="More pages">+</button>
                  </div>
                </div>

                <button type="button" className={`qb-care ${state.care ? 'on' : ''}`} onClick={() => set('care', !state.care)}>
                  <span className="qb-care-check">{state.care && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-void)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>}</span>
                  <span>
                    <span className="qb-care-label">{carePlan.label}</span>
                    <span className="qb-care-sub">{carePlan.desc} · {formatPrice(carePlan.monthly!)}/mo</span>
                  </span>
                </button>
              </Step>
            )}

            {stepKey === 'timeline' && (
              <Step title="When do you need it?" sub="No pressure, this just helps us plan.">
                <div className="qb-cards">
                  {timelines.map(o => (
                    <OptionCard key={o.id} option={o} selected={state.timeline === o.id} onClick={() => set('timeline', o.id)} />
                  ))}
                </div>
              </Step>
            )}

            {stepKey === 'contact' && (
              <Step title="Where do we send your quote?" sub="We reply with a fixed price within 24 hours, inshaa Allah.">
                <div className="qb-fields">
                  <div className="qb-two">
                    <Field label="Full name" required><input className="qb-input" value={state.name} onChange={e => set('name', e.target.value)} placeholder="Yusuf Al-Amin" /></Field>
                    <Field label="Email" required><input className="qb-input" type="email" value={state.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" /></Field>
                  </div>
                  <div className="qb-two">
                    <Field label="Business name" required><input className="qb-input" value={state.business} onChange={e => set('business', e.target.value)} placeholder="Your business" /></Field>
                    <Field label="WhatsApp (with country code)" required><input className="qb-input" type="tel" inputMode="tel" value={state.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="+971 50 123 4567" /></Field>
                  </div>
                  <Field label="Anything else? (optional)">
                    <textarea className="qb-input" rows={3} value={state.message} onChange={e => set('message', e.target.value)} placeholder="Tell us anything that helps us quote accurately." style={{ resize: 'none', lineHeight: 1.6 }} />
                  </Field>
                  {/* Honeypot: hidden from humans, catches bots that fill every field. */}
                  <input
                    type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
                    value={state.hp} onChange={e => set('hp', e.target.value)}
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  />
                  {error && <p className="qb-error">{error}</p>}
                </div>
              </Step>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="qb-nav">
          <button type="button" className="qb-back" onClick={back} disabled={stepIndex === 0} style={{ opacity: stepIndex === 0 ? 0 : 1, pointerEvents: stepIndex === 0 ? 'none' : 'auto' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Back
          </button>
          {isLast ? (
            <button type="button" className="qb-next" onClick={submit} disabled={!canProceed || status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send my request'}
              {status !== 'loading' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>}
            </button>
          ) : (
            <button type="button" className="qb-next" onClick={next} disabled={!canProceed}>
              Continue
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
            </button>
          )}
        </div>

        {!isLast && state.need && (
          <p className="qb-alt">
            Prefer to talk it through instead?{' '}
            <a href={WA_FALLBACK_HREF} target="_blank" rel="noopener noreferrer" data-wa-loc="quote_builder">
              WhatsApp us
            </a>
            , we reply within 24 hours.
          </p>
        )}

        {isLast && (
          <div className="qb-reassure">
            {[
              { d: 'M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', text: 'Fixed quote on WhatsApp within 24 hours' },
              { d: 'M20 6 9 17l-5-5', text: 'No payment and no obligation to proceed' },
              { d: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4', text: 'Your details stay private, never shared' },
            ].map(item => (
              <span key={item.text} className="qb-reassure-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-ember)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.d} /></svg>
                {item.text}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Right: live estimate ── */}
      <aside className="qb-side">
        <div className="qb-estimate">
          <p className="qb-eyebrow"><span className="qb-eyebrow-dot" />Your estimate</p>
          {estimate.lines.length === 0 ? (
            <p className="qb-empty">Make a selection to see your estimate build up here.</p>
          ) : (
            <div className="qb-lines">
              {estimate.lines.map((l, i) => (
                <div key={i} className="qb-line"><span>{l.label}</span><span>{l.amount}</span></div>
              ))}
            </div>
          )}

          <div className="qb-total">
            {estimate.oneOff > 0 && (
              <div className="qb-total-row">
                <span>{estimate.from ? 'Estimated from' : 'Estimated'}</span>
                <strong>{formatPrice(estimate.oneOff)}</strong>
              </div>
            )}
            {estimate.monthly > 0 && (
              <div className="qb-total-row qb-total-monthly">
                <span>Then</span>
                <strong>{formatPrice(estimate.monthly)}/mo</strong>
              </div>
            )}
            {estimate.oneOff === 0 && estimate.monthly === 0 && (
              <div className="qb-total-row"><span>Estimated</span><strong>—</strong></div>
            )}
          </div>

          <p className="qb-note">This is an estimate. You'll receive a fixed price, confirmed in writing, within 24 hours.</p>
        </div>
      </aside>

      <style>{qbCss}</style>
    </div>
  )
}

/* ── small building blocks ── */
function Step({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="qb-title">{title}</h2>
      {sub && <p className="qb-sub">{sub}</p>}
      {children}
    </div>
  )
}

function OptionCard({ option, selected, onClick, showPrice, multi }: {
  option: { id: string; label: string; desc?: string; price?: number; monthly?: number; from?: boolean }
  selected: boolean; onClick: () => void; showPrice?: boolean; multi?: boolean
}) {
  const priceText = showPrice
    ? option.price != null
      ? `${option.from ? 'from ' : ''}${formatPrice(option.price)}`
      : option.monthly != null
        ? `${option.from ? 'from ' : ''}${formatPrice(option.monthly)}/mo`
        : ''
    : ''
  return (
    <button type="button" onClick={onClick} className={`qb-card ${selected ? 'sel' : ''}`}>
      <span className={`qb-tick ${multi ? 'sq' : ''}`}>{selected && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-void)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>}</span>
      <span className="qb-card-body">
        <span className="qb-card-label">{option.label}</span>
        {option.desc && <span className="qb-card-desc">{option.desc}</span>}
      </span>
      {priceText && <span className="qb-card-price">{priceText}</span>}
    </button>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="qb-field">
      <span className="qb-field-label">{label}{required && <span className="qb-req"> *</span>}</span>
      {children}
    </label>
  )
}

const qbCss = `
  .qb-grid { display: grid; grid-template-columns: 1fr 340px; gap: 48px; align-items: start; }
  @media (max-width: 900px) { .qb-grid { grid-template-columns: 1fr; gap: 32px; } }

  .qb-progress { display: flex; align-items: center; gap: 8px; margin-bottom: 40px; }
  .qb-dot { width: 22px; height: 3px; border-radius: 2px; background: var(--color-ink-18); transition: background 0.3s ease; }
  .qb-dot.on { background: var(--color-ember); }
  .qb-progress-label { margin-left: 8px; font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-ink-28); }

  .qb-title { font-family: var(--font-display); font-size: clamp(26px, 3.4vw, 40px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; color: var(--color-ink); margin: 0 0 12px; }
  .qb-sub { font-size: 0.95rem; font-weight: 300; line-height: 1.7; color: var(--color-ink-48); margin: 0 0 32px; max-width: 460px; }

  .qb-cards { display: flex; flex-direction: column; gap: 12px; }
  .qb-card { display: flex; align-items: center; gap: 16px; width: 100%; text-align: left; padding: 18px 20px; border-radius: 12px; border: 1px solid var(--color-ink-10); background: var(--color-ink-3); cursor: pointer; transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease; }
  .qb-card:hover { border-color: var(--color-ink-28); background: var(--color-ink-5); }
  .qb-card.sel { border-color: var(--color-ember); background: var(--color-ember-dim); }
  .qb-tick { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--color-ink-28); display: flex; align-items: center; justify-content: center; transition: background 0.2s ease, border-color 0.2s ease; }
  .qb-tick.sq { border-radius: 6px; }
  .qb-card.sel .qb-tick { background: var(--color-ember); border-color: var(--color-ember); }
  .qb-card-body { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
  .qb-card-label { font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--color-ink); }
  .qb-card-desc { font-size: 0.82rem; font-weight: 300; color: var(--color-ink-48); }
  .qb-card-price { flex-shrink: 0; font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.02em; color: var(--color-ink-72); }

  .qb-stepper { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding: 16px 20px; border-radius: 12px; border: 1px solid var(--color-ink-10); background: var(--color-ink-3); }
  .qb-stepper-label { display: block; font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--color-ink); }
  .qb-stepper-sub { display: block; font-size: 0.82rem; font-weight: 300; color: var(--color-ink-48); margin-top: 3px; }
  .qb-stepper-ctrl { display: flex; align-items: center; gap: 14px; }
  .qb-stepper-ctrl button { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--color-ink-18); background: none; color: var(--color-ink); font-size: 18px; line-height: 1; cursor: pointer; transition: border-color 0.2s ease; }
  .qb-stepper-ctrl button:hover { border-color: var(--color-ember); }
  .qb-stepper-ctrl span { min-width: 20px; text-align: center; font-family: var(--font-mono); font-size: 1rem; color: var(--color-ink); }

  .qb-care { display: flex; align-items: center; gap: 16px; width: 100%; text-align: left; margin-top: 12px; padding: 16px 20px; border-radius: 12px; border: 1px solid var(--color-ink-10); background: var(--color-ink-3); cursor: pointer; transition: border-color 0.2s ease, background 0.2s ease; }
  .qb-care.on { border-color: var(--color-ember); background: var(--color-ember-dim); }
  .qb-care-check { flex-shrink: 0; width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--color-ink-28); display: flex; align-items: center; justify-content: center; }
  .qb-care.on .qb-care-check { background: var(--color-ember); border-color: var(--color-ember); }
  .qb-care-label { display: block; font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--color-ink); }
  .qb-care-sub { display: block; font-size: 0.82rem; font-weight: 300; color: var(--color-ink-48); margin-top: 3px; }

  .qb-fields { display: flex; flex-direction: column; gap: 18px; }
  .qb-two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 560px) { .qb-two { grid-template-columns: 1fr; } }
  .qb-field { display: flex; flex-direction: column; gap: 8px; }
  .qb-field-label { font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-ink-48); }
  .qb-req { color: var(--color-ink-72); }
  .qb-input { width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--color-ink-10); background: var(--color-ink-3); color: var(--color-ink); font-size: 0.925rem; font-family: var(--font-body); outline: none; transition: border-color 0.2s ease, background 0.2s ease; }
  .qb-input:focus { border-color: var(--color-ink-28); background: var(--color-ink-5); }
  .qb-input::placeholder { color: var(--color-ink-28); }
  .qb-error { font-size: 0.83rem; color: var(--color-ember); margin: 0; }

  .qb-nav { display: flex; align-items: center; justify-content: space-between; margin-top: 40px; }
  .qb-back { display: inline-flex; align-items: center; gap: 6px; background: none; border: none; color: var(--color-ink-48); font-size: 0.9rem; font-weight: 500; cursor: pointer; font-family: var(--font-body); transition: color 0.2s ease; }
  .qb-back:hover { color: var(--color-ink); }
  .qb-next { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; border-radius: 9999px; background: var(--color-ink); color: var(--color-void); font-size: 0.9rem; font-weight: 600; letter-spacing: 0.02em; border: none; cursor: pointer; font-family: var(--font-body); transition: box-shadow 0.3s ease, opacity 0.2s ease; }
  .qb-next:hover { box-shadow: 0 8px 40px rgba(178,213,229,0.16); }
  .qb-next:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }

  .qb-alt { margin: 24px 0 0; padding-top: 20px; border-top: 1px solid var(--color-ink-8); font-size: 0.82rem; font-weight: 300; color: var(--color-ink-28); }
  .qb-alt a { color: var(--color-ink-48); text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s ease; }
  .qb-alt a:hover { color: var(--color-ink); }

  .qb-reassure { display: flex; flex-wrap: wrap; gap: 10px 24px; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--color-ink-8); }
  .qb-reassure-item { display: inline-flex; align-items: center; gap: 9px; font-size: 0.8rem; font-weight: 300; color: var(--color-ink-48); }
  .qb-reassure-item svg { flex-shrink: 0; }

  .qb-side { position: sticky; top: 40px; }
  @media (max-width: 900px) { .qb-side { position: static; } }
  .qb-estimate { padding: 28px; border-radius: 16px; border: 1px solid var(--color-ink-10); background: var(--color-ink-3); }
  .qb-eyebrow { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-ink-48); margin: 0 0 20px; }
  .qb-eyebrow-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--color-ember); }
  .qb-empty { font-size: 0.85rem; font-weight: 300; line-height: 1.6; color: var(--color-ink-28); margin: 0; }
  .qb-lines { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
  .qb-line { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; font-size: 0.85rem; color: var(--color-ink-72); }
  .qb-line span:last-child { font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-ink); flex-shrink: 0; }
  .qb-total { padding-top: 18px; border-top: 1px solid var(--color-ink-10); display: flex; flex-direction: column; gap: 8px; }
  .qb-total-row { display: flex; align-items: baseline; justify-content: space-between; }
  .qb-total-row span { font-size: 0.8rem; color: var(--color-ink-48); }
  .qb-total-row strong { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--color-ink); letter-spacing: -0.01em; }
  .qb-total-monthly strong { font-size: 1.05rem; color: var(--color-ink-72); }
  .qb-note { font-size: 0.72rem; font-weight: 300; line-height: 1.6; color: var(--color-ink-28); margin: 18px 0 0; }

  .qb-success { max-width: 480px; margin: 0 auto; text-align: center; padding: 40px 0; }
  .qb-check { width: 52px; height: 52px; margin: 0 auto 24px; border-radius: 50%; border: 1px solid var(--color-ink-18); display: flex; align-items: center; justify-content: center; }
  .qb-success h2 { font-family: var(--font-display); font-size: 1.7rem; font-weight: 700; color: var(--color-ink); margin: 0 0 14px; }
  .qb-success p { font-size: 0.95rem; font-weight: 300; line-height: 1.75; color: var(--color-ink-48); margin: 0 0 28px; }
  .qb-home { display: inline-flex; padding: 13px 28px; border-radius: 9999px; background: var(--color-ink); color: var(--color-void); font-size: 0.875rem; font-weight: 600; text-decoration: none; }
`
