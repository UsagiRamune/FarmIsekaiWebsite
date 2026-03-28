import { useState, useEffect } from 'react'

const navItems = [
  { name: 'Home', href: '#hero' },
  { 
    name: 'Patch Notes', 
    href: '#update',
    dropdown: [
      { name: 'Current Patch', action: 'Current' },
      { name: 'Previous Patches', action: 'Previous' },
      { name: 'Upcoming', action: 'Upcoming' },
      { name: 'More...', action: 'All' }
    ]
  },
  { name: 'About Game', href: '#about' },
  { 
    name: 'Game Mechanics', 
    href: '#features',
    dropdown: [
      { name: 'Core Mechanics', href: '#features' },
      // เปลี่ยน href ให้พุ่งไปที่ id ของ survival โดยเฉพาะ
      { name: 'Survival Mechanics', href: '#survival' } 
    ]
  },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ฟังก์ชันยิงคำสั่งไปเปิด Popup ที่หน้า Update
  const handleDropdownClick = (e: React.MouseEvent, item: any) => {
    if (item.action) {
      e.preventDefault()
      // 1. สั่งให้เลื่อนลงไปหน้า Update ก่อน
      document.getElementById('update')?.scrollIntoView({ behavior: 'smooth' })
      // 2. ดีเลย์นิดนึงให้จอเลื่อนเสร็จ แล้วยิง Event สั่งเปิด Popup 
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-patch-modal', { detail: item.action }))
      }, 400)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-stone-950/95 backdrop-blur-md shadow-2xl border-b border-white/5' : 'bg-transparent backdrop-blur-sm'}`}>
      <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between h-[80px]">
        
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-2xl font-black text-amber-500 tracking-tighter group-hover:text-white transition-colors">
            FarmIsekai
          </span>
          <span className="text-xl opacity-80 group-hover:rotate-12 group-hover:scale-110 transition-transform">⚔️</span>
        </a>

        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <a 
                href={item.href} 
                className="text-stone-300 hover:text-amber-500 font-bold text-lg tracking-wide transition-colors flex items-center gap-1.5 py-2"
              >
                {item.name}
                {item.dropdown && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 opacity-60 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </a>

              {item.dropdown && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                  <div className="py-2">
                    {item.dropdown.map((dropItem) => (
                      <a 
                        key={dropItem.name} 
                        href={('href' in dropItem ? dropItem.href : '#update')} 
                        onClick={(e) => handleDropdownClick(e, dropItem)}
                        className="block px-5 py-3 text-stone-300 hover:text-amber-500 hover:bg-stone-800/50 transition-colors font-semibold"
                      >
                        {dropItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="px-8 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black tracking-wider uppercase rounded-lg shadow-[0_0_15px_rgba(217,119,6,0.5)] hover:shadow-[0_0_25px_rgba(217,119,6,0.8)] hover:-translate-y-0.5 transition-all"
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