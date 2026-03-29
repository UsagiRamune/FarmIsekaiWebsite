import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Update from './components/Update'
import AboutGame from './components/AboutGame'
import GameFeatures from './components/GameFeatures'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen' // โหลดมาใส่

function App() {
  const [isLoading, setIsLoading] = useState(true)

  // ล็อค Scroll ของ Body ตอนกำลังโหลด
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0) // บังคับให้อยู่บนสุด
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-300">
      
      {/* หน้าโหลด Cinematic */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Navbar />
      <main>
        {/* ปรับ ID ให้ตรงกับ Navbar Observer */}
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