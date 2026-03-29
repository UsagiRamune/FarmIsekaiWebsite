import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import coverImg from '../assets/FarmIsekai_Cover.png'
import titleLogo from '../assets/FarmIsekai_Title.png'
import teamLogo from '../assets/TeamLogo.png'

// 💡 วิธีใส่เสียง: เอารูปแบบนี้ไปใช้ ถ้ามึงมีไฟล์เสียง
// import sfxPop from '../assets/pop.mp3'
// import sfxSwoosh from '../assets/swoosh.mp3'

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'studio' | 'cover' | 'logo-pop1' | 'logo-pop2' | 'logo-fly'>('loading')
  const [isExiting, setIsExiting] = useState(false)
  
  // State สำหรับเก็บตำแหน่งเมาส์ (ทำ Genshin Effect)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // 1. จำลองหลอดโหลด (0 -> 100)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('studio'), 500) // ไปหน้าโลโก้ทีม
          setTimeout(() => setPhase('cover'), 3500) // ไปหน้าปกเกม
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 2
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // 2. ฟังก์ชันจับเมาส์ขยับ (Parallax)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (phase !== 'cover') return; // ให้ขยับได้เฉพาะตอนอยู่หน้าปก
    // คำนวณให้เมาส์ขยับภาพไปในทิศทางตรงข้าม (หรือทิศเดียวกันก็ได้) สูงสุด 20px
    const x = (e.clientX / window.innerWidth - 0.5) * -30;
    const y = (e.clientY / window.innerHeight - 0.5) * -30;
    setMousePos({ x, y });
  }

  // 3. เมื่อกด Tap to continue
  const handleTap = () => {
    if (phase !== 'cover') return
    
    // จังหวะที่ 1: โลโก้ Pop 1 (ขยายแล้วหุบ)
    setPhase('logo-pop1')
    // new Audio(sfxPop).play() // 💡 ปลดคอมเมนต์ตรงนี้ถ้ามีเสียง

    // จังหวะที่ 2: โลโก้ Pop 2 (ขยายใหญ่ขึ้น)
    setTimeout(() => {
      setPhase('logo-pop2')
      // new Audio(sfxPop).play()
    }, 600)

    // จังหวะที่ 3: โลโก้บินไป Navbar (Fly)
    setTimeout(() => {
      setPhase('logo-fly')
      // new Audio(sfxSwoosh).play() // 💡 ปลดคอมเมนต์ตรงนี้ถ้ามีเสียง
    }, 1200)

    // จังหวะที่ 4: Fade Out หน้า Loading ทิ้ง
    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        onComplete() // เข้าเกมจริงๆ
      }, 1000) 
    }, 2200)
  }

  // ตั้งค่าแอนิเมชันให้ Framer Motion
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, x: '-50%', y: '-50%' },
    center: { opacity: 1, scale: 1, x: '-50%', y: '-50%' },
    pop1: { scale: [1, 1.3, 1], transition: { duration: 0.6, ease: "backOut" } },
    pop2: { scale: [1, 1.5], transition: { duration: 0.6, ease: "backOut" } },
    // บินไปซ้ายบนแบบสมูทๆ
    fly: { opacity: 1, scale: 1, x: '24px', y: '16px', top: '0%', left: '0%', transition: { duration: 1, ease: 'easeInOut' } }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-1000 overflow-hidden ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      onClick={handleTap}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        
        {/* เฟส 1: โหลด (หลอดโหลด) */}
        {phase === 'loading' && (
          <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
            <h1 className="text-4xl md:text-5xl font-black text-amber-500 tracking-tighter drop-shadow-lg">FarmIsekai</h1>
            <div className="w-64 md:w-96 h-1.5 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
               <div className="h-full bg-amber-500 shadow-[0_0_15px_#f59e0b] transition-all duration-200" style={{ width: `${progress}%` }}></div>
             </div>
             <p className="text-stone-500 font-bold tracking-widest text-sm uppercase">Loading Assets <span className="text-amber-500">{progress}%</span></p>
          </motion.div>
        )}

        {/* เฟส 2: โชว์โลโก้ทีม BigNi GameDev (Fade In แล้ว Out) */}
        {phase === 'studio' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1 }} 
            transition={{ duration: 0.8 }} 
            className="flex flex-col items-center gap-6"
          >
            <img src={teamLogo} alt="BigNi GameDev Studio" className="h-32 md:h-48 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]" />
            <p className="text-stone-500 font-bold tracking-[0.4em] text-sm uppercase">Presented by <strong className="text-white">BigNi GameDev</strong></p>
          </motion.div>
        )}

        {/* เฟส 3 เป็นต้นไป: โชว์ปกเกม + แอนิเมชัน */}
        {(phase === 'cover' || phase === 'logo-pop1' || phase === 'logo-pop2' || phase === 'logo-fly') && (
          <>
            {/* Background พร้อมระบบ Parallax (Genshin Style) */}
            <motion.div 
              initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }} 
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1.05, x: mousePos.x, y: mousePos.y }} 
              transition={{ 
                opacity: { duration: 1.5 }, 
                filter: { duration: 1.5 },
                // ระบบเด้งๆ สปริงๆ เวลาเมาส์ขยับ
                x: { type: 'spring', stiffness: 50, damping: 20 },
                y: { type: 'spring', stiffness: 50, damping: 20 }
              }} 
              className="absolute inset-0 w-full h-full bg-cover bg-center origin-center" 
              style={{ backgroundImage: `url(${coverImg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 pointer-events-none"></div>
            </motion.div>
          
            {/* Tap to continue (โชว์เฉพาะเฟส Cover) */}
            {phase === 'cover' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute inset-0 flex flex-col items-center justify-center animate-pulse cursor-pointer z-10">
                <p className="text-white text-3xl md:text-4xl font-black tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">Tap to Continue</p>
                <span className="text-amber-500 text-4xl mt-2 drop-shadow-lg">▼</span>
              </motion.div>
            )}

            {/* แอนิเมชันโลโก้ Title Game (Pop 1 -> Pop 2 -> Fly) */}
            <motion.div 
              className="absolute pointer-events-none flex items-center justify-center h-44 md:h-64 w-auto z-50"
              initial="hidden" 
              animate={phase === 'logo-fly' ? 'fly' : phase === 'logo-pop1' ? 'pop1' : phase === 'logo-pop2' ? 'pop2' : 'center'}
              variants={logoVariants}
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <img src={titleLogo} alt="FarmIsekai" className="h-full w-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
            </motion.div>
          </>
        )}

      </AnimatePresence>
    </div>
  )
}

export default LoadingScreen