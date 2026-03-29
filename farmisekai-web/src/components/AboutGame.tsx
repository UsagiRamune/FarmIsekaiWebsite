import { useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

// Import รูปจาก assets
import coverImg from '../assets/FarmIsekai_Cover.png'
import preview1 from '../assets/preview1.png'
import preview2 from '../assets/preview2.png'
import preview3 from '../assets/preview3.png'

const galleryItems = [
  { id: 1, type: 'video', src: 'https://www.youtube.com/embed/VCuuOmOubWU', label: 'FarmIsekai Official Trailer' },
  { id: 2, type: 'image', src: coverImg, label: 'FarmIsekai Cover' },
  { id: 3, type: 'image', src: preview1, label: 'Gameplay Preview 1' },
  { id: 4, type: 'image', src: preview2, label: 'Gameplay Preview 2' },
  { id: 5, type: 'image', src: preview3, label: 'Gameplay Preview 3' },
]

const AboutGame = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const dragDistanceRef = useRef(0)

  const velocityRef = useRef(0)
  const momentumRef = useRef<number | null>(null)
  const lastMouseXRef = useRef(0)
  const lastTimeRef = useRef(0)

  const handleMouseDown = (e: ReactMouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    dragDistanceRef.current = 0
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)

    if (momentumRef.current) cancelAnimationFrame(momentumRef.current)
    velocityRef.current = 0
    lastMouseXRef.current = e.pageX
    lastTimeRef.current = performance.now()
  }

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    
    dragDistanceRef.current += Math.abs(e.movementX)
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk

    const now = performance.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      velocityRef.current = (e.pageX - lastMouseXRef.current) / dt
    }
    lastMouseXRef.current = e.pageX
    lastTimeRef.current = now
  }

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (dragDistanceRef.current < 5) return;

    const applyMomentum = () => {
      if (!scrollRef.current) return
      const friction = 0.92 
      velocityRef.current *= friction
      scrollRef.current.scrollLeft -= velocityRef.current * 15

      if (Math.abs(velocityRef.current) > 0.1) {
        momentumRef.current = requestAnimationFrame(applyMomentum)
      }
    }
    momentumRef.current = requestAnimationFrame(applyMomentum)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-24 px-6 bg-stone-950 text-stone-300 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        <div className="w-full lg:w-5/12 space-y-8 z-10 shrink-0">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-amber-500 tracking-tight leading-tight">
              ชีวิตสโลว์ไลฟ์ในต่างโลก?<br/> 
              <span className="text-white block mt-2">ลืมไปได้เลย!</span>
            </h2>
            <div className="prose prose-lg prose-invert text-stone-400 leading-loose space-y-5 max-w-none">
              <p>ตื่นขึ้นมาในต่างโลกทั้งที นึกว่าจะได้เป็นผู้กล้ามีพลังโกงๆ... เปล่าเลย! คุณต้องมาจับจอบถางหญ้า ปลูกพืชผล และเอาชีวิตรอดจากมอนสเตอร์ที่จ้องจะบุกฟาร์มของคุณตอนกลางคืน</p>
              <p>ใน <strong className="text-amber-500">FarmIsekai</strong> คุณจะได้สัมผัสเกมแนว Survival Farming มุมมอง 3D Third-Person ที่ความตายมีราคาแพงลิ่ว และทุกคืนคือฝันร้าย</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 relative group">
          <button onClick={() => scroll('left')} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-stone-900/90 hover:bg-stone-800 text-amber-500 p-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button onClick={() => scroll('right')} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-stone-900/90 hover:bg-stone-800 text-amber-500 p-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>

          <div 
            ref={scrollRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseUpOrLeave} onMouseUp={handleMouseUpOrLeave} onMouseMove={handleMouseMove}
            className={`flex items-center gap-6 overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className="flex-none w-[85vw] sm:w-[450px] md:w-[550px] aspect-video rounded-2xl shadow-xl border-4 border-stone-800 transform transition-transform duration-300 relative overflow-hidden bg-stone-900" 
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full relative pointer-events-auto">
                    <iframe 
                        src={`${item.src}?autoplay=0&controls=1&rel=0`} 
                        title={item.label}
                        className="w-full h-full object-cover"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    {/* แทรกรูปภาพจริงๆ ลงไปตรงนี้ แทน Placeholder */}
                    <img src={item.src} alt={item.label} className="w-full h-full object-cover pointer-events-none" draggable={false} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutGame