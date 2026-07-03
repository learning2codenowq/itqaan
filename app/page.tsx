import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Philosophy from '@/components/sections/Philosophy'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Packages from '@/components/sections/Packages'
import Guarantees from '@/components/sections/Guarantees'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

/* Structured data — tells Google who/what/where you are (local + service SEO) */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ITQAAN',
  description:
    'Custom websites, brand identity, and graphic design for Muslim businesses in Dubai and the UAE. Fixed prices from 997 AED.',
  url: 'https://withitqaan.com',
  image: 'https://withitqaan.com/og-image.webp',
  priceRange: 'From AED 997',
  areaServed: ['Dubai', 'United Arab Emirates', 'Worldwide'],
  sameAs: ['https://wa.me/923165252296'],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Graphic Design' } },
  ],
}

export default function Home() {
  return (
    <main id="content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Navbar />
      <Hero />
      <Philosophy />
      <Services />
      <Process />
      <Packages />
      <Guarantees />
      <Contact />
      <Footer />
    </main>
  )
}