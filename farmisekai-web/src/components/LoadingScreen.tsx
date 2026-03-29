import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import coverImg from '../assets/FarmIsekai_Cover.png'
import titleLogo from '../assets/FarmIsekai_Title.png'
import teamLogo from '../assets/TeamLogo.png'

interface LoadingScreenProps {
  onComplete: () => void
}

// ============================================================
// Web Audio API
// ============================================================
const createAudioContext = () =>
  new (window.AudioContext || (window as any).webkitAudioContext)()

const playChime = () => {
  try {
    const ctx = createAudioContext()
    const frequencies = [523.25, 659.25, 783.99, 1046.5]
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = 'sine'; osc.frequency.value = freq
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12)
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.12 + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.8)
      osc.start(ctx.currentTime + i * 0.12)
      osc.stop(ctx.currentTime + i * 0.12 + 0.8)
    })
    setTimeout(() => ctx.close(), 2000)
  } catch (_) {}
}

const playWhooshThud = () => {
  try {
    const ctx = createAudioContext()
    const bufSize = ctx.sampleRate * 0.3
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource(); noise.buffer = buf
    const filter = ctx.createBiquadFilter(); filter.type = 'bandpass'
    filter.frequency.setValueAtTime(800, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.25)
    const gN = ctx.createGain()
    gN.gain.setValueAtTime(0.4, ctx.currentTime)
    gN.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    noise.connect(filter); filter.connect(gN); gN.connect(ctx.destination); noise.start()
    const osc = ctx.createOscillator(); const gO = ctx.createGain()
    osc.connect(gO); gO.connect(ctx.destination); osc.type = 'sine'
    osc.frequency.setValueAtTime(120, ctx.currentTime + 0.22)
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5)
    gO.gain.setValueAtTime(0, ctx.currentTime + 0.22)
    gO.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.25)
    gO.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
    osc.start(ctx.currentTime + 0.22); osc.stop(ctx.currentTime + 0.6)
    setTimeout(() => ctx.close(), 1500)
  } catch (_) {}
}

const playPop = (pitch = 1.0) => {
  try {
    const ctx = createAudioContext()
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination); osc.type = 'sine'
    osc.frequency.setValueAtTime(600 * pitch, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200 * pitch, ctx.currentTime + 0.12)
    gain.gain.setValueAtTime(0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)
    osc.start(); osc.stop(ctx.currentTime + 0.18)
    setTimeout(() => ctx.close(), 500)
  } catch (_) {}
}

const playSwoosh = () => {
  try {
    const ctx = createAudioContext()
    const bufSize = ctx.sampleRate * 0.5
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource(); noise.buffer = buf
    const filter = ctx.createBiquadFilter(); filter.type = 'highpass'
    filter.frequency.setValueAtTime(2000, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(8000, ctx.currentTime + 0.4)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45)
    noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination); noise.start()
    setTimeout(() => ctx.close(), 1000)
  } catch (_) {}
}

// ============================================================

type Phase =
  | 'loading'     // ตัวอักษร wave bounce
  | 'studio'      // TeamLogo fade in/out
  | 'cover'       // BG + tap to continue (ไม่มี title logo!)
  | 'bars-in'     // cinematic bars bounce เข้า
  | 'bars-hold'   // ค้าง
  | 'bars-close'  // ปิดเต็มจอ
  | 'reveal'      // เปิดจอ + title logo ใหญ่โผล่
  | 'logo-pop'    // bounce pop
  | 'logo-fly'    // warp ไป navbar
  | 'done'

const COVER_PHASES: Phase[] = ['cover','bars-in','bars-hold','bars-close','reveal','logo-pop','logo-fly','done']
const BAR_PHASES: Phase[]   = ['bars-in','bars-hold','bars-close','reveal','logo-pop','logo-fly','done']

