import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Update from './components/Update'
import AboutGame from './components/AboutGame'
import GameFeatures from './components/GameFeatures'
import Footer from './components/Footer'

function App() {
  return (
    // เปลี่ยนจาก bg-green-50 เป็น bg-stone-950 สีพื้นหลังหลักของเว็บจะดำมืดเลย
    <div className="min-h-screen bg-stone-950 font-sans text-stone-300 pt-[80px]">
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