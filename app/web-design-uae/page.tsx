import type { Metadata } from 'next'
import LandingPage from '@/components/landing/LandingPage'
import { getLanding } from '@/lib/landing'

const page = getLanding('web-design-uae')!

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: '/web-design-uae' },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: '/web-design-uae' },
}

export default function Page() {
  return <LandingPage slug="web-design-uae" />
}
