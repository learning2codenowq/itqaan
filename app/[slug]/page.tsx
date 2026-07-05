import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LandingPage from '@/components/landing/LandingPage'
import { landings, getLanding } from '@/lib/landing'

/*
 * Serves every SEO/AEO landing page in lib/landing.ts from one route.
 * TO ADD A LANDING PAGE: add its entry to lib/landing.ts (or the emirate/niche
 * files it merges in); the route, metadata, and sitemap pick it up automatically.
 */

export function generateStaticParams() {
  return landings.map(l => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = getLanding(slug)
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url: `/${page.slug}` },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getLanding(slug)) notFound()
  return <LandingPage slug={slug} />
}
