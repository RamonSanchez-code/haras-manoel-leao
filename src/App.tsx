import { MotionConfig } from 'framer-motion'
import { FORCE_MOTION } from './lib/motion'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Events } from './components/Events'
import { ExperienceCards } from './components/ExperienceCards'
import { FamilyExperience } from './components/FamilyExperience'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Gastronomy } from './components/Gastronomy'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { InstagramSection } from './components/InstagramSection'
import { Location } from './components/Location'
import { Manifesto } from './components/Manifesto'
import { Marquee } from './components/Marquee'
import { ScrollProgress, SideNav } from './components/ScrollUI'
import { VisitPlanner } from './components/VisitPlanner'
import { WhatsAppFloat } from './components/WhatsAppFloat'

export default function App() {
  return (
    <MotionConfig reducedMotion={FORCE_MOTION ? 'never' : 'user'}>
      <ScrollProgress />
      <Header />
      <SideNav />
      <main id="conteudo">
        <Hero />
        <Manifesto />
        <About />
        <ExperienceCards />
        <Marquee />
        <Gallery />
        <Gastronomy />
        <FamilyExperience />
        <Events />
        <Marquee tone="copper" baseVelocity={2} />
        <VisitPlanner />
        <InstagramSection />
        <Location />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </MotionConfig>
  )
}
