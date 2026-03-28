import { useState, useEffect } from 'react'

const allPatches = [
  { version: 'v1.6', status: 'Upcoming', title: 'ระบบป้องกันฟาร์มและเนื้อหาใหม่', description: 'แพตช์ใหญ่เพิ่มความท้าทาย ศัตรูจะบุกทำลายฟาร์มของคุณ พร้อมเครื่องมือและสิ่งก่อสร้างใหม่', details: [ 'Wave Attack System - ศัตรูจะบุกเข้าโจมตีฟาร์มในช่วงกลางคืน', 'Enemy AI Rework - ศัตรูสามารถโจมตีสิ่งปลูกสร้างและพืชได้โดยตรง', 'New Shop System - ร้านค้าใหม่พร้อม NPC พ่อค้า', 'UI Overhaul - ออกแบบ UI ใหม่ทั้งหมด ครอบคลุมทุกหน้า', 'New Plants & Mechanics - ระบบเลือดพืช (Plant Health)', 'Structure System - รั้วป้องกันฟาร์มและ Sprinkler รดน้ำอัตโนมัติ', 'Save System Overhaul - รองรับทุก state ของเกม', 'New Tool: Hammer - เครื่องมือซ่อมแซมและรื้อถอนสิ่งปลูกสร้าง' ], highlight: true, },
  { version: 'v1.5', status: 'Current', title: 'Quality of Life & Endgame Systems', description: 'ระบบรองรับเนื้อหาระยะยาว เพิ่มความสะดวกสบายและปรับปรุงประสิทธิภาพเกม', details: [ 'Save System - ระบบบันทึกข้อมูลการเล่น', 'Portal System - เดินทางข้ามพื้นที่', 'Lobby - พื้นที่จุดเริ่มต้นของผู้เล่น', 'New Selling System - ปรับระบบการขายให้ดีขึ้น', 'Performance Optimization - แก้ไขความเร็วและความลื่นไหล', 'Terrain Shader & UI Implementation - ภาพสวยขึ้น UI ครบถ้วน' ], highlight: false, },
  { version: 'v1.4', status: 'Previous', title: 'World Generation & Resource Gathering', description: 'ระบบสำรวจและเก็บทรัพยากร', details: [ 'Environment Generation - สร้างสิ่งแวดล้อม หญ้า หิน ต้นไม้อัตโนมัติ', 'Mining & Woodcutting - ระบบขุดแร่และตัดไม้เพื่อ Crafting' ], highlight: false, },
  { version: 'v1.3', status: 'Archive', title: 'Day/Night & Pipeline Upgrade', description: 'ระบบกลางวัน/กลางคืน และการย้ายโปรเจกต์', details: [ 'Day/Night Cycle - วันและคืนส่งผลต่อบรรยากาศ', 'HDRP Migration - ยกระดับคุณภาพภาพ', 'AI Behavior Rework - ตรวจสอบ 2 ขั้นตอน ป้องกัน AI หลุดเข้าฟาร์ม' ], highlight: false, },
  { version: 'v1.2.1', status: 'Hotfix', title: 'Bug Fixes', description: 'แก้บัคต่างๆ ที่พบหลังอัปเดต v1.2', details: ['แก้ไขข้อผิดพลาดหลังอัปเดต'], highlight: false, },
  { version: 'v1.2', status: 'Archive', title: 'Systems Rework', description: 'รื้อและปรับปรุงระบบเชิงลึก', details: [ 'Manager Rework - ทำงานเสถียรและยืดหยุ่นขึ้น', 'Farm Area Resize - ขยาย/ย่อพื้นที่ฟาร์มได้', 'Crafting System - สร้างไอเทมผ่าน Inventory' ], highlight: false, },
  { version: 'v1.1', status: 'Archive', title: 'Bug Fixes', description: 'แก้ไขปัญหาจาก Feedback', details: ['แก้บัคหลักๆ ในเกมจากรายงานของผู้เล่น'], highlight: false, },
  { version: 'v1.0', status: 'Archive', title: 'First Playable Release', description: 'เวอร์ชันเล่นได้เต็มรูปแบบตาม Core Mechanics', details: [ 'Core Game Loop - เล่นได้จบในระดับหนึ่ง', 'Selling System - ขายผลผลิตและไอเทม', 'Enemy AI (State Machine) - พฤติกรรมหลากหลาย', 'Item Spawn System - ระบบสุ่มไอเทม' ], highlight: false, },
  { version: 'v0.5', status: 'Archive', title: 'Combat & Enemies', description: 'ระบบศัตรู', details: ['Enemy AI - ศัตรูประเภท Melee และ Ranged'], highlight: false, },
  { version: 'v0.4', status: 'Archive', title: 'Visual & Animation', description: 'โมเดลและแอนิเมชัน', details: ['3D Model Import', 'Character Animation System'], highlight: false, },
  { version: 'v0.3', status: 'Archive', title: 'World Interaction & Farming', description: 'ระบบโลกและการเพาะปลูก', details: ['World Item System', 'Planting System & DirtTile Integration'], highlight: false, },
  { version: 'v0.2', status: 'Archive', title: 'Inventory', description: 'ระบบจัดการไอเทม', details: ['Inventory System - สไตล์ Minecraft'], highlight: false, },
  { version: 'v0.1', status: 'Archive', title: 'Foundation', description: 'ระบบพื้นฐานของเกม', details: ['Grid System', 'Camera System (Top-down)', 'DirtTile System'], highlight: false, },
]

const Update = () => {
  const [selectedPatch, setSelectedPatch] = useState<typeof allPatches[0] | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  // 1. รอรับ Event จาก Navbar
  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const action = (e as CustomEvent).detail
      if (action === 'All') {
        setShowHistory(true)
      } else {
        // หาแพตช์แรกที่ตรงกับ Status (เช่น Current, Upcoming, Previous)
        const targetPatch = allPatches.find(p => p.status === action)
        if (targetPatch) setSelectedPatch(targetPatch)
      }
    }
    window.addEventListener('open-patch-modal', handleOpenModal)
    return () => window.removeEventListener('open-patch-modal', handleOpenModal)
  }, [])

  // 2. ล็อค Body Scroll (กันเลื่อนทะลุพื้นหลัง)
  useEffect(() => {
    if (selectedPatch || showHistory) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    // คืนค่ากลับเสมอถ้าเกิด Component โดนปิด
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedPatch, showHistory])

  const featuredPatches = [allPatches[2], allPatches[1], allPatches[0]]
  const formatVersion = (versionStr: string) => versionStr.replace('v', '')

  return (
    <section className="py-32 px-6 bg-stone-950 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center text-white mb-20 tracking-tighter">
          PATH TO <span className="text-amber-500">SURVIVAL</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-16">
          {featuredPatches.map((patch, index) => (
            <div
              key={index}
              onClick={() => setSelectedPatch(patch)}
              className={`flex flex-col p-8 rounded-3xl border transition-all duration-300 cursor-pointer bg-stone-900/50 backdrop-blur-sm
              ${patch.highlight 
                ? 'border-amber-500/50 shadow-[0_0_30px_rgba(217,119,6,0.1)] hover:border-amber-400 hover:shadow-[0_0_40px_rgba(217,119,6,0.2)] hover:-translate-y-2 z-10' 
                : 'border-stone-800 hover:border-stone-600 opacity-70 hover:opacity-100 hover:-translate-y-1'
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <span className={`text-5xl font-black tracking-tighter flex items-baseline ${patch.highlight ? 'text-amber-500' : 'text-stone-300'}`}>
                  <span className="text-2xl mr-1 opacity-50">v</span>
                  {formatVersion(patch.version)}
                </span>
                <span className={`text-xs font-black px-3 py-1.5 rounded-md tracking-widest uppercase ${patch.highlight ? 'bg-amber-500/10 text-amber-500' : 'bg-stone-800 text-stone-400'}`}>
                  {patch.status}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">{patch.title}</h3>
              <p className="text-stone-400 mb-8 flex-grow">{patch.description}</p>
              
              <div className="mt-auto pt-6 border-t border-stone-800">
                <span className={`text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70 ${patch.highlight ? 'text-amber-500' : 'text-stone-500'}`}>
                  View Details &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => setShowHistory(true)}
            className="px-8 py-4 bg-transparent border-2 border-stone-800 hover:border-stone-600 text-stone-300 font-bold rounded-xl transition-all hover:-translate-y-1 cursor-pointer tracking-widest uppercase text-sm"
          >
            All Patch History
          </button>
        </div>
      </div>

      {/* Full Page Modal: อ่านรายละเอียด Patch เดี่ยว (ตัด pointer-events ยิงทะลุออกแล้ว) */}
      {selectedPatch && (
        <div className="fixed inset-0 bg-stone-950/95 backdrop-blur-md z-[100] overflow-y-auto animate-in fade-in duration-200">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-screen flex flex-col relative z-10">
            <button 
              className="group flex items-center gap-3 text-stone-500 hover:text-white font-bold text-lg mb-12 transition-colors w-fit cursor-pointer"
              onClick={() => setSelectedPatch(null)}
            >
              <span className="text-2xl group-hover:-translate-x-2 transition-transform">&larr;</span> 
              <span>Back</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl md:text-8xl font-black text-white tracking-tighter flex items-baseline">
                <span className="text-4xl mr-2 opacity-50 text-amber-500">v</span>
                {formatVersion(selectedPatch.version)}
              </span>
              <span className="bg-amber-500/20 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-lg text-sm font-black uppercase tracking-widest">{selectedPatch.status}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              {selectedPatch.title}
            </h1>
            <p className="text-xl text-stone-400 mb-12 pb-8 border-b border-stone-800">
              {selectedPatch.description}
            </p>
            
            <div className="flex-grow">
              <h3 className="text-sm font-black text-amber-500 tracking-widest uppercase mb-8">Implementation Details</h3>
              <ul className="space-y-4">
                {selectedPatch.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg text-stone-300 bg-stone-900/30 p-5 rounded-xl border border-stone-800/50">
                    <span className="text-amber-500/50 text-xl mt-0.5">❖</span> 
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Full Page Modal: ประวัติ Patch ทั้งหมด */}
      {showHistory && (
        <div className="fixed inset-0 bg-stone-950/95 backdrop-blur-md z-[90] overflow-y-auto animate-in fade-in duration-200">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 relative z-10">
            <button 
              className="group flex items-center gap-3 text-stone-500 hover:text-white font-bold text-lg mb-12 transition-colors w-fit cursor-pointer"
              onClick={() => setShowHistory(false)}
            >
              <span className="text-2xl group-hover:-translate-x-2 transition-transform">&larr;</span> 
              <span>Back</span>
            </button>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-16 tracking-tighter">
              Update <span className="text-amber-500">Archive</span>
            </h2>
            
            <div className="space-y-4">
              {allPatches.map((patch, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedPatch(patch)}
                  className="bg-stone-900/30 p-6 md:p-8 rounded-2xl border border-stone-800 hover:border-amber-500/50 hover:bg-stone-900/80 transition-all cursor-pointer group flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
                >
                  <div className="flex items-baseline gap-1 md:w-32 shrink-0">
                    <span className="text-xl text-amber-500/50 font-black">v</span>
                    <h3 className="text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {formatVersion(patch.version)}
                    </h3>
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-stone-200 mb-1">{patch.title}</h4>
                    <p className="text-stone-500 text-sm line-clamp-1">{patch.description}</p>
                  </div>

                  <div className="shrink-0 mt-2 md:mt-0">
                    <span className="text-xs font-black text-stone-500 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-md uppercase tracking-widest">
                      {patch.status}
                    </span>
                  </div>
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