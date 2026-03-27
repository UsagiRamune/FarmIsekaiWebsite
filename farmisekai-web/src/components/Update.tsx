import { useState } from 'react'

const allPatches = [
  {
    version: 'v0.3',
    status: 'Coming Soon',
    title: 'ดินแดนปริศนา',
    details: ['ระบบฤดูกาลแบบไดนามิก', 'พื้นที่ป่าทึบและเหมืองลึก', 'สัตว์เลี้ยงและสัตว์ขี่'],
    fullDetail: 'เตรียมพบกับแผนที่ใหม่ ทรัพยากรใหม่ และบอสลับที่รอการค้นพบในพื้นที่ป่าทึบ พร้อมระบบฤดูกาลที่จะส่งผลต่อการปลูกผักและการใช้ชีวิตประจำวันของคุณในโลก FarmIsekai',
    bgColor: 'bg-stone-900', borderColor: 'border-purple-500', textColor: 'text-stone-300', highlight: false,
  },
  {
    version: 'v0.2',
    status: 'Current',
    title: 'เอาชีวิตรอดเต็มสูบ',
    details: ['เพิ่มระบบคราฟต์ของ', 'มอนสเตอร์บุกฟาร์มตอนกลางคืน', 'เพิ่มอาวุธและชุดเกราะ'],
    fullDetail: 'อัปเดตใหญ่ที่เพิ่มความท้าทายให้ฟาร์มของคุณ! ตอนกลางคืนจะไม่ปลอดภัยอีกต่อไป เตรียมอาวุธและสร้างกำแพงป้องกันการบุกรุกของมอนสเตอร์ และระบบคราฟต์ไอเทมที่ซับซ้อนยิ่งขึ้น',
    bgColor: 'bg-white', borderColor: 'border-orange-400', textColor: 'text-stone-800', highlight: true,
  },
  {
    version: 'v0.1',
    status: 'Previous',
    title: 'จุดเริ่มต้นต่างโลก',
    details: ['ระบบปลูกผักพื้นฐาน', 'ระบบเดินสำรวจแมปแรก', 'เพิ่มโมเดลตัวละครหลัก'],
    fullDetail: 'ก้าวแรกสู่โลก FarmIsekai เริ่มต้นจากการถางหญ้า ปลูกพืชผลพื้นฐาน ทำความรู้จักกับระบบฟิสิกส์ และการโต้ตอบกับสภาพแวดล้อมรอบตัว',
    bgColor: 'bg-stone-100', borderColor: 'border-stone-300', textColor: 'text-stone-600', highlight: false,
  },
  {
    version: 'v0.0.5',
    status: 'Archive',
    title: 'Alpha Test 2',
    details: ['แก้บัคเดินทะลุกำแพง', 'ปรับ UI ช่องเก็บของ'],
    fullDetail: 'แก้ไขบัคยิบย่อยจากการทดสอบรอบแรก และปรับปรุงหน้าต่าง UI ให้ใช้งานง่ายขึ้น รองรับไอเทมจำนวนมากขึ้น',
    bgColor: 'bg-stone-200', borderColor: 'border-stone-300', textColor: 'text-stone-500', highlight: false,
  },
  {
    version: 'v0.0.1',
    status: 'Archive',
    title: 'First Prototype',
    details: ['ระบบเดิน', 'ระบบปลูกผักแบบ mock'],
    fullDetail: 'โปรโตไทป์แรกสุดของเกม ทดสอบระบบฟิสิกส์ แอนิเมชัน และการโต้ตอบกับวัตถุพื้นฐาน เพื่อใช้เป็นรากฐานในการพัฒนาต่อไป',
    bgColor: 'bg-stone-200', borderColor: 'border-stone-300', textColor: 'text-stone-500', highlight: false,
  },
]

