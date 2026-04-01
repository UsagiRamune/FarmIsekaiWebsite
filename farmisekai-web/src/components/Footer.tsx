import { useLanguage } from '../context/LanguageContext'
import teamLogo from '../assets/TeamLogo.png'
import titleLogo from '../assets/FarmIsekai_Title.png'

const Footer = () => {
  const { lang } = useLanguage()

  return (
    <footer className="py-16 text-center bg-[#0a0a0a] text-stone-400 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute -left-16 -top-16 text-9xl">🌱</div>
        <div className="absolute -right-16 -bottom-16 text-9xl rotate-12">⚔️</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 relative flex flex-col items-center">
        <div className="mb-6 hover:scale-105 transition-transform duration-300">
          <img
            src={titleLogo}
            alt="FarmIsekai"
            className="h-24 md:h-32 lg:h-36 w-auto object-contain drop-shadow-[0_0_25px_rgba(217,119,6,0.25)]"
          />
        </div>

        <p className="text-stone-500 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
          {lang === 'TH' ? (
            <>เอาชีวิตรอดและสร้างฟาร์มในฝันของคุณในโลกต่างมิติ <br />ผลงานสร้างสรรค์โดยทีม BigNiGameDev</>
          ) : (
            <>Survive and build your dream farm in another world. <br />Created by BigNiGameDev team.</>
          )}
        </p>

        <div className="flex items-center gap-6 mb-10">
          <a href="https://www.facebook.com/FarmIsekai" target="_blank" rel="noreferrer"
            className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all hover:scale-110 shadow-lg">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@BigNiGameDev" target="_blank" rel="noreferrer"
            className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all hover:scale-110 shadow-lg">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>

        <div className="w-full border-t border-white/5 pt-8 flex flex-col items-center gap-5">
          <div className="hover:scale-105 transition-transform duration-300 cursor-pointer">
            <img
              src={teamLogo}
              alt="BigNi GameDev Studio"
              className="h-20 md:h-28 lg:h-32 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.07)]"
            />
          </div>

          <p className="text-stone-500 text-xs md:text-sm font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} BigNiGameDev
          </p>
          <p className="text-stone-600 text-xs">
            {lang === 'TH' ? 'วิทยาลัยศิลปะ สื่อ และเทคโนโลยี' : 'College of Arts, Media and Technology'}
          </p>
          <p className="text-stone-700 text-[10px] mt-1 text-center">
            {lang === 'TH' 
              ? 'ตัวเกมอยู่ในช่วงการพัฒนา ระบบภายในเกมและงานภาพอาจมีการเปลี่ยนแปลงในอนาคต' 
              : 'This is an in-development version of FarmIsekai. Mechanics and visuals are subject to change.'}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer