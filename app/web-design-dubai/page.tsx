import type { Metadata } from 'next'
import LandingPage from '@/components/landing/LandingPage'
import { getLanding } from '@/lib/landing'

const page = getLanding('web-design-dubai')!

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: '/web-design-dubai' },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: '/web-design-dubai' },
}

export default function Page() {
  return <LandingPage slug="web-design-dubai" />
}
