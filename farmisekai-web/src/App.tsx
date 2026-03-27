import Navbar from './components/Navbar' // เพิ่ม Navbar
import Hero from './components/Hero'
import Update from './components/Update'
import AboutGame from './components/AboutGame'
import GameFeatures from './components/GameFeatures'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-green-50 font-sans text-gray-800 pt-[80px]"> {/* เผื่อพื้นที่ให้ Navbar */}
      <Navbar /> {/* ใส่ Navbar บรรทัดแรกสุด */}
      <main>
        {/* เพิ่ม ID ให้แต่ละ Section เพื่อให้ Nav link มาถึง */}
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