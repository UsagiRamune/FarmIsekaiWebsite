import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Update from './components/Update'
import AboutGame from './components/AboutGame'
import GameFeatures from './components/GameFeatures'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen' // ต้องมีบรรทัดนี้นะ

function App() {
  const [isLoading, setIsLoading] = useState(true)

  // ล็อค Scroll ของ Body ตอนกำลังโหลด
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-300">
      
      {/* นี่คือตัวเรียกหน้า Loading Screen! ถ้าไม่มีบรรทัดนี้มันจะไม่ขึ้น */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Navbar />
      <main>
        <div id="hero"><Hero /></div>
        <div id="update"><Update /></div>
        <div id="about"><AboutGame /></div>
        <div id="features"><GameFeatures /></div>
      </main>
      <Footer />
    </div>
  )
}

export default App