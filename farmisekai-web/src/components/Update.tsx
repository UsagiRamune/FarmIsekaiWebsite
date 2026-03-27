const features = [
  {
    id: 'planting',
    title: 'Planting & Tending',
    desc: 'ระบบทำฟาร์มที่ลึกซึ้ง ไถพรวน หว่านเมล็ด รดน้ำ และดูแลพืชผลเวทมนตร์ของคุณให้เติบโตตามฤดูกาล',
    staticImg: 'bg-green-100', // รอมึงเปลี่ยนเป็น URL ภาพนิ่ง
    gifImg: 'bg-green-400',    // รอมึงเปลี่ยนเป็น URL ภาพ GIF
    icon: '🌱'
  },
  {
    id: 'exploration',
    title: 'Exploration',
    desc: 'ออกสำรวจดินแดนต่างโลกอันกว้างใหญ่ ค้นพบทรัพยากรหายาก ดันเจี้ยนลับ และ NPC ที่มีความลับซ่อนอยู่',
    staticImg: 'bg-amber-100',
    gifImg: 'bg-amber-400',
    icon: '🗺️'
  },
  {
    id: 'day-night',
    title: 'Day-Night Cycle',
    desc: 'เวลาเดินไปข้างหน้าเสมอ กลางวันคือเวลาแห่งความมั่งคั่ง ส่วนกลางคืนคือช่วงเวลาแห่งความระทึกขวัญ',
    staticImg: 'bg-blue-100',
    gifImg: 'bg-blue-800',
    icon: '⏳'
  },
  {
    id: 'defensive',
    title: 'Farm Defensive',
    desc: 'สร้างกำแพง วางกับดัก และคราฟต์อาวุธเพื่อปกป้องฟาร์มและผลผลิตของคุณจากการบุกรุกของมอนสเตอร์ยามวิกาล',
    staticImg: 'bg-red-100',
    gifImg: 'bg-red-500',
    icon: '🛡️'
  },
  {
    id: 'economic',
    title: 'Economic System',
    desc: 'บริหารจัดการทรัพยากร นำผลผลิตไปค้าขายกับหมู่บ้าน อัปเกรดเครื่องมือ และสร้างความมั่งคั่งในแบบของคุณ',
    staticImg: 'bg-yellow-100',
    gifImg: 'bg-yellow-400',
    icon: '💰'
  },
  {
    id: 'permadeath',
    title: 'Risk & Permadeath',
    desc: 'ทุกการตัดสินใจมีราคาที่ต้องจ่าย หากพลาดพลั้งในความมืด คุณอาจสูญเสียทุกอย่างที่สร้างมา ความตายคือของจริง',
    staticImg: 'bg-purple-100',
    gifImg: 'bg-purple-600',
    icon: '☠️'
  }
]

const GameFeatures = () => {
  return (
    <section className="py-24 px-6 bg-[#f8f5f0] text-stone-800">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-amber-900 tracking-tight mb-4">
            Core Mechanics
          </h2>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto">
            นี่ไม่ใช่แค่เกมปลูกผักชิลๆ แต่คือการเอาชีวิตรอดที่คุณต้องวางแผนทุกฝีก้าว
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              {/* ส่วนหัวแสดงรูปภาพ / GIF */}
              <div className="aspect-video relative overflow-hidden bg-stone-200">
                
                {/* 1. ภาพนิ่ง (โชว์ตอนปกติ) */}
                <div className={`absolute inset-0 w-full h-full ${feature.staticImg} transition-opacity duration-500 opacity-100 group-hover:opacity-0 flex items-center justify-center`}>
                  {/* เปลี่ยนบรรทัดล่างเป็นแท็ก <img src="ภาพนิ่ง.jpg" /> ได้เลย */}
                  <span className="text-4xl opacity-50 font-bold tracking-widest text-black/20">STATIC IMAGE</span>
                </div>

                {/* 2. ภาพ GIF (โชว์ตอน Hover) */}
                <div className={`absolute inset-0 w-full h-full ${feature.gifImg} transition-opacity duration-500 opacity-0 group-hover:opacity-100 flex items-center justify-center scale-105 group-hover:scale-100`}>
                   {/* เปลี่ยนบรรทัดล่างเป็นแท็ก <img src="ภาพเคลื่อนไหว.gif" /> ได้เลย */}
                   <div className="flex flex-col items-center">
                      <span className="text-4xl mb-2">▶️</span>
                      <span className="text-xl font-bold text-white tracking-widest drop-shadow-md">PLAYING GIF...</span>
                   </div>
                </div>

                {/* Badge ไอคอนมุมขวาบน */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-2xl z-10 transform group-hover:rotate-12 transition-transform">
                  {feature.icon}
                </div>
              </div>

              {/* ส่วนเนื้อหา Text */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
              
              {/* แถบสีเล็กๆ ด้านล่างการ์ดเวลากด Hover */}
              <div className="absolute bottom-0 left-0 h-1.5 bg-orange-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default GameFeatures