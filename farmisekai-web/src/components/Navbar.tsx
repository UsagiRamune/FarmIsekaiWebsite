import { useState, useEffect } from 'react'
import titleLogo from '../assets/FarmIsekai_Title.png' 

// ประกาศ Type ให้ TypeScript เลิกบ่น!
type DropdownItem = {
  name: string;
  href?: string;
  action?: string;
};

type NavItemType = {
  name: string;
  href: string;
  targetId: string;
  dropdown?: DropdownItem[];
};

const navItems: NavItemType[] = [
  { name: 'Home', href: '#hero', targetId: 'hero' },
  { 
    name: 'Patch Notes', href: '#update', targetId: 'update',
    dropdown: [ { name: 'Current Patch', action: 'Current' }, { name: 'Upcoming', action: 'Upcoming' }, { name: 'Previous Patches', action: 'Previous' }, { name: 'More...', action: 'All' } ]
  },
  { name: 'About Game', href: '#about', targetId: 'about' },
  { 
    name: 'Game Mechanics', href: '#features', targetId: 'features',
    dropdown: [ { name: 'Core Mechanics', href: '#features' }, { name: 'Survival Mechanics', href: '#survival' } ]
  },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) 
      } else {
        setIsVisible(true)  
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const sections = document.querySelectorAll('div[id]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.3 }) 

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // สังเกตตรง item: DropdownItem กูระบุ Type ให้มันละ
  const handleDropdownClick = (e: React.MouseEvent, item: DropdownItem) => {
    if (item.action) {
      e.preventDefault()
      document.getElementById('update')?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-patch-modal', { detail: item.action }))
      }, 400)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-stone-950/95 backdrop-blur-md shadow-2xl border-b border-white/5 py-3' : 'bg-transparent backdrop-blur-sm py-4'}`}>
      <div className="max-w-[1500px] mx-auto px-6 flex items-center justify-between">
        
        <a href="#hero" className="flex items-center group shrink-0">
          <img 
            src={titleLogo} 
            alt="FarmIsekai" 
            className="h-11 md:h-12 w-auto object-contain drop-shadow-lg group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(217,119,6,0.3)] transition-all duration-300" 
          />
        </a>

        <div className="hidden lg:flex items-center gap-8 ml-auto">
          <div className="flex items-center gap-8 mr-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.targetId || (item.targetId === 'features' && activeSection === 'survival');
              return (
              <div key={item.name} className="relative group">
                <a 
                  href={item.href} 
                  className={`font-bold text-base tracking-wide transition-colors flex items-center gap-1.5 py-2
                  ${isActive ? 'text-amber-500' : 'text-stone-300 hover:text-amber-400'}`}
                >
                  {item.name}
                  {item.dropdown && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 opacity-60 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>

                {item.dropdown && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                    <div className="py-2">
                      {item.dropdown.map((dropItem) => (
                        <a 
                          key={dropItem.name} 
                          // ตรงนี้ก็เคลียร์ ไม่แดงแน่นอน
                          href={dropItem.href || '#update'} 
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
            )})}
          </div>

          <div className="flex items-center gap-4 border-l border-stone-700 pl-6">
            <a href="https://www.facebook.com/FarmIsekai" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-[#1877F2] hover:scale-110 transition-all">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.youtube.com/@BigNiGameDev" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-[#FF0000] hover:scale-110 transition-all">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>

          <button 
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black tracking-wider uppercase rounded-lg shadow-[0_0_15px_rgba(217,119,6,0.5)] hover:shadow-[0_0_25px_rgba(217,119,6,0.8)] hover:-translate-y-0.5 transition-all"
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