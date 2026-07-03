import type { Metadata } from 'next'
import Script from 'next/script'
import { Plus_Jakarta_Sans, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/ui/LenisProvider'

/* Google Analytics 4 measurement ID */
const GA_ID = 'G-FZG9CL5KHH'

/* ── Fonts ── */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

/* ── Metadata ── */
const SITE_TITLE = 'Websites for Dubai Businesses | ITQAAN | From 997 AED'
const SITE_DESC =
  'Custom websites, brand identity, and graphic design for Muslim businesses in Dubai and the UAE. Fixed prices from 997 AED. Get a quote in under a minute.'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESC,
  metadataBase: new URL('https://withitqaan.com'),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: 'https://withitqaan.com',
    siteName: 'ITQAAN',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.webp', width: 1731, height: 909, alt: 'ITQAAN — websites for Dubai businesses, from 997 AED' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ['/og-image.webp'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        {/* DigitalKhatt — self-hosted, used for loader Arabic text */}
        <style>{`
          @font-face {
            font-family: 'DigitalKhatt';
            src: url('/fonts/DigitalKhattV2.otf') format('opentype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </head>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>

        {/* Google Analytics 4 */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}