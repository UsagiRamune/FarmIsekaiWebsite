const updates = [
  {
    version: 'v0.1',
    status: 'Previous',
    title: 'จุดเริ่มต้นต่างโลก',
    details: ['ระบบปลูกผักพื้นฐาน', 'ระบบเดินสำรวจแมปแรก', 'เพิ่มโมเดลตัวละครหลัก'],
    bgColor: 'bg-stone-100',
    borderColor: 'border-stone-300',
    textColor: 'text-stone-500',
    highlight: false,
  },
  {
    version: 'v0.2',
    status: 'Current',
    title: 'เอาชีวิตรอดเต็มสูบ',
    details: ['เพิ่มระบบคราฟต์ของ', 'มอนสเตอร์บุกฟาร์มตอนกลางคืน', 'เพิ่มอาวุธและชุดเกราะ'],
    bgColor: 'bg-white',
    borderColor: 'border-orange-400',
    textColor: 'text-stone-800',
    highlight: true,
  },
  {
    version: 'v0.3',
    status: 'Coming Soon',
    title: 'ดินแดนปริศนา',
    details: ['???', '???', '???'],
    bgColor: 'bg-stone-900',
    borderColor: 'border-purple-500',
    textColor: 'text-stone-400',
    highlight: false,
  },
]

const Update = () => {
  return (
    <section className="py-24 px-6 bg-[#f4ebd8]"> {/* สีพื้นหลังกระดาษเก่าๆ */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center text-amber-900 mb-16 drop-shadow-sm tracking-wide">
          Patch Updates
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {updates.map((patch, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border-4 shadow-xl transition-all duration-300 hover:-translate-y-2 
              ${patch.bgColor} ${patch.borderColor} 
              ${patch.highlight ? 'scale-105 shadow-orange-200/50 md:h-[110%]' : 'h-full opacity-90 hover:opacity-100'}`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className={`text-3xl font-black ${patch.highlight ? 'text-orange-500' : patch.textColor}`}>
                  {patch.version}
                </span>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${patch.highlight ? 'bg-orange-100 text-orange-700' : 'bg-stone-200 text-stone-600'}`}>
                  {patch.status}
                </span>
              </div>
              
              <h3 className={`text-xl font-bold mb-4 ${patch.textColor}`}>{patch.title}</h3>
              
              <ul className={`space-y-3 border-t-2 border-dashed pt-4 ${patch.highlight ? 'border-orange-200' : 'border-stone-300'}`}>
                {patch.details.map((detail, i) => (
                  <li key={i} className={`flex items-start gap-2 ${patch.textColor}`}>
                    <span className="text-lg leading-none mt-1">❖</span> 
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Update