// ตัวอักษร wave สำหรับ LOADING
const LOADING_TEXT = 'LOADING'

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase]         = useState<Phase>('loading')
  const [progress, setProgress]   = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [mousePos, setMousePos]   = useState({ x: 0, y: 0 })
  const [canTap, setCanTap]       = useState(false)
  const tapped = useRef(false)

  // ---- Loading progress ----
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          // โหลดเสร็จ → รอ 0.5s แล้วไป studio
          setTimeout(() => setPhase('studio'), 500)
          return 100
        }
        return Math.min(prev + Math.floor(Math.random() * 8) + 3, 100)
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  // ---- Studio → Cover timeline ----
  useEffect(() => {
    if (phase !== 'studio') return
    playChime()
    // studio ค้าง 2.5s แล้วไป cover
    const t = setTimeout(() => {
      setPhase('cover')
      // เปิดให้ tap หลัง BG ขึ้นมาแล้ว 2s
      setTimeout(() => setCanTap(true), 2000)
    }, 2800)
    return () => clearTimeout(t)
  }, [phase])

  // Parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (phase !== 'cover') return
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * -30,
      y: (e.clientY / window.innerHeight - 0.5) * -30,
    })
  }

  // Tap
  const handleTap = () => {
    if (!canTap || tapped.current) return
    tapped.current = true; setCanTap(false)

    setPhase('bars-in');   playWhooshThud()
    setTimeout(() => setPhase('bars-hold'),  900)
    setTimeout(() => setPhase('bars-close'), 1600)
    setTimeout(() => setPhase('reveal'),     2400)
    setTimeout(() => { setPhase('logo-pop'); playPop(1.0) }, 3200)
    setTimeout(() => playPop(1.4), 3700)
    setTimeout(() => { setPhase('logo-fly'); playSwoosh() }, 4200)
    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onComplete(), 800)
    }, 5000)
  }

  const barHeight =
    phase === 'bars-in' || phase === 'bars-hold' ? '15vh' :
    ['bars-close','reveal','logo-pop','logo-fly','done'].includes(phase) ? '50vh' : 0

  const barTrans = (delay = 0) =>
    phase === 'bars-in'
      ? { duration: 0.55, ease: [0.68, -0.55, 0.265, 1.55] as any, delay }
      : phase === 'bars-close'
      ? { duration: 0.5, ease: 'easeInOut' as const }
      : { duration: 0.3 }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden transition-opacity duration-700 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      onClick={handleTap}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="wait">

        {/* ── PHASE 1: LOADING wave ── */}
        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8 select-none"
          >
            {/* ตัวอักษรกระโดด wave */}
            <div className="flex items-end gap-1">
              {LOADING_TEXT.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="text-4xl md:text-5xl font-black text-amber-500 tracking-tight drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]"
                  animate={{ y: [0, -18, 0] }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.08,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-56 md:w-80 flex flex-col items-center gap-2">
              <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-stone-600 text-xs font-bold tracking-widest">{progress}%</span>
            </div>
          </motion.div>
        )}

        {/* ── PHASE 2: STUDIO (TeamLogo เท่านั้น ไม่มี text ซ้อน) ── */}
        {phase === 'studio' && (
          <motion.div
            key="studio"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.0 }}
            className="flex items-center justify-center select-none"
          >
            <img
              src={teamLogo}
              alt="BigNiGameDev"
              className="h-36 md:h-52 object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            />
          </motion.div>
        )}

        {/* ── PHASE 3+: COVER WORLD ── */}
        {COVER_PHASES.includes(phase) && (
          <motion.div key="cover-world" className="absolute inset-0">

            {/* BG Cover parallax — ไม่มี title logo โผล่ตรงนี้! */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(24px)', scale: 1.08 }}
              animate={{
                opacity: ['reveal','logo-pop','logo-fly','done'].includes(phase) ? 1 : 0.9,
                filter: ['reveal','logo-pop','logo-fly','done'].includes(phase) ? 'blur(4px)' : 'blur(0px)',
                scale: 1.04,
                x: mousePos.x,
                y: mousePos.y,
              }}
              transition={{
                opacity: { duration: 1.8 },
                filter: { duration: 2.0 },
                x: { type: 'spring', stiffness: 50, damping: 20 },
                y: { type: 'spring', stiffness: 50, damping: 20 },
              }}
              className="absolute inset-0 bg-cover bg-center origin-center"
              style={{ backgroundImage: `url(${coverImg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/30" />
            </motion.div>

            {/* Tap to continue — โชว์เฉพาะ cover phase */}
            <AnimatePresence>
              {phase === 'cover' && canTap && (
                <motion.div
                  key="tap-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0 }}
                  className="absolute inset-0 flex flex-col items-end justify-end pb-16 pr-12 pointer-events-none z-10"
                >
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-2"
                  >
                    <p className="text-white text-lg md:text-2xl font-black tracking-[0.3em] uppercase drop-shadow-lg">
                      Tap to Continue
                    </p>
                    <motion.span
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="text-amber-500 text-2xl"
                    >▼</motion.span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CINEMATIC BARS */}
            {BAR_PHASES.includes(phase) && (
              <>
                <motion.div
                  className="absolute top-0 left-0 right-0 bg-black z-30"
                  initial={{ height: 0 }}
                  animate={{ height: barHeight }}
                  transition={barTrans(0)}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-black z-30"
                  initial={{ height: 0 }}
                  animate={{ height: barHeight }}
                  transition={barTrans(0.04)}
                />
              </>
            )}

            {/* REVEAL Logo กลางจอ → pop → warp หาย */}
            <AnimatePresence>
              {(phase === 'reveal' || phase === 'logo-pop' || phase === 'logo-fly') && (
                <motion.div
                  key="logo-reveal"
                  className="absolute z-40 pointer-events-none"
                  style={{ top: '50%', left: '50%', translateX: '-50%', translateY: '-50%' }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    phase === 'logo-fly'
                      ? { opacity: 0, scale: 0.04, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as any } }
                      : phase === 'logo-pop'
                      ? { opacity: 1, scale: [1.18, 0.86, 1.10, 0.95, 1.0], transition: { duration: 0.7, ease: 'easeOut' } }
                      : { opacity: 1, scale: 1.0, transition: { duration: 0.5, ease: 'easeOut' } }
                  }
                >
                  <img
                    src={titleLogo}
                    alt="FarmIsekai"
                    className="h-40 md:h-64 w-auto object-contain drop-shadow-[0_0_60px_rgba(255,200,50,0.5)]"
                  />
                  {phase === 'logo-pop' && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-amber-400/25 blur-2xl pointer-events-none"
                      initial={{ scale: 0.5, opacity: 0.9 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.65 }}
                    />
                  )}
                  {phase === 'logo-fly' && (
                    <motion.div
                      className="absolute inset-0 bg-white rounded-full blur-xl pointer-events-none"
                      initial={{ scale: 1.2, opacity: 1 }}
                      animate={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logo pop ที่ navbar หลัง warp */}
            <AnimatePresence>
              {phase === 'logo-fly' && (
                <motion.div
                  key="logo-navbar-pop"
                  className="absolute top-0 left-0 z-50 pointer-events-none flex items-center"
                  style={{ padding: '14px 24px' }}
                  initial={{ opacity: 0, scale: 0.05 }}
                  animate={{
                    opacity: 1,
                    scale: [0.05, 1.4, 0.85, 1.15, 1.0],
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.22 }}
                >
                  <img
                    src={titleLogo}
                    alt="FarmIsekai"
                    className="h-11 md:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(217,119,6,0.8)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

export default LoadingScreen