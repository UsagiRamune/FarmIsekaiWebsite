import Hero from './components/Hero'
import Update from './components/Update'
import AboutGame from './components/AboutGame'
import GameFeatures from './components/GameFeatures'
import Trailer from './components/Trailer'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-green-50 font-sans text-gray-800">
      <main>
        <Hero />
        <Update />
        <AboutGame />
        <GameFeatures />
        <Trailer />
      </main>
      <Footer />
    </div>
  )
}

export default App