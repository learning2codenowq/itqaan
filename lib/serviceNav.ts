// lib/serviceNav.ts
//
// Canonical list of the service pages. Imported by the Navbar dropdown, the
// Footer services column, the /services hub, and the homepage Services section
// so the list only has to be updated in one place.
//
// `ready` marks pages that exist. Pages are added here first, flipped to
// ready: true once their entry in lib/services.ts and route are live, and only
// ready pages are rendered anywhere.

export type ServiceNavItem = {
  slug: string
  label: string
  href: string
  blurb: string
  ready: boolean
}

export const serviceNav: ServiceNavItem[] = [
  {
    slug: 'web-design',
    label: 'Web Design',
    href: '/services/web-design',
    blurb: 'Custom websites that win customers, from 997 AED',
    ready: true,
  },
  {
    slug: 'ecommerce',
    label: 'E-commerce',
    href: '/services/ecommerce',
    blurb: 'Online stores built to sell, from 4,497 AED',
    ready: true,
  },
  {
    slug: 'branding',
    label: 'Branding & Identity',
    href: '/services/branding',
    blurb: 'Logo and brand systems, from 797 AED',
    ready: true,
  },
  {
    slug: 'seo-geo',
    label: 'SEO & GEO',
    href: '/services/seo-geo',
    blurb: 'Get found on Google and AI assistants',
    ready: true,
  },
  {
    slug: 'graphic-design',
    label: 'Graphic Design',
    href: '/services/graphic-design',
    blurb: 'Social packs, print, decks and menus',
    ready: true,
  },
  {
    slug: 'care-plans',
    label: 'Care Plans',
    href: '/services/care-plans',
    blurb: 'Hosting, updates and support after launch',
    ready: true,
  },
]

export const readyServices = serviceNav.filter(s => s.ready)
