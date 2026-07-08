import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  primaryNeeds, siteTypes, brandScopes, graphicItems, seoPlans,
  addons, timelines, storeRanges, storeFeatures, formatPrice,
} from '@/lib/quote'

const resend = new Resend(process.env.RESEND_API_KEY)

const labelOf = (list: { id: string; label: string }[], id?: string | null) =>
  list.find(x => x.id === id)?.label ?? null

/* Escape user-supplied text before it goes into the email HTML. */
const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

/* Trim + hard-cap a field so nobody can paste megabytes into our inbox. */
const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)

/* Very small in-memory per-IP rate limit. Resets per serverless instance,
   which is fine as a first line of defence against basic flooding. */
const RL_WINDOW = 60_000 // 1 minute
const RL_MAX = 5         // max submissions per IP per window
const hits = new Map<string, number[]>()
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RL_WINDOW)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RL_MAX
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { contact, selections, estimate, honeypot, startedAt } = body ?? {}

    /* ── Bot traps (return a fake success so bots don't learn anything) ── */
    // 1. Hidden honeypot field: humans never fill it.
    if (honeypot) return NextResponse.json({ success: true })
    // 2. Submitted implausibly fast (< 3s) = automated.
    if (startedAt && Date.now() - Number(startedAt) < 3000) {
      return NextResponse.json({ success: true })
    }

    /* ── Rate limit by IP ── */
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 })
    }

    const name = clean(contact?.name, 120)
    const email = clean(contact?.email, 160)
    const business = clean(contact?.business, 160)
    const whatsapp = clean(contact?.whatsapp, 40)
    const message = clean(contact?.message, 4000)

    if (!name || !email || !business || !whatsapp) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    // WhatsApp must include a country code: at least 10 digits.
    if (whatsapp.replace(/\D/g, '').length < 10) {
      return NextResponse.json({ error: 'Please enter your WhatsApp number with country code.' }, { status: 400 })
    }

    /* Translate the selection ids into readable labels */
    const need = labelOf(primaryNeeds, selections?.need)
    const rows: [string, string][] = []
    if (need) rows.push(['Needs', need])
    const site = labelOf(siteTypes, selections?.siteType); if (site) rows.push(['Website type', site])
    const storeRange = labelOf(storeRanges, selections?.storeRange); if (storeRange) rows.push(['Product range', storeRange])
    if (selections?.storeFeatures?.length) rows.push(['Store features', selections.storeFeatures.map((id: string) => labelOf(storeFeatures, id)).filter(Boolean).join(', ')])
    const brand = labelOf(brandScopes, selections?.brandScope); if (brand) rows.push(['Brand scope', brand])
    const seo = labelOf(seoPlans, selections?.seoPlan); if (seo) rows.push(['SEO plan', seo])
    if (selections?.graphic?.length) rows.push(['Graphic items', selections.graphic.map((id: string) => labelOf(graphicItems, id)).filter(Boolean).join(', ')])
    if (selections?.addons?.length) rows.push(['Add-ons', selections.addons.map((id: string) => labelOf(addons, id)).filter(Boolean).join(', ')])
    if (selections?.extraPages) rows.push(['Extra pages', String(selections.extraPages)])
    if (selections?.care) rows.push(['Monthly care', 'Yes'])
    const timeline = labelOf(timelines, selections?.timeline); if (timeline) rows.push(['Timeline', timeline])
    if (whatsapp) rows.push(['WhatsApp', esc(whatsapp)])

    const estLine = [
      estimate?.oneOff > 0 ? formatPrice(estimate.oneOff) : null,
      estimate?.monthly > 0 ? `${formatPrice(estimate.monthly)}/mo` : null,
    ].filter(Boolean).join(' · ') || 'Not calculated'

    const rowHtml = (label: string, value: string) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid rgba(178,213,229,0.08);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(178,213,229,0.48);width:150px;vertical-align:top;">${label}</td>
        <td style="padding:12px 0 12px 16px;border-bottom:1px solid rgba(178,213,229,0.08);font-size:15px;color:#B2D5E5;">${value}</td>
      </tr>`

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'hello@withitqaan.com',
      to: process.env.CONTACT_TO_EMAIL ?? 'shayanshehzadqureshi@gmail.com',
      replyTo: email,
      subject: `New quote request from ${name}, ${business} (${estLine})`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;padding:40px 24px;background:#020202;color:#B2D5E5;border-radius:8px;">
          <div style="margin-bottom:28px;padding-bottom:24px;border-bottom:1px solid rgba(178,213,229,0.12);">
            <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#B2D5E5;margin:0 0 8px;">ITQAAN · QUOTE REQUEST</p>
            <h1 style="font-size:24px;font-weight:700;margin:0;color:#B2D5E5;">${estLine}</h1>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${rowHtml('Name', esc(name))}
            ${rowHtml('Email', `<a href="mailto:${esc(email)}" style="color:#B2D5E5;">${esc(email)}</a>`)}
            ${rowHtml('Business', esc(business))}
            ${rows.map(([l, v]) => rowHtml(l, v)).join('')}
            ${message ? rowHtml('Message', esc(message).replace(/\n/g, '<br>')) : ''}
          </table>
          <div style="margin-top:36px;padding-top:24px;border-top:1px solid rgba(178,213,229,0.12);font-size:11px;color:rgba(178,213,229,0.28);letter-spacing:0.1em;">
            Sent via the withitqaan.com quote builder
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send request. Please try again.' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Quote route error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
