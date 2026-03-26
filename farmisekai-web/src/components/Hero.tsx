const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-blue-200 to-green-100">
      {/* เดี๋ยวตรงนี้เราค่อยเอารูปภาพ หรือวิดีโอพื้นหลังของเกมมาใส่ */}
      <div className="z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-green-900 mb-6 drop-shadow-md">
          FarmIsekai
        </h1>
        <p className="text-lg md:text-2xl text-green-800 mb-10 max-w-2xl mx-auto">
          เอาชีวิตรอดและสร้างฟาร์มในฝันของคุณในโลกต่างมิติ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => alert('Coming Soon!')}
          >
            Play Now
          </button>
          <button className="px-8 py-4 bg-white hover:bg-gray-100 text-green-900 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105 border-2 border-green-200 cursor-pointer">
            Watch Trailer
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero