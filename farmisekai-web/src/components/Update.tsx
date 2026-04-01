import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

// ปรับ Data Structure ให้รองรับ 2 ภาษา
const allPatches = [
  { 
    version: 'v1.6', status: 'Upcoming', 
    title: { TH: 'ระบบป้องกันฟาร์มและเนื้อหาใหม่', EN: 'Farm Defense & New Content' }, 
    description: { TH: 'แพตช์ใหญ่เพิ่มความท้าทาย ศัตรูจะบุกทำลายฟาร์มของคุณ พร้อมเครื่องมือและสิ่งก่อสร้างใหม่', EN: 'Major patch adding challenges. Enemies will raid your farm, bringing new tools and structures.' }, 
    details: [ 
      { TH: 'Wave Attack System - ศัตรูจะบุกเข้าโจมตีฟาร์มในช่วงกลางคืน', EN: 'Wave Attack System - Enemies will raid your farm during the night' },
      { TH: 'Enemy AI Rework - ศัตรูสามารถโจมตีสิ่งปลูกสร้างและพืชได้โดยตรง', EN: 'Enemy AI Rework - Enemies can now attack structures and crops directly' },
      { TH: 'New Shop System - ร้านค้าใหม่พร้อม NPC พ่อค้า', EN: 'New Shop System - Added a new shop with a Merchant NPC' },
      { TH: 'UI Overhaul - ออกแบบ UI ใหม่ทั้งหมด ครอบคลุมทุกหน้า', EN: 'UI Overhaul - Completely redesigned user interface across all screens' },
      { TH: 'New Plants & Mechanics - ระบบเลือดพืช (Plant Health)', EN: 'New Plants & Mechanics - Introduced Plant Health system' },
      { TH: 'Structure System - รั้วป้องกันฟาร์มและ Sprinkler รดน้ำอัตโนมัติ', EN: 'Structure System - Farm defense fences and automated sprinklers' },
      { TH: 'Save System Overhaul - รองรับทุก state ของเกม', EN: 'Save System Overhaul - Now supports all game states' },
      { TH: 'New Tool: Hammer - เครื่องมือซ่อมแซมและรื้อถอนสิ่งปลูกสร้าง', EN: 'New Tool: Hammer - Used for repairing and demolishing structures' }
    ] 
  },
  { 
    version: 'v1.5', status: 'Current', 
    title: { TH: 'Quality of Life & Endgame Systems', EN: 'Quality of Life & Endgame Systems' }, 
    description: { TH: 'ระบบรองรับเนื้อหาระยะยาว เพิ่มความสะดวกสบายและปรับปรุงประสิทธิภาพเกม', EN: 'Long-term content support, adding convenience and improving game performance.' }, 
    details: [ 
      { TH: 'Save System - ระบบบันทึกข้อมูลการเล่น', EN: 'Save System - Save and load your game progress' },
      { TH: 'Portal System - เดินทางข้ามพื้นที่', EN: 'Portal System - Fast travel across different areas' },
      { TH: 'Lobby - พื้นที่จุดเริ่มต้นของผู้เล่น', EN: 'Lobby - The starting area for players' },
      { TH: 'New Selling System - ปรับระบบการขายให้ดีขึ้น', EN: 'New Selling System - Improved produce selling mechanics' },
      { TH: 'Performance Optimization - แก้ไขความเร็วและความลื่นไหล', EN: 'Performance Optimization - Fixed speed and overall smoothness' },
      { TH: 'Terrain Shader & UI Implementation - ภาพสวยขึ้น UI ครบถ้วน', EN: 'Terrain Shader & UI Implementation - Enhanced visuals and complete UI' }
    ] 
  },
  { 
    version: 'v1.4', status: 'Previous', 
    title: { TH: 'World Generation & Resource Gathering', EN: 'World Generation & Resource Gathering' }, 
    description: { TH: 'ระบบสำรวจและเก็บทรัพยากร', EN: 'Exploration and resource gathering systems.' }, 
    details: [ 
      { TH: 'Environment Generation - สร้างสิ่งแวดล้อม หญ้า หิน ต้นไม้อัตโนมัติ', EN: 'Environment Generation - Auto-generated grass, rocks, and trees' },
      { TH: 'Mining & Woodcutting - ระบบขุดแร่และตัดไม้เพื่อ Crafting', EN: 'Mining & Woodcutting - Gather resources for crafting' }
    ] 
  },
  { 
    version: 'v1.3', status: 'Archive', 
    title: { TH: 'Day/Night & Pipeline Upgrade', EN: 'Day/Night & Pipeline Upgrade' }, 
    description: { TH: 'ระบบกลางวัน/กลางคืน และการย้ายโปรเจกต์', EN: 'Day/night cycle system and project pipeline migration.' }, 
    details: [ 
      { TH: 'Day/Night Cycle - วันและคืนส่งผลต่อบรรยากาศ', EN: 'Day/Night Cycle - Time of day affects the atmosphere' },
      { TH: 'HDRP Migration - ยกระดับคุณภาพภาพ', EN: 'HDRP Migration - Upgraded overall graphical quality' },
      { TH: 'AI Behavior Rework - ตรวจสอบ 2 ขั้นตอน ป้องกัน AI หลุดเข้าฟาร์ม', EN: 'AI Behavior Rework - 2-step verification to prevent AI clipping into farm' }
    ] 
  },
  { 
    version: 'v1.2.1', status: 'Hotfix', 
    title: { TH: 'Bug Fixes', EN: 'Bug Fixes' }, 
    description: { TH: 'แก้บัคต่างๆ ที่พบหลังอัปเดต v1.2', EN: 'Fixed various bugs found after the v1.2 update.' }, 
    details: [ { TH: 'แก้ไขข้อผิดพลาดหลังอัปเดต', EN: 'Post-update hotfixes applied' } ] 
  },
  { 
    version: 'v1.2', status: 'Archive', 
    title: { TH: 'Systems Rework', EN: 'Systems Rework' }, 
    description: { TH: 'รื้อและปรับปรุงระบบเชิงลึก', EN: 'Deep system overhauls and improvements.' }, 
    details: [ 
      { TH: 'Manager Rework - ทำงานเสถียรและยืดหยุ่นขึ้น', EN: 'Manager Rework - More stable and flexible architecture' },
      { TH: 'Farm Area Resize - ขยาย/ย่อพื้นที่ฟาร์มได้', EN: 'Farm Area Resize - Ability to expand/shrink farm plots' },
      { TH: 'Crafting System - สร้างไอเทมผ่าน Inventory', EN: 'Crafting System - Craft items directly from Inventory' }
    ] 
  },
  { 
    version: 'v1.1', status: 'Archive', 
    title: { TH: 'Bug Fixes', EN: 'Bug Fixes' }, 
    description: { TH: 'แก้ไขปัญหาจาก Feedback', EN: 'Resolved issues based on player feedback.' }, 
    details: [ { TH: 'แก้บัคหลักๆ ในเกมจากรายงานของผู้เล่น', EN: 'Fixed major bugs reported by the community' } ] 
  },
  { 
    version: 'v1.0', status: 'Archive', 
    title: { TH: 'First Playable Release', EN: 'First Playable Release' }, 
    description: { TH: 'เวอร์ชันเล่นได้เต็มรูปแบบตาม Core Mechanics', EN: 'First fully playable version based on Core Mechanics.' }, 
    details: [ 
      { TH: 'Core Game Loop - เล่นได้จบในระดับหนึ่ง', EN: 'Core Game Loop - Basic loop implemented' },
      { TH: 'Selling System - ขายผลผลิตและไอเทม', EN: 'Selling System - Sell crops and items' },
      { TH: 'Enemy AI (State Machine) - พฤติกรรมหลากหลาย', EN: 'Enemy AI (State Machine) - Diverse enemy behaviors' },
      { TH: 'Item Spawn System - ระบบสุ่มไอเทม', EN: 'Item Spawn System - Random item generation' }
    ] 
  },
  { 
    version: 'v0.5', status: 'Archive', 
    title: { TH: 'Combat & Enemies', EN: 'Combat & Enemies' }, 
    description: { TH: 'ระบบศัตรู', EN: 'Enemy combat systems.' }, 
    details: [ { TH: 'Enemy AI - ศัตรูประเภท Melee และ Ranged', EN: 'Enemy AI - Added Melee and Ranged enemies' } ] 
  },
  { 
    version: 'v0.4', status: 'Archive', 
    title: { TH: 'Visual & Animation', EN: 'Visual & Animation' }, 
    description: { TH: 'โมเดลและแอนิเมชัน', EN: 'Models and animations.' }, 
    details: [ { TH: '3D Model Import', EN: '3D Model Import' }, { TH: 'Character Animation System', EN: 'Character Animation System' } ] 
  },
  { 
    version: 'v0.3', status: 'Archive', 
    title: { TH: 'World Interaction & Farming', EN: 'World Interaction & Farming' }, 
    description: { TH: 'ระบบโลกและการเพาะปลูก', EN: 'World interaction and farming systems.' }, 
    details: [ { TH: 'World Item System', EN: 'World Item System' }, { TH: 'Planting System & DirtTile Integration', EN: 'Planting System & DirtTile Integration' } ] 
  },
  { 
    version: 'v0.2', status: 'Archive', 
    title: { TH: 'Inventory', EN: 'Inventory' }, 
    description: { TH: 'ระบบจัดการไอเทม', EN: 'Item management system.' }, 
    details: [ { TH: 'Inventory System - สไตล์ Minecraft', EN: 'Inventory System - Minecraft-style inventory' } ] 
  },
  { 
    version: 'v0.1', status: 'Archive', 
    title: { TH: 'Foundation', EN: 'Foundation' }, 
    description: { TH: 'ระบบพื้นฐานของเกม', EN: 'Game foundation and core engine.' }, 
    details: [ { TH: 'Grid System', EN: 'Grid System' }, { TH: 'Camera System (Top-down)', EN: 'Camera System (Top-down)' }, { TH: 'DirtTile System', EN: 'DirtTile System' } ] 
  },
]

