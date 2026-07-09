import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Philosophy from '@/components/sections/Philosophy'
import MobileProjects from '@/components/sections/MobileProjects'
import Problems from '@/components/sections/Problems'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Testimonials from '@/components/sections/Testimonials'
import Packages from '@/components/sections/Packages'
import StickyMobileCta from '@/components/ui/StickyMobileCta'
import Guarantees from '@/components/sections/Guarantees'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import { authorSchemaNode, AUTHOR_ID } from '@/lib/author'

/* Structured data, tells Google who/what/where you are (local + service SEO).
   Nodes share stable @ids so Google/AI resolve them to one entity graph. */
const BASE = 'https://withitqaan.com'

const professionalService = {
  '@type': 'ProfessionalService',
  '@id': `${BASE}/#organization`,
  name: 'ITQAAN',
  description:
    'Custom websites, brand identity, and graphic design for Muslim businesses in Dubai and the UAE. Fixed prices from 997 AED.',
  url: 'https://withitqaan.com',
  image: 'https://withitqaan.com/og-image.webp',
  logo: 'https://withitqaan.com/og-image.webp',
  priceRange: 'From AED 997',
  founder: { '@id': AUTHOR_ID },
  currenciesAccepted: 'AED',
  areaServed: ['Dubai', 'United Arab Emirates', 'Worldwide'],
  knowsAbout: [
    'Web design',
    'Website development for Muslim businesses',
    'Halal web design',
    'Brand identity',
    'Graphic design',
    'SEO',
  ],
  sameAs: ['https://wa.me/923165252296', 'https://www.instagram.com/withitqaan'],
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'One-page website',
      priceCurrency: 'AED',
      price: '997',
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'AED', minPrice: '997' },
      itemOffered: { '@type': 'Service', name: 'One-page website design' },
    },
    {
      '@type': 'Offer',
      name: 'Multi-page business website',
      priceCurrency: 'AED',
      price: '2497',
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'AED', minPrice: '2497' },
      itemOffered: { '@type': 'Service', name: 'Multi-page website design' },
    },
    {
      '@type': 'Offer',
      name: 'Online store',
      priceCurrency: 'AED',
      price: '4497',
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'AED', minPrice: '4497' },
      itemOffered: { '@type': 'Service', name: 'E-commerce website design' },
    },
    {
      '@type': 'Offer',
      name: 'Brand identity',
      priceCurrency: 'AED',
      price: '797',
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'AED', minPrice: '797' },
      itemOffered: { '@type': 'Service', name: 'Brand identity' },
    },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Graphic Design' } },
  ],
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    professionalService,
    authorSchemaNode,
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: BASE,
      name: 'ITQAAN',
      description:
        'Websites, brand identity, and graphic design for Muslim businesses in Dubai, the UAE, and worldwide.',
      inLanguage: 'en',
      publisher: { '@id': `${BASE}/#organization` },
    },
  ],
}

export default function Home() {
  return (
    <main id="content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Navbar />
      <Hero />
      <Philosophy />
      <MobileProjects />
      <Problems />
      <Services />
      <Process />
      <Testimonials />
      <Packages />
      <Guarantees />
      <Contact />
      <Footer />
      <StickyMobileCta />
    </main>
  )
}