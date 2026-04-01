import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

// Import GIF ทั้งหมด
import preview1 from '../assets/preview1.png'
import cultivateGif from '../assets/Cultivate.gif'
import natureGif from '../assets/Nature.gif' 
import harvestGif from '../assets/Harvest.gif'
import tradeGif from '../assets/Trade.gif'

import exploringGif from '../assets/Exploring.gif'
import dayNightGif from '../assets/DayNightCycle.gif'
import farmDefenseGif from '../assets/FarmDefense.gif'
import progressionGif from '../assets/Progression.gif'

const GameFeatures = () => {
  const { lang } = useLanguage();
  
  // ย้ายข้อมูลเข้ามาใน Component เพื่อให้ดึงค่า lang ได้
  const coreLoop = [
    { 
      step: '01', icon: '🔍', gifImg: preview1,
      title: lang === 'TH' ? 'ค้นหาเมล็ดพันธุ์' : 'Find Seed', 
      desc: lang === 'TH' 
        ? 'ออกสำรวจดินแดนลึกลับที่เต็มไปด้วยอันตรายและความลับ เพื่อค้นหาเมล็ดพันธุ์เวทมนตร์และทรัพยากรตั้งต้นที่จำเป็นต่อการอยู่รอด ทุกก้าวคือความเสี่ยงที่มาพร้อมกับรางวัลที่มีค่า' 
        : 'Explore mysterious lands filled with dangers and secrets to find magical seeds and essential starting resources. Every step is a risk that comes with valuable rewards.'
    },
    { 
      step: '02', icon: '🌱', gifImg: cultivateGif,
      title: lang === 'TH' ? 'เพาะปลูก' : 'Cultivate', 
      desc: lang === 'TH'
        ? 'ลงมือถางหญ้า เตรียมหน้าดิน ไถพรวน และหว่านเมล็ดลงบนแปลงเกษตรของคุณอย่างพิถีพิถัน การวางแผนพื้นที่ปลูกและบริหารสตามิน่าให้ดีคือจุดเริ่มต้นของฟาร์มที่อุดมสมบูรณ์'
        : 'Clear the weeds, prepare the soil, plow, and carefully sow seeds on your plots. Good spatial planning and stamina management are the foundations of an abundant farm.'
    },
    { 
      step: '03', icon: '💧', gifImg: natureGif,
      title: lang === 'TH' ? 'ฟูมฟักดูแล' : 'Nurture', 
      desc: lang === 'TH'
        ? 'หมั่นรดน้ำ พรวนดิน และดูแลรักษาพืชผลของคุณให้รอดพ้นจากสภาพอากาศที่แปรปรวน ฤดูกาลที่โหดร้าย เพื่อให้ได้ผลผลิตที่มีคุณภาพสูงสุดพร้อมเก็บเกี่ยว'
        : 'Regularly water and protect your crops from unpredictable weather and harsh seasons to achieve the highest quality harvest when the time comes.'
    },
    { 
      step: '04', icon: '🌾', gifImg: harvestGif,
      title: lang === 'TH' ? 'เก็บเกี่ยว' : 'Harvest', 
      desc: lang === 'TH'
        ? 'ถึงเวลาเก็บเกี่ยวผลผลิตที่เติบโตเต็มที่อย่างภาคภูมิใจ รวบรวมวัตถุดิบคุณภาพสูงเพื่อนำไปแปรรูป ทำอาหาร คราฟต์ไอเทม หรือเตรียมไว้เป็นเสบียงสำหรับการเอาชีวิตรอด'
        : 'Proudly harvest your fully grown crops. Gather high-quality materials to process, cook, craft items, or stock up on provisions for survival.'
    },
    { 
      step: '05', icon: '💰', gifImg: tradeGif,
      title: lang === 'TH' ? 'ค้าขายทำกำไร' : 'Trade', 
      desc: lang === 'TH'
        ? 'นำผลผลิตและไอเทมที่หาได้ไปค้าขายแลกเปลี่ยนในตลาดเพื่อทำกำไร นำเงินที่ได้มาอัปเกรดเครื่องมือ ขยายอาณาเขตฟาร์ม และซื้ออาวุธยุทโธปกรณ์ที่ดีขึ้น'
        : 'Trade your harvest and found items in the market for profit. Use the money to upgrade tools, expand your farm area, and purchase better weapons.'
    },
  ]

  const subMechanics = [
    { 
      id: 'exploration', icon: '🗺️', gifImg: exploringGif,
      title: lang === 'TH' ? 'การสำรวจโลกกว้าง' : 'Exploring', 
      desc: lang === 'TH'
        ? 'ก้าวออกจากเซฟโซนเพื่อออกสำรวจโลกกว้าง ค้นหาทรัพยากรล้ำค่าที่ซ่อนอยู่ตามซอกหลืบ และบริหารจัดการพื้นที่ในช่องเก็บของ (Inventory) ที่มีอย่างจำกัดให้เกิดประโยชน์สูงสุด'
        : 'Step out of the safe zone to explore the vast world. Find precious resources hidden in every corner, and optimize your limited inventory space for maximum benefit.'
    },
    { 
      id: 'day-night', icon: '🌗', gifImg: dayNightGif,
      title: lang === 'TH' ? 'วัฏจักรกลางวัน-กลางคืน' : 'Day-Night Cycle', 
      desc: lang === 'TH'
        ? 'แสงแดดยามเช้าคือเวลาอันเงียบสงบสำหรับการทำฟาร์ม แต่เมื่อตะวันตกดิน ความมืดจะพามอนสเตอร์ดุร้ายออกมาล่า... การเอาชีวิตรอดอย่างแท้จริงจะเริ่มต้นขึ้น'
        : 'Morning sunlight offers a peaceful time for farming, but when the sun sets, darkness brings out fierce monsters... True survival begins.'
    },
    { 
      id: 'defensive', icon: '🛡️', gifImg: farmDefenseGif,
      title: lang === 'TH' ? 'ปกป้องฐานที่มั่น' : 'Base Defense', 
      desc: lang === 'TH'
        ? 'เตรียมตัวรับมือกับการรุกรานยามวิกาล สร้างกำแพงป้องกันอันแข็งแกร่ง วางกับดักอย่างมีกลยุทธ์ และคราฟต์อาวุธเพื่อปกป้องฟาร์มและผลผลิตของคุณจากฝูงมอนสเตอร์ที่หิวโหย'
        : 'Prepare for nocturnal invasions. Build sturdy defensive walls, place traps strategically, and craft weapons to protect your farm and crops from hungry monsters.'
    },
    { 
      id: 'progression', icon: '📈', gifImg: progressionGif,
      title: lang === 'TH' ? 'การพัฒนาและเติบโต' : 'Progression', 
      desc: lang === 'TH'
        ? 'บริหารเวลาที่มีค่าในแต่ละวัน พัฒนาทักษะของตัวละคร และทำภารกิจต่างๆ เพื่อปลดล็อกเทคโนโลยีใหม่ๆ หากคุณไม่พร้อมรับมือกับภัยคุกคาม บทลงโทษที่รุนแรงกำลังรออยู่'
        : 'Manage your valuable time each day, develop skills, and complete quests to unlock new technologies. If you are unprepared for threats, severe penalties await.'
    }
  ]

  const [activeCoreStep, setActiveCoreStep] = useState(coreLoop[0]);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // แก้อัปเดต State เวลากดสลับภาษา
  useEffect(() => {
    setActiveCoreStep((prev) => {
      const matched = coreLoop.find(item => item.step === prev.step);
      return matched || coreLoop[0];
    });
  }, [lang]);

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
  }, [isHovered, lang]);

  const handleStepHover = (step: typeof coreLoop[0]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
        setActiveCoreStep(step);
    }, 50) as unknown as number;
  };

  return (
    <section className="py-32 px-6 bg-stone-950 text-stone-100 overflow-hidden relative border-t border-white/5" id="features">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-[1500px] mx-auto relative z-10 space-y-32">
        
        {/* ================= โซน 1: CORE MECHANICS ================= */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-sm md:text-base font-black text-amber-500 tracking-[0.4em] uppercase mb-4 drop-shadow-md">
              {lang === 'TH' ? 'ระบบหลักของเกม' : 'Game Mechanics'}
            </h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight uppercase drop-shadow-2xl">
              {lang === 'TH' ? 'วงจรการทำฟาร์ม' : 'Core Farming Loop'}
            </h3>
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
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
                    <span className="text-[250px] lg:text-[400px] font-black text-amber-500 tracking-tighter">{activeCoreStep.step}</span>
                </div>
                
                <div className="flex-1 relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-stone-950 border-4 border-amber-500 rounded-2xl flex items-center justify-center text-4xl shadow-xl animate-bounce-y">
                    {activeCoreStep.icon}
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-white drop-shadow-md leading-tight">{activeCoreStep.title}</h3>
                  <p className="text-stone-300 text-lg leading-relaxed max-w-md drop-shadow-md">{activeCoreStep.desc}</p>
                </div>

                <div className="w-full max-w-[500px] flex-shrink-0 relative z-10">
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
            <h2 className="text-sm md:text-base font-black text-red-500 tracking-[0.4em] uppercase mb-4 drop-shadow-md">
              {lang === 'TH' ? 'ความท้าทาย' : 'The Challenge'}
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase drop-shadow-lg">
              {lang === 'TH' ? 'ระบบเอาชีวิตรอด' : 'Survival Mechanics'}
            </h3>
          </div>

          {/* ปรับเป็น xl: เพื่อแก้ปัญหา iPad ที่มึงเจอ */}
          <div className="flex flex-col xl:flex-row w-full h-auto xl:h-[450px] gap-2 xl:gap-4 overflow-hidden rounded-3xl xl:rounded-[2rem] border-4 border-stone-800 bg-stone-900 shadow-xl p-2 xl:p-0">
            {subMechanics.map((feature) => (
              <div 
                key={feature.id} 
                className="group relative h-[200px] xl:h-auto xl:flex-1 xl:hover:flex-[4] lg:hover:flex-[5] transition-flex duration-400 ease-in-out cursor-pointer overflow-hidden rounded-2xl xl:rounded-[2rem] border border-stone-700/50 xl:border-transparent hover:border-red-500/80 will-change-flex translate-z-0 bg-stone-950"
              >
                <div className="absolute inset-0 w-full h-full bg-stone-800 transition-opacity duration-300 opacity-0 xl:opacity-60 xl:group-hover:opacity-0 mix-blend-luminosity xl:group-hover:mix-blend-normal translate-z-0"></div>
                
                <div className="hidden xl:flex absolute inset-0 items-center justify-center opacity-10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none translate-z-0">
                  <span className="text-[120px] xl:text-[180px] grayscale filter">{feature.icon}</span>
                </div>

                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-400 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 scale-100 xl:scale-110 xl:group-hover:scale-100 translate-z-0"
                  style={{ backgroundImage: `url(${feature.gifImg})` }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 xl:opacity-80 xl:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none translate-z-0"></div>

                <div className="absolute inset-0 p-5 xl:p-6 flex flex-col justify-end pointer-events-none translate-z-0">
                  
                  <div className="flex items-center gap-4 transition-transform duration-400 -translate-y-2 xl:translate-y-0 xl:group-hover:-translate-y-2">
                    <div className="w-12 h-12 xl:w-14 xl:h-14 shrink-0 bg-stone-900/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl xl:text-3xl border shadow-xl border-red-500/80 xl:border-stone-700 xl:group-hover:border-red-500 scale-110 xl:scale-100 xl:group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl xl:text-3xl lg:text-4xl font-black text-white whitespace-nowrap drop-shadow-lg leading-none">
                      {feature.title}
                    </h3>
                  </div>

                  <div className="grid grid-rows-[1fr] xl:grid-rows-[0fr] xl:group-hover:grid-rows-[1fr] transition-all duration-400 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-stone-300 text-sm xl:text-lg leading-relaxed drop-shadow-md pt-3 xl:pt-4 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-400 xl:delay-100 line-clamp-2 xl:line-clamp-none">
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