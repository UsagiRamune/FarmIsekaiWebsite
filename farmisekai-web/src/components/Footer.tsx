const Footer = () => {
  return (
    <footer className="py-10 text-center bg-[#0f1710] text-[#f4ebd8] border-t-2 border-[#1c2a1e] relative overflow-hidden">
      {/* ลายน้ำพื้นหลังจางๆ */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute -left-16 -top-16 text-9xl">🌱</div>
          <div className="absolute -right-16 -bottom-16 text-9xl rotate-12">⚔️</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        <h3 className="text-2xl md:text-3xl font-black text-amber-400 tracking-tighter mb-4">
          FarmIsekai
        </h3>
        
        <p className="text-stone-300 text-base leading-relaxed mb-6 max-w-xl mx-auto">
          เอาชีวิตรอดและสร้างฟาร์มในฝันของคุณในโลกต่างมิติ
        </p>
        
        <div className="border-t border-white/5 pt-8 mt-8 space-y-4">
            <p className="text-stone-400 text-sm font-medium tracking-wide uppercase">
              &copy; {new Date().getFullYear()} BigNi GameDev &nbsp;|&nbsp; College of Arts, Media and Technology
            </p>
            <p className="text-stone-500 text-xs">
              This is a prototype version of FarmIsekai. Content is subject to change.
            </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer