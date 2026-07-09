import type { Metadata } from 'next'
import Script from 'next/script'
import { Plus_Jakarta_Sans, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/ui/LenisProvider'
import WhatsAppFab from '@/components/ui/WhatsAppFab'
import FaviconController from '@/components/ui/FaviconController'

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
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: 'https://withitqaan.com',
    siteName: 'ITQAAN',
    locale: 'en_AE',
    alternateLocale: ['en_US', 'en_GB'],
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
  icons: {
    icon: [
      { url: '/favicon-active.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
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
        {/* Warm up the analytics origins so the lazy-loaded GA4 request is faster
            when it fires. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Take scroll restoration off the browser's 'auto' default before first
            paint, so navigating from the footer to a new page never lands on the
            old scroll offset. Must be inline (runs before restoration); the
            per-route reset lives in LenisProvider. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}`,
          }}
        />
      </head>
      <body>
        <FaviconController />
        <LenisProvider>
          {children}
        </LenisProvider>
        <WhatsAppFab />

        {/* Google Analytics 4 — lazyOnload so the ~160KB gtag bundle loads on
            browser idle after the page is interactive, instead of blocking the
            main thread during load. Conversion events fire on user action (quote
            submit), well after this, so nothing is lost. */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
        <Script id="ga4-init" strategy="lazyOnload">
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