const Update = () => {
  const { lang } = useLanguage() // เรียกใช้ Context ภาษา
  const [selectedPatch, setSelectedPatch] = useState<typeof allPatches[0] | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const action = (e as CustomEvent).detail
      if (action === 'All') {
        setShowHistory(true)
      } else {
        const targetPatch = allPatches.find(p => p.status === action)
        if (targetPatch) setSelectedPatch(targetPatch)
      }
    }
    window.addEventListener('open-patch-modal', handleOpenModal)
    return () => window.removeEventListener('open-patch-modal', handleOpenModal)
  }, [])

  useEffect(() => {
    if (selectedPatch || showHistory) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedPatch, showHistory])

  const featuredPatches = [allPatches[2], allPatches[1], allPatches[0]]
  const formatVersion = (versionStr: string) => versionStr.replace('v', '')

  return (
    <section id="update" className="py-32 px-6 bg-stone-950 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center text-white mb-20 tracking-tighter">
          {lang === 'TH' ? 'เส้นทางสู่การ' : 'PATH TO '} 
          <span className="text-amber-500">{lang === 'TH' ? 'เอาชีวิตรอด' : 'SURVIVAL'}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-16">
          {featuredPatches.map((patch, index) => {
            const isUpcoming = patch.status === 'Upcoming';
            const isCurrent = patch.status === 'Current';
            
            return (
            <div
              key={index}
              onClick={() => setSelectedPatch(patch)}
              className={`flex flex-col p-8 rounded-3xl border transition-all duration-300 cursor-pointer bg-stone-900/50 backdrop-blur-sm z-10
              ${isUpcoming 
                ? 'border-amber-500/50 shadow-[0_0_30px_rgba(217,119,6,0.1)] hover:border-amber-400 hover:shadow-[0_0_40px_rgba(217,119,6,0.2)] hover:-translate-y-2' 
                : isCurrent
                ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:-translate-y-2'
                : 'border-stone-800 hover:border-stone-600 opacity-70 hover:opacity-100 hover:-translate-y-1'
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <span className={`text-5xl font-black tracking-tighter flex items-baseline 
                  ${isUpcoming ? 'text-amber-500' : isCurrent ? 'text-emerald-500' : 'text-stone-300'}`}>
                  <span className="text-2xl mr-1 opacity-50">v</span>
                  {formatVersion(patch.version)}
                </span>
                <span className={`text-xs font-black px-3 py-1.5 rounded-md tracking-widest uppercase 
                  ${isUpcoming ? 'bg-amber-500/10 text-amber-500' : isCurrent ? 'bg-emerald-500/10 text-emerald-500' : 'bg-stone-800 text-stone-400'}`}>
                  {patch.status}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">{patch.title[lang]}</h3>
              <p className="text-stone-400 mb-8 flex-grow">{patch.description[lang]}</p>
              
              <div className="mt-auto pt-6 border-t border-stone-800">
                <span className={`text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70 
                  ${isUpcoming ? 'text-amber-500' : isCurrent ? 'text-emerald-500' : 'text-stone-500'}`}>
                  {lang === 'TH' ? 'ดูรายละเอียด ' : 'View Details '}&rarr;
                </span>
              </div>
            </div>
          )})}
        </div>

        <div className="text-center">
          <button 
            onClick={() => setShowHistory(true)}
            className="px-8 py-4 bg-transparent border-2 border-stone-800 hover:border-stone-600 text-stone-300 font-bold rounded-xl transition-all hover:-translate-y-1 cursor-pointer tracking-widest uppercase text-sm"
          >
            {lang === 'TH' ? 'ประวัติการอัปเดตทั้งหมด' : 'All Patch History'}
          </button>
        </div>
      </div>

      {/* Modal: อ่านรายละเอียด Patch เดี่ยว */}
      {selectedPatch && (
        <div className="fixed inset-0 bg-stone-950/95 backdrop-blur-md z-[100] overflow-y-auto animate-in fade-in duration-200">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-screen flex flex-col relative z-10">
            <button 
              className="group flex items-center gap-3 text-stone-500 hover:text-white font-bold text-lg mb-12 transition-colors w-fit cursor-pointer"
              onClick={() => setSelectedPatch(null)}
            >
              <span className="text-2xl group-hover:-translate-x-2 transition-transform">&larr;</span> 
              <span>{lang === 'TH' ? 'กลับ' : 'Back'}</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl md:text-8xl font-black text-white tracking-tighter flex items-baseline">
                <span className={`text-4xl mr-2 opacity-50 ${selectedPatch.status === 'Current' ? 'text-emerald-500' : 'text-amber-500'}`}>v</span>
                {formatVersion(selectedPatch.version)}
              </span>
              <span className={`${selectedPatch.status === 'Current' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' : 'bg-amber-500/20 border border-amber-500/30 text-amber-400'} px-4 py-1.5 rounded-lg text-sm font-black uppercase tracking-widest`}>
                {selectedPatch.status}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              {selectedPatch.title[lang]}
            </h1>
            <p className="text-xl text-stone-400 mb-12 pb-8 border-b border-stone-800">
              {selectedPatch.description[lang]}
            </p>
            
            <div className="flex-grow">
              <h3 className={`text-sm font-black tracking-widest uppercase mb-8 ${selectedPatch.status === 'Current' ? 'text-emerald-500' : 'text-amber-500'}`}>
                {lang === 'TH' ? 'รายละเอียดการอัปเดต' : 'Implementation Details'}
              </h3>
              <ul className="space-y-4">
                {selectedPatch.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg text-stone-300 bg-stone-900/30 p-5 rounded-xl border border-stone-800/50">
                    <span className={`${selectedPatch.status === 'Current' ? 'text-emerald-500/50' : 'text-amber-500/50'} text-xl mt-0.5`}>❖</span> 
                    <span className="leading-relaxed">{detail[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modal: ประวัติ Patch ทั้งหมด */}
      {showHistory && (
        <div className="fixed inset-0 bg-stone-950/95 backdrop-blur-md z-[90] overflow-y-auto animate-in fade-in duration-200">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 relative z-10">
            <button 
              className="group flex items-center gap-3 text-stone-500 hover:text-white font-bold text-lg mb-12 transition-colors w-fit cursor-pointer"
              onClick={() => setShowHistory(false)}
            >
              <span className="text-2xl group-hover:-translate-x-2 transition-transform">&larr;</span> 
              <span>{lang === 'TH' ? 'กลับ' : 'Back'}</span>
            </button>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-16 tracking-tighter">
              {lang === 'TH' ? 'คลัง' : 'Update '} 
              <span className="text-amber-500">{lang === 'TH' ? 'อัปเดตทั้งหมด' : 'Archive'}</span>
            </h2>
            
            <div className="space-y-4">
              {allPatches.map((patch, idx) => {
                const isCurrent = patch.status === 'Current';
                
                return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedPatch(patch)}
                  className={`bg-stone-900/30 p-6 md:p-8 rounded-2xl border transition-all cursor-pointer group flex flex-col md:flex-row md:items-center gap-4 md:gap-8
                  ${isCurrent ? 'border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-900/10' : 'border-stone-800 hover:border-amber-500/50 hover:bg-stone-900/80'}`}
                >
                  <div className="flex items-baseline gap-1 md:w-32 shrink-0">
                    <span className={`text-xl font-black ${isCurrent ? 'text-emerald-500/50' : 'text-amber-500/50'}`}>v</span>
                    <h3 className={`text-3xl font-black text-white transition-colors ${isCurrent ? 'group-hover:text-emerald-400' : 'group-hover:text-amber-400'}`}>
                      {formatVersion(patch.version)}
                    </h3>
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-stone-200 mb-1">{patch.title[lang]}</h4>
                    <p className="text-stone-500 text-sm line-clamp-1">{patch.description[lang]}</p>
                  </div>

                  <div className="shrink-0 mt-2 md:mt-0">
                    <span className={`text-xs font-black bg-stone-950 border px-3 py-1.5 rounded-md uppercase tracking-widest
                    ${isCurrent ? 'text-emerald-500 border-emerald-900/50' : patch.status === 'Upcoming' ? 'text-amber-500 border-amber-900/50' : 'text-stone-500 border-stone-800'}`}>
                      {patch.status}
                    </span>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Update