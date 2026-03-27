import { useState, useEffect } from 'react'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Patch Notes', href: '#update' },
  { name: 'About Game', href: '#about' },
  { name: 'Core Mechanics', href: '#features' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  // เปลี่ยนสไตล์ตอน Scroll หน้าเว็บ
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md shadow-2xl' : 'bg-black/50 backdrop-blur-sm'}`}>
      <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between h-[80px]">
        
        {/* ชื่อเกม (Logo) */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-2xl font-black text-amber-400 tracking-tighter group-hover:text-white transition-colors">
            FarmIsekai
          </span>
          <span className="text-xl opacity-80 group-hover:rotate-12 group-hover:scale-110 transition-transform">🌱</span>
        </a>

        {/* เมนูตรงกลาง (ซ่อนในมือถือ) */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-stone-100 hover:text-amber-300 font-bold text-lg tracking-wide transition-colors relative group"
            >
              {item.name}
              {/* เส้นใต้เวลากด Hover */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* ปุ่มด้านขวา */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 transition-all">
             Watch Trailer
          </button>
          <button 
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg hover:-translate-y-0.5 transition-all"
            onClick={() => alert('Coming Soon!')}
          >
             Play Now
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar