import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/ui/LenisProvider'

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
export const metadata: Metadata = {
  title: 'ITQAAN — Design Done With Excellence',
  description:
    'A halal creative agency offering web design, brand identity, and graphic design for Muslim businesses and service brands. UAE-based, worldwide delivery.',
  metadataBase: new URL('https://withitqaan.com'),
  openGraph: {
    title: 'ITQAAN — Design Done With Excellence',
    description:
      'Web design, brand identity, and graphic design for Muslim businesses that want to look the part.',
    url: 'https://withitqaan.com',
    siteName: 'ITQAAN',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITQAAN — Design Done With Excellence',
    description:
      'Web design, brand identity, and graphic design for Muslim businesses that want to look the part.',
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
      </body>
    </html>
  )
}