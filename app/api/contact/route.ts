import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, business, service, budget, message } = body

    /* Basic validation */
    if (!name || !email || !business || !service || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'hello@withitqaan.com',
      to: process.env.CONTACT_TO_EMAIL ?? 'shayanshehzadqureshi@gmail.com',
      replyTo: email,
      subject: `New inquiry from ${name} — ${business}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #020202; color: #F5F0E8; border-radius: 8px;">

          <div style="margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid rgba(178,213,229,0.1);">
            <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C4622D; margin: 0 0 8px;">ITQAAN</p>
            <h1 style="font-size: 24px; font-weight: 700; margin: 0; color: #F5F0E8;">New Project Inquiry</h1>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(178,213,229,0.08); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(178,213,229,0.48); width: 120px; vertical-align: top; padding-top: 16px;">Name</td>
              <td style="padding: 12px 0 12px 16px; border-bottom: 1px solid rgba(178,213,229,0.08); font-size: 15px; color: #F5F0E8;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(178,213,229,0.08); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(178,213,229,0.48); vertical-align: top; padding-top: 16px;">Email</td>
              <td style="padding: 12px 0 12px 16px; border-bottom: 1px solid rgba(178,213,229,0.08); font-size: 15px; color: #F5F0E8;"><a href="mailto:${email}" style="color: #C4622D;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(178,213,229,0.08); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(178,213,229,0.48); vertical-align: top; padding-top: 16px;">Business</td>
              <td style="padding: 12px 0 12px 16px; border-bottom: 1px solid rgba(178,213,229,0.08); font-size: 15px; color: #F5F0E8;">${business}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(178,213,229,0.08); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(178,213,229,0.48); vertical-align: top; padding-top: 16px;">Service</td>
              <td style="padding: 12px 0 12px 16px; border-bottom: 1px solid rgba(178,213,229,0.08); font-size: 15px; color: #F5F0E8;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(178,213,229,0.08); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(178,213,229,0.48); vertical-align: top; padding-top: 16px;">Budget</td>
              <td style="padding: 12px 0 12px 16px; border-bottom: 1px solid rgba(178,213,229,0.08); font-size: 15px; color: #F5F0E8;">${budget || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 16px 0 0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(178,213,229,0.48); vertical-align: top;">Message</td>
              <td style="padding: 16px 0 0 16px; font-size: 15px; color: rgba(178,213,229,0.8); line-height: 1.7;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>

          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(178,213,229,0.1); font-size: 11px; color: rgba(178,213,229,0.28); letter-spacing: 0.1em;">
            Sent via withitqaan.com contact form
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}