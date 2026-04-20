import Navbar from './components/NavBar'
import HeroSection from './components/HeroSection'
import ServiceSection from './components/ServiceSection'

function App() {
  return (
    <div className="p-4 relative md:mt-5 mb-12 xl:px-20">
      <Navbar />
      <HeroSection />
      <ServiceSection />
    </div>
  )
}

export default App
