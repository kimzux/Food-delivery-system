import Navbar from './components/NavBar'
import HeroSection from './components/HeroSection'
import ServiceSection from './components/ServiceSection'
import MenuSection from './components/MenuSection'
import FeedbackSection from './components/FeedbackSEction'
import GetStarted from './components/GetStarted'
import Footer from './components/Footer'

function App() {
  return (
    <div className="p-4 relative md:mt-5 mb-12 xl:px-20">
      <Navbar />
      <HeroSection />
      <ServiceSection />
      <MenuSection />
      <FeedbackSection />
      <GetStarted />
      <Footer />
    </div>
  )
}

export default App