const Update = () => {
  const [selectedPatch, setSelectedPatch] = useState<typeof allPatches[0] | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  const featuredPatches = [allPatches[2], allPatches[1], allPatches[0]]

  // ฟังก์ชันช่วยแยกตัว v ออกจากเลข
  const formatVersion = (versionStr: string) => {
    return versionStr.replace('v', '')
  }

  return (
    <section className="py-24 px-6 bg-[#f4ebd8] relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center text-amber-900 mb-16 drop-shadow-sm tracking-wide">
          Patch Updates
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {featuredPatches.map((patch, index) => (
            <div
              key={index}
              onClick={() => setSelectedPatch(patch)}
              className={`flex flex-col p-8 rounded-2xl border-4 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer
              ${patch.bgColor} ${patch.borderColor} 
              ${patch.highlight 
                ? 'scale-105 shadow-orange-200/50 z-10 opacity-100' 
                : 'opacity-60 hover:opacity-100 scale-95 hover:scale-100' /* เพิ่ม opacity ดรอปลง และหดลงนิดนึง พอยกเมาส์ค่อยสว่าง */
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                {/* จัดการถ่างตัว v และย่อไซส์ลงนิดนึง */}
                <span className={`text-4xl font-black tracking-wide flex items-baseline ${patch.highlight ? 'text-orange-500' : patch.textColor}`}>
                  <span className="text-2xl mr-1.5 opacity-70">v</span>
                  {formatVersion(patch.version)}
                </span>
                <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${patch.highlight ? 'bg-orange-100 text-orange-700' : 'bg-stone-200/50 text-stone-500'}`}>
                  {patch.status}
                </span>
              </div>
              
              <h3 className={`text-2xl font-bold mb-6 ${patch.textColor}`}>{patch.title}</h3>
              
              <ul className="space-y-4 flex-grow">
                {patch.details.map((detail, i) => (
                  <li key={i} className={`flex items-start gap-3 ${patch.textColor}`}>
                    <span className="text-lg leading-none mt-1 opacity-60">❖</span> 
                    <span className="text-lg leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 text-right border-t border-stone-200/20">
                <span className={`text-sm font-bold tracking-wider uppercase transition-opacity hover:opacity-70 ${patch.highlight ? 'text-orange-500' : patch.textColor}`}>
                  Read More &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={() => setShowHistory(true)}
            className="px-10 py-4 bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 cursor-pointer tracking-wider"
          >
            VIEW ALL PATCH NOTES
          </button>
        </div>
      </div>

      {/* Full Page Modal: อ่านรายละเอียด Patch เดี่ยว */}
      {selectedPatch && (
        <div className="fixed inset-0 bg-[#f8f5f0] z-[100] overflow-y-auto animate-in fade-in duration-200">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-screen flex flex-col">
            <button 
              className="group flex items-center gap-3 text-stone-500 hover:text-stone-900 font-bold text-lg mb-12 transition-colors w-fit cursor-pointer"
              onClick={() => setSelectedPatch(null)}
            >
              <span className="text-2xl group-hover:-translate-x-2 transition-transform">&larr;</span> 
              <span>Back to Overview</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              {/* แยกตัว v ในหน้า Modal ด้วย */}
              <span className="text-6xl md:text-7xl font-black text-amber-900 tracking-tighter flex items-baseline">
                <span className="text-4xl mr-2 opacity-60">v</span>
                {formatVersion(selectedPatch.version)}
              </span>
              <span className="bg-amber-200 text-amber-900 px-4 py-1.5 rounded-full text-sm md:text-base font-bold uppercase tracking-widest">{selectedPatch.status}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-800 mb-12 pb-8 border-b-2 border-stone-200">
              {selectedPatch.title}
            </h1>
            
            <div className="prose prose-lg prose-stone max-w-none flex-grow">
              <p className="text-stone-600 leading-loose text-xl md:text-2xl font-medium">
                {selectedPatch.fullDetail}
              </p>
              
              <h3 className="text-2xl font-bold mt-12 mb-6 text-stone-800">Key Updates</h3>
              <ul className="space-y-4">
                {selectedPatch.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-4 text-xl text-stone-600 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                    <span className="text-amber-500 text-2xl">✦</span> {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Full Page Modal: ประวัติ Patch ทั้งหมด */}
      {showHistory && (
        <div className="fixed inset-0 bg-[#f4ebd8] z-[90] overflow-y-auto animate-in fade-in duration-200">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
            <button 
              className="group flex items-center gap-3 text-stone-500 hover:text-stone-900 font-bold text-lg mb-12 transition-colors w-fit cursor-pointer"
              onClick={() => setShowHistory(false)}
            >
              <span className="text-2xl group-hover:-translate-x-2 transition-transform">&larr;</span> 
              <span>Back</span>
            </button>
            
            <h2 className="text-5xl md:text-6xl font-black text-amber-900 mb-12 tracking-tight">
              Patch History
            </h2>
            
            <div className="space-y-6">
              {allPatches.map((patch, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedPatch(patch)}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* แยกตัว v ในหน้ารวมประวัติด้วย */}
                      <h3 className="text-3xl font-black text-stone-800 group-hover:text-amber-700 transition-colors flex items-baseline">
                        <span className="text-xl mr-1.5 opacity-60">v</span>
                        {formatVersion(patch.version)}
                      </h3>
                      <h4 className="text-2xl font-bold text-stone-400">| {patch.title}</h4>
                    </div>
                    <span className="text-sm font-bold text-stone-500 bg-stone-100 px-4 py-1.5 rounded-full w-fit mt-4 sm:mt-0 uppercase tracking-widest">
                      {patch.status}
                    </span>
                  </div>
                  <p className="text-stone-500 text-lg mt-4 line-clamp-2">{patch.fullDetail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Update