const features = [
  {
    id: 'planting', title: 'Planting & Tending', icon: '🌱',
    desc: 'ไถพรวน หว่านเมล็ด รดน้ำ และดูแลพืชผลเวทมนตร์ของคุณให้เติบโตตามฤดูกาล',
    staticImg: 'bg-green-600', 
    gifImg: 'bg-green-400',
  },
  {
    id: 'exploration', title: 'Exploration', icon: '🗺️',
    desc: 'สำรวจดินแดนปริศนา ค้นพบทรัพยากรหายาก และดันเจี้ยนที่มีความลับซ่อนอยู่',
    staticImg: 'bg-amber-600',
    gifImg: 'bg-amber-400',
  },
  {
    id: 'day-night', title: 'Day-Night Cycle', icon: '⏳',
    desc: 'กลางวันคือเวลาแห่งการสร้างสรรค์ แต่กลางคืนคือช่วงเวลาแห่งความระทึกขวัญ',
    staticImg: 'bg-blue-900',
    gifImg: 'bg-blue-600',
  },
  {
    id: 'defensive', title: 'Farm Defensive', icon: '🛡️',
    desc: 'สร้างกำแพง วางกับดัก เพื่อปกป้องฟาร์มจากการบุกรุกของมอนสเตอร์ยามวิกาล',
    staticImg: 'bg-red-900',
    gifImg: 'bg-red-500',
  },
  {
    id: 'economic', title: 'Economic System', icon: '💰',
    desc: 'นำผลผลิตไปค้าขาย อัปเกรดเครื่องมือ และสร้างความมั่งคั่งในแบบของคุณ',
    staticImg: 'bg-yellow-600',
    gifImg: 'bg-yellow-400',
  },
  {
    id: 'permadeath', title: 'Permadeath', icon: '☠️',
    desc: 'ทุกการตัดสินใจมีราคาที่ต้องจ่าย พลาดพลั้งในความมืด คุณอาจสูญเสียทุกอย่าง',
    staticImg: 'bg-purple-900',
    gifImg: 'bg-purple-600',
  }
]

const GameFeatures = () => {
  return (
    <section className="py-24 px-6 bg-[#1a1814] text-stone-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-amber-500 tracking-tighter mb-4 uppercase drop-shadow-lg">
            Core Mechanics
          </h2>
          <p className="text-lg text-stone-400 max-w-2xl mx-auto">
            นี่ไม่ใช่แค่เกมปลูกผักชิลๆ แต่คือการเอาชีวิตรอดที่คุณต้องวางแผนทุกฝีก้าว
          </p>
        </div>

        {/* ================= Expanding Cards (Optimized Performance) ================= */}
        <div className="flex flex-col md:flex-row w-full h-[80vh] md:h-[600px] gap-2 md:gap-4 overflow-hidden rounded-3xl md:rounded-[2rem]">
          
          {features.map((feature) => (
            <div 
              key={feature.id} 
              // แก้ไข: ใช้ transition-flex ที่เจาะจงเฉพาะ flex-grow และปรับ ease-in-out เพื่อความสมูท
              // เพิ่ม class will-change-flex เพื่อ hint บอก browser ล่วงหน้า
              className="group relative flex-1 hover:flex-[5] transition-flex duration-400 ease-in-out cursor-pointer rounded-2xl md:rounded-[2rem] overflow-hidden border-4 border-transparent hover:border-amber-500/80 will-change-flex translate-z-0"
            >
              
              {/* ภาพนิ่ง (Static) */}
              {/* แก้ไข: ใส่ class เร่งประสิทธิภาพ GPU (translate-z-0) และปรับ blend-mode ให้นุ่มนวลขึ้น */}
              <div className={`absolute inset-0 w-full h-full ${feature.staticImg} bg-cover bg-center transition-opacity duration-300 opacity-60 group-hover:opacity-0 mix-blend-luminosity group-hover:mix-blend-normal translate-z-0`}></div>

              {/* ภาพ GIF */}
              {/* แก้ไข: ใส่ class เร่งประสิทธิภาพ GPU (translate-z-0) */}
              <div className={`absolute inset-0 w-full h-full ${feature.gifImg} bg-cover bg-center transition-all duration-400 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 translate-z-0`}></div>

              {/* Gradient บังข้างล่างให้ Text อ่านง่าย */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none translate-z-0"></div>

              {/* ================= คอนเทนต์ข้างในการ์ด (Optimized Transitions + Hidden Emoji) ================= */}
              {/* กู wrap icon และ text ทั้งหมดไว้ใน div เดียว แล้วสั่ง Fade In ตอนโฮเวอร์ คราวนี้Emoji ก็เก็บเรียบ */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                
                <div className="flex items-center gap-4">
                  {/* ไอคอน */}
                  <div className="w-12 h-12 shrink-0 bg-stone-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-2xl border border-stone-700 shadow-xl group-hover:border-amber-500 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  {/* ชื่อหัวข้อ */}
                  <h3 className="text-2xl md:text-3xl font-black text-white whitespace-nowrap drop-shadow-md">
                    {feature.title}
                  </h3>
                </div>
                
                {/* คำอธิบาย */}
                <div className="mt-4 overflow-hidden">
                  <p className="text-stone-300 text-lg">
                    {feature.desc}
                  </p>
                </div>
              </div>

            </div>
          ))}
          
        </div>
      </div>
    </section>
  )
}

export default GameFeatures