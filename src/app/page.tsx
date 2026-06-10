import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ManifestoStrip from '@/components/ManifestoStrip'
import Collection from '@/components/Collection'
import Craft from '@/components/Craft'
import SeasonalEdit from '@/components/SeasonalEdit'
import B2B from '@/components/B2B'
import WorkshopCarousel from '@/components/WorkshopCarousel'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <ManifestoStrip />
      <Collection />
      <Craft />
      <SeasonalEdit />
      <B2B />
      <WorkshopCarousel />
      <TrustBar />
      <Footer />
    </main>
  )
}
