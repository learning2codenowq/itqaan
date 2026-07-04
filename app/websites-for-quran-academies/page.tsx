import type { Metadata } from 'next'
import LandingPage from '@/components/landing/LandingPage'
import { getLanding } from '@/lib/landing'

const page = getLanding('websites-for-quran-academies')!

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: '/websites-for-quran-academies' },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: '/websites-for-quran-academies' },
}

export default function Page() {
  return <LandingPage slug="websites-for-quran-academies" />
}
