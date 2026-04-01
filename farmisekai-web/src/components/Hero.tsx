import { useLanguage } from '../context/LanguageContext'
import heroVideo from '../assets/FarmIsekaiPreview.mp4'

const Hero = () => {
  const { lang } = useLanguage()

  return (
    <section className="relative h-[calc(100vh-80px)] min-h-[600px] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-stone-950">
      
      {/* วิดีโอพื้นหลัง */}
      <div className="absolute inset-0 w-full h-full bg-stone-900">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950"></div>
      
      <div className="z-10 relative">
        <span className="text-amber-500 font-bold tracking-[0.3em] uppercase mb-4 block text-sm md:text-base drop-shadow-md">
          Survival • Farming • Isekai
        </span>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 drop-shadow-2xl tracking-tighter">
          FarmIsekai
        </h1>
        <p className="text-xl md:text-3xl text-stone-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
          {lang === 'TH' ? (
            <>สร้างฟาร์มที่สงบสุขยามตะวันทอแสง <br/>และจับอาวุธเอาชีวิตรอดเมื่อความมืดมาเยือน</>
          ) : (
            <>Build a peaceful farm by day <br/>and take up arms to survive when darkness falls</>
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            className="px-10 py-5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xl font-black uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(217,119,6,0.3)] hover:shadow-[0_0_50px_rgba(217,119,6,0.6)] transition-all transform hover:-translate-y-1 cursor-pointer"
            onClick={() => alert(lang === 'TH' ? 'เร็วๆ นี้!' : 'Coming Soon!')}
          >
            {lang === 'TH' ? 'เล่นเลย' : 'Play Now'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero