import { useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

const galleryItems = [
  { id: 1, type: 'video', src: '' },
  { id: 2, type: 'image', src: '' },
  { id: 3, type: 'image', src: '' },
  { id: 4, type: 'image', src: '' },
  { id: 5, type: 'image', src: '' },
]

const AboutGame = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const dragDistanceRef = useRef(0) // เพิ่ม Ref จับระยะลาก

  const velocityRef = useRef(0)
  const momentumRef = useRef<number | null>(null)
  const lastMouseXRef = useRef(0)
  const lastTimeRef = useRef(0)

  const handleMouseDown = (e: ReactMouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    dragDistanceRef.current = 0 // รีเซ็ตระยะลาก
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
    
    dragDistanceRef.current += Math.abs(e.movementX) // เก็บรอยสะสมระยะลาก
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

  const handleMouseUpOrLeave = (e: ReactMouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)

    // ตรวจสอบ: ถ้าระยะลากน้อยมาก ให้ถือเป็นการคลิก
    if (dragDistanceRef.current < 5) {
      // ตัวอย่าง: ถ้าคลิกวิดีโอ (item type="video") ให้โชว์ alert
      const target = e.target as HTMLElement;
      if (target.closest('[data-type="video"]')) {
          alert('Click to Open Video: This is where the Lightbox logic goes');
      }
      if (target.closest('[data-type="image"]')) {
          alert('Click to View Full Image: This is where the Lightbox logic goes');
      }
      return; // หยุดการทำงานเฉื่อย (Inertia)
    }

    // ทำงานเฉื่อยต่อตามปกติ
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
    <section className="py-24 px-6 bg-[#faf6ed] text-stone-800 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* ================= ฝั่งซ้าย: เนื้อเรื่อง ================= */}
        <div className="w-full lg:w-5/12 space-y-8 z-10 shrink-0">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-amber-900 tracking-tight leading-tight">
              ชีวิตสโลว์ไลฟ์ในต่างโลก?<br/> 
              <span className="text-orange-600 block mt-2">ลืมไปได้เลย!</span>
            </h2>
            <div className="prose prose-lg prose-stone text-stone-600 leading-loose space-y-5 max-w-none">
              <p>
                ตื่นขึ้นมาในต่างโลกทั้งที นึกว่าจะได้เป็นผู้กล้ามีพลังโกงๆ... เปล่าเลย! คุณต้องมาจับจอบถางหญ้า ปลูกกะหล่ำปลี และเอาชีวิตรอดจากมอนสเตอร์ที่จ้องจะบุกฟาร์มของคุณตอนกลางคืน 
              </p>
              <p>
                ใน <strong className="text-amber-800">FarmIsekai</strong> คุณจะได้สัมผัสประสบการณ์เกมเอาชีวิตรอดมุมมองบุคคลที่สาม ที่ผสมผสานการทำฟาร์มแบบลึกซึ้ง เข้ากับการสำรวจดินแดนปริศนาและการต่อสู้สุดระทึกขวัญ 
              </p>
              <p className="font-bold text-amber-950 text-xl border-l-4 border-orange-500 pl-4">
                สร้างฟาร์มที่สงบสุข หรือจับอาวุธท้าทายความมืด... ทุกอย่างขึ้นอยู่กับคุณ!
              </p>
            </div>
          </div>
        </div>

        {/* ================= ฝั่งขวา: คลังภาพแบบลื่นๆ ================= */}
        <div className="w-full lg:w-7/12 relative group">
          <button onClick={() => scroll('left')} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-amber-900 p-4 rounded-full shadow-lg opacity- group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button onClick={() => scroll('right')} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-amber-900 p-4 rounded-full shadow-lg opacity- group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>

          <div 
            ref={scrollRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseUpOrLeave} onMouseUp={handleMouseUpOrLeave} onMouseMove={handleMouseMove}
            className={`flex items-center gap-6 overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                data-type={item.type} // เพิ่ม Data attribute ไว้เช็คตอนคลิก
                className="flex-none w-[85vw] sm:w-[400px] md:w-[500px] aspect-video rounded-2xl shadow-xl border-4 border-white transform transition-transform duration-300 relative overflow-hidden bg-stone-200 cursor-pointer" // เพิ่ม cursor-pointer เพื่อบอกว่าคลิกได้
              >
                <div className="absolute inset-0 z-10 pointer-events-none"></div>
                {item.type === 'video' ? (
                  <div className="w-full h-full relative bg-stone-900 pointer-events-auto">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 border-4 border-dashed border-stone-600 m-2 rounded-xl">
                      <span className="text-6xl mb-4">▶️</span><p className="font-bold tracking-widest text-sm">TRAILER VIDEO</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 border-4 border-dashed border-stone-300 m-2 rounded-xl">
                      <span className="text-5xl mb-2">📸</span><p className="font-bold text-sm">PROMO IMAGE 16:9</p>
                    </div>
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