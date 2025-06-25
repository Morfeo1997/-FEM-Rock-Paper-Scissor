import React from 'react'

function GameHeaderHard({ score }) {
  return (
    <div className="flex justify-between items-center w-full max-w-4xl mb-8 border-3 border-Header-Outline p-4 rounded-2xl">
      {/* Palabras ROCK, PAPER, SCISSORS */}
      <div className="flex flex-col gap-0 space-y-0">
        <h2 className="text-xl md:text-3xl font-bold text-white">ROCK</h2>
        <h2 className="text-xl md:text-3xl font-bold text-white">PAPER</h2>
        <h2 className="text-xl md:text-3xl font-bold text-white">SCISSORS</h2>
        <h2 className="text-xl md:text-3xl font-bold text-white">LIZARD</h2>
        <h2 className="text-xl md:text-3xl font-bold text-white">SPOCK</h2>
      </div>

      {/* Score */}
      <div className="bg-white rounded-lg px-6 py-4  md:p-12 shadow-lg min-w-[80px]  md:min-w-[120px] text-center">
        <h3 className="text-xl font-medium text-Paper-Gradient-first mb-2">SCORE</h3>
        <div className="text-5xl font-extrabold text-Dark-Text">{score}</div>
      </div>
    </div>
  )
}

export default GameHeaderHard
