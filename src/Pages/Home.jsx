import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-Radial-Gradient-first to-Radial-Gradient-second flex flex-col items-center justify-center px-4">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wide">
          Rock Paper Scissor
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
      </header>

      {/* Game Mode Buttons */}
      <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
        <Link to="/normal">
          <button className="group cursor-pointer relative px-12 py-6 bg-Paper-Gradient-first rounded-xl text-white font-bold text-2xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-green-300">
            <span className="relative z-10">Normal</span>
            <div className="absolute inset-0 bg-Paper-Gradient-second rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </Link>

        <Link to="/hard">
          <button className="group cursor-pointer relative px-12 py-6 bg-Rock-Gradient-first rounded-xl text-white font-bold text-2xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-red-300">
            <span className="relative z-10">Hard</span>
            <div className="absolute inset-0 bg-Rock-Gradient-second rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="mt-16 text-center">
        <p className="text-white/70 text-lg">Choose your difficulty level</p>
      </div>

      
    </div>
  )
}

export default Home
