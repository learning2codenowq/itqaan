import type { Metadata } from 'next'
import LandingPage from '@/components/landing/LandingPage'
import { getLanding } from '@/lib/landing'

const page = getLanding('websites-for-muslim-businesses')!

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: '/websites-for-muslim-businesses' },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: '/websites-for-muslim-businesses' },
}

export default function Page() {
  return <LandingPage slug="websites-for-muslim-businesses" />
}
