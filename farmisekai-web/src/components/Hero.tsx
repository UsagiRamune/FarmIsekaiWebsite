const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-80px)] min-h-[600px] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-stone-950">
      
      {/* วิดีโอพื้นหลัง (Opacity 30% ให้ดูมืดๆ) */}
      <div className="absolute inset-0 w-full h-full bg-stone-900">
        {/* เอารูปหรือวิดีโอมึงมาใส่ตรงนี้ได้เลย (ลบ bg-stone-900 ออกด้วยถ้ามีไฟล์จริง) */}
        {/* <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
          <source src="/your-trailer.mp4" type="video/mp4" />
        </video> */}
        <div className="w-full h-full flex items-center justify-center opacity-20 text-stone-500 text-2xl font-bold tracking-widest border-2 border-dashed border-stone-800 m-4">
          [ VIDEO BACKGROUND PLACEHOLDER ]
        </div>
      </div>

      {/* Gradient ไล่สีดำทับวิดีโอจากด้านล่าง เพื่อให้กลืนกับ Section ข้างล่าง */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950"></div>
      
      <div className="z-10 relative">
        <span className="text-amber-500 font-bold tracking-[0.3em] uppercase mb-4 block text-sm md:text-base drop-shadow-md">Survival • Farming • Isekai</span>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 drop-shadow-2xl tracking-tighter">
          FarmIsekai
        </h1>
        <p className="text-xl md:text-3xl text-stone-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed text-shadow">
          สร้างฟาร์มที่สงบสุขยามตะวันทอแสง <br/>และจับอาวุธเอาชีวิตรอดเมื่อความมืดมาเยือน
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            className="px-10 py-5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xl font-black uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(217,119,6,0.3)] hover:shadow-[0_0_50px_rgba(217,119,6,0.6)] transition-all transform hover:-translate-y-1 cursor-pointer"
            onClick={() => alert('Coming Soon!')}
          >
            Play Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero