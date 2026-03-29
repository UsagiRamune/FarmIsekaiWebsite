import { useState, useRef, useEffect } from 'react'

// Import GIF ทั้งหมดจากโฟลเดอร์ assets ตามที่มึงมี
import preview1 from '../assets/preview1.png' // ใช้แทน Find Seed ไปก่อน
import cultivateGif from '../assets/Cultivate.gif'
import natureGif from '../assets/Nature.gif' // ตามชื่อไฟล์ที่มึงแคปมา
import harvestGif from '../assets/Harvest.gif'
import tradeGif from '../assets/Trade.gif'

import exploringGif from '../assets/Exploring.gif'
import dayNightGif from '../assets/DayNightCycle.gif'
import farmDefenseGif from '../assets/FarmDefense.gif'
import progressionGif from '../assets/Progression.gif'

// ----------------- ข้อมูล Core Loop ----------------- //
const coreLoop = [
  { step: '01', title: 'Find Seed', icon: '🔍', desc: 'ออกค้นหาเมล็ดพันธุ์เวทมนตร์และทรัพยากรตั้งต้นในดินแดนปริศนา', gifImg: preview1 },
  { step: '02', title: 'Cultivate', icon: '🌱', desc: 'เตรียมหน้าดิน ไถพรวน และหว่านเมล็ดลงบนแปลงเกษตรของคุณ', gifImg: cultivateGif },
  { step: '03', title: 'Nurture', icon: '💧', desc: 'หมั่นรดน้ำ ดูแลรักษาพืชผลให้รอดพ้นจากสภาพอากาศที่แปรปรวน', gifImg: natureGif },
  { step: '04', title: 'Harvest', icon: '🌾', desc: 'เก็บเกี่ยวผลผลิตที่เติบโตเต็มที่ รวบรวมวัตถุดิบคุณภาพสูง', gifImg: harvestGif },
  { step: '05', title: 'Trade', icon: '💰', desc: 'นำผลผลิตไปค้าขายเพื่อทำกำไร นำเงินมาอัปเกรดฟาร์มและอาวุธ', gifImg: tradeGif },
]

// ----------------- ข้อมูล Survival Mechanics ----------------- //
const subMechanics = [
  { id: 'exploration', title: 'Exploring', icon: '🗺️', desc: 'ออกสำรวจ ค้นหาทรัพยากรล้ำค่า และบริหารช่องเก็บของที่มีจำกัด', gifImg: exploringGif },
  { id: 'day-night', title: 'Day-Night Cycle', icon: '🌗', desc: 'เช้าคือเวลาทำฟาร์ม แต่เมื่อตะวันตกดิน... การเอาชีวิตรอดจะเริ่มต้นขึ้น', gifImg: dayNightGif },
  { id: 'defensive', title: 'Base Defense', icon: '🛡️', desc: 'สร้างกำแพง วางกับดัก และเตรียมอาวุธรับมือมอนสเตอร์ยามวิกาล', gifImg: farmDefenseGif },
  { id: 'progression', title: 'Progression', icon: '📈', desc: 'บริหารเวลา ค้าขายพืชคุณภาพสูง และทำภารกิจเพื่อเลี่ยงบทลงโทษหนัก', gifImg: progressionGif }
]

const GameFeatures = () => {
  const [activeCoreStep, setActiveCoreStep] = useState(coreLoop[0]);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // ระบบ Auto-Play สำหรับ Core Mechanics (สลับทุก 4 วินาที)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveCoreStep((current) => {
        const currentIndex = coreLoop.findIndex((item) => item.step === current.step);
        const nextIndex = (currentIndex + 1) % coreLoop.length;
        return coreLoop[nextIndex];
      });
    }, 4000); 
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleStepHover = (step: typeof coreLoop[0]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
        setActiveCoreStep(step);
    }, 50) as unknown as number;
  };

  return (
    <section className="py-32 px-6 bg-stone-950 text-stone-100 overflow-hidden relative border-t border-white/5">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-[1500px] mx-auto relative z-10 space-y-32">
        
        {/* ================= โซน 1: CORE MECHANICS ================= */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-sm md:text-base font-black text-amber-500 tracking-[0.4em] uppercase mb-4 drop-shadow-md">Game Mechanics</h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight uppercase drop-shadow-2xl">Core Farming Loop</h3>
          </div>

          <div 
            className="flex flex-col md:flex-row h-auto md:min-h-[550px] gap-6 rounded-3xl md:rounded-[2rem] border-4 border-amber-500 bg-stone-900 shadow-2xl overflow-hidden"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* เมนูด้านข้างซ้าย (Vertical Nav) */}
            <div className="md:flex flex-col gap-2 p-6 order-2 md:order-1 w-full md:w-[280px] shrink-0 border-t md:border-t-0 md:border-r border-stone-800 bg-stone-950/80">
                {coreLoop.map((item) => (
                    <div 
                        key={item.step} 
                        onMouseEnter={() => handleStepHover(item)}
                        className={`relative flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 cursor-pointer 
                        ${activeCoreStep.step === item.step 
                            ? 'border-amber-500 bg-amber-600/10 shadow-glow scale-[1.02]' 
                            : 'border-stone-800 hover:border-amber-500/50 bg-stone-900/50 opacity-60 hover:opacity-100'}`}
                    >
                        <div className={`w-12 h-12 shrink-0 bg-stone-900 border-2 rounded-xl flex items-center justify-center text-2xl transition-colors ${activeCoreStep.step === item.step ? 'border-amber-500 text-white' : 'border-stone-700 text-stone-300'}`}>
                            {item.icon}
                        </div>
                        <div>
                            <span className={`block text-2xl font-black tracking-tighter ${activeCoreStep.step === item.step ? 'text-amber-500' : 'text-stone-700'}`}>{item.step}</span>
                            <span className={`text-sm font-bold transition-colors ${activeCoreStep.step === item.step ? 'text-white' : 'text-stone-400'}`}>{item.title}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ลานโชว์ GIF ด้านขวา (Main Stage) */}
            <div className="flex-1 relative flex flex-col md:flex-row items-center p-8 md:p-12 gap-10 order-1 md:order-2">
                {/* ลายน้ำเลขสเต็ปจางๆ ด้านหลัง */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
                    <span className="text-[250px] lg:text-[400px] font-black text-amber-500 tracking-tighter">{activeCoreStep.step}</span>
                </div>
                
                {/* ข้อความบรรยาย */}
                <div className="flex-1 relative z-10 space-y-6" key={activeCoreStep.step + '-text'}>
                  <div className="w-16 h-16 bg-stone-950 border-4 border-amber-500 rounded-2xl flex items-center justify-center text-4xl shadow-xl animate-bounce-y">
                    {activeCoreStep.icon}
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-white drop-shadow-md leading-tight">{activeCoreStep.title}</h3>
                  <p className="text-stone-300 text-lg leading-relaxed max-w-md drop-shadow-md">{activeCoreStep.desc}</p>
                </div>

                {/* กล่องใส่ GIF สัดส่วน 4:3 กันภาพแตก */}
                <div className="w-full max-w-[500px] flex-shrink-0 relative z-10" key={activeCoreStep.step + '-gif'}>
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-4 border-stone-800 shadow-[0_0_40px_rgba(0,0,0,0.6)] bg-stone-950 relative">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-all duration-700" 
                      style={{ backgroundImage: `url(${activeCoreStep.gifImg})` }}
                    ></div>
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-amber-500 uppercase tracking-widest border border-white/10">
                      Gameplay Demo
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* ================= โซน 2: SURVIVAL MECHANICS ================= */}
        <div id="survival" className="scroll-mt-32">
          <div className="text-center mb-16">
            <h2 className="text-sm md:text-base font-black text-red-500 tracking-[0.4em] uppercase mb-4 drop-shadow-md">The Challenge</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase drop-shadow-lg">Survival Mechanics</h3>
          </div>

          <div className="flex flex-col md:flex-row w-full h-[70vh] md:h-[450px] gap-2 md:gap-4 overflow-hidden rounded-3xl md:rounded-[2rem] border-4 border-stone-800 bg-stone-900 shadow-xl">
            {subMechanics.map((feature) => (
              <div 
                key={feature.id} 
                className="group relative flex-1 hover:flex-[4] lg:hover:flex-[5] transition-flex duration-400 ease-in-out cursor-pointer overflow-hidden rounded-2xl md:rounded-[2rem] border border-transparent hover:border-red-500/80 will-change-flex translate-z-0 bg-stone-950"
              >
                {/* พื้นหลังปกติ (สีเทาดำ) */}
                <div className="absolute inset-0 w-full h-full bg-stone-800 transition-opacity duration-300 opacity-60 group-hover:opacity-0 mix-blend-luminosity group-hover:mix-blend-normal translate-z-0"></div>
                
                {/* ลายน้ำยักษ์ตรงกลางการ์ด (โชว์ตอนยังไม่ Hover) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none translate-z-0">
                  <span className="text-[120px] md:text-[180px] grayscale filter">{feature.icon}</span>
                </div>

                {/* ภาพ GIF (โชว์ตอน Hover) */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-400 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 translate-z-0"
                  style={{ backgroundImage: `url(${feature.gifImg})` }}
                ></div>

                {/* Gradient บังข้างล่าง */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none translate-z-0"></div>

                {/* คอนเทนต์ Text */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none translate-z-0">
                  
                  {/* ไอคอน + ชื่อหัวข้อ (โชว์ตลอด โฮเวอร์แล้วเด้งขึ้นนิดนึง) */}
                  <div className="flex items-center gap-4 transition-transform duration-400 group-hover:-translate-y-2">
                    <div className="w-14 h-14 shrink-0 bg-stone-900/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-stone-700 shadow-xl group-hover:border-red-500 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white whitespace-nowrap drop-shadow-lg leading-none">
                      {feature.title}
                    </h3>
                  </div>

                  {/* คำอธิบาย (ซ่อนไว้ โผล่ตอน Hover) */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-400 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-stone-300 text-lg leading-relaxed drop-shadow-md pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100 line-clamp-2 md:line-clamp-none">
                        {feature.desc}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default GameFeatures