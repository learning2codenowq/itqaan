import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Philosophy from '@/components/sections/Philosophy'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Pricing from '@/components/sections/Pricing'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main id="content">
      <Navbar />
      <Hero />
      <Philosophy />
      <Services />
      <Process />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  )
}