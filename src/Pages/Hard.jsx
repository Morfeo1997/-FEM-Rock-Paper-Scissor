import { useState } from 'react'
import { Link } from 'react-router-dom'
import GameHeaderHard from '../Components/GameHeaderHard'
import RulesModal from '../Components/RulesModalHard'
import Paper from '../assets/Icons/icon-paper.svg'
import Scissors from '../assets/Icons/icon-scissors.svg'
import Rock from '../assets/Icons/icon-rock.svg'
import Lizard from '../assets/Icons/icon-lizard.svg'
import Spock from '../assets/Icons/icon-spock.svg'


function Hard() {
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState('playing') // 'playing' or 'result'
  const [playerChoice, setPlayerChoice] = useState(null)
  const [houseChoice, setHouseChoice] = useState(null)
  const [result, setResult] = useState(null) // 'win', 'lose', 'tie'
  const [showRules, setShowRules] = useState(false)

  const choices = [
    { name: 'rock', img: Rock },
    { name: 'paper', img: Paper },
    { name: 'scissors', img: Scissors },
    { name: 'lizard', img: Lizard },
    { name: 'spock', img: Spock }
  ]

  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex]
  }

  const determineWinner = (player, house) => {
    if (player.name === house.name) {
      return 'tie'
    }
    
    // Lógica del juego Hard Mode:
    // LIZARD vence a: SPOCK y PAPER
    // SPOCK vence a: SCISSORS y ROCK
    // SCISSORS vence a: PAPER y LIZARD
    // PAPER vence a: ROCK y SPOCK
    // ROCK vence a: LIZARD y SCISSORS
    
    const winConditions = {
      lizard: ['spock', 'paper'],
      spock: ['scissors', 'rock'],
      scissors: ['paper', 'lizard'],
      paper: ['rock', 'spock'],
      rock: ['lizard', 'scissors']
    }
    
    if (winConditions[player.name].includes(house.name)) {
      return 'win'
    }
    
    return 'lose'
  }

  const handlePlayerChoice = (choice) => {
    const house = getRandomChoice()
    const gameResult = determineWinner(choice, house)
    
    setPlayerChoice(choice)
    setHouseChoice(house)
    setResult(gameResult)
    setGameState('result')
    
    // Actualizar puntaje según el resultado
    if (gameResult === 'win') {
      setScore(prevScore => prevScore + 1)
    } else if (gameResult === 'lose') {
      setScore(prevScore => Math.max(0, prevScore - 1)) // No permitir puntajes negativos
    }
  }

  const playAgain = () => {
    setGameState('playing')
    setPlayerChoice(null)
    setHouseChoice(null)
    setResult(null)
  }

  const getResultMessage = () => {
    switch (result) {
      case 'win':
        return 'YOU WIN!'
      case 'lose':
        return 'YOU LOSE!'
      case 'tie':
        return "IT'S A TIE!"
      default:
        return ''
    }
  }

  const getResultColor = () => {
    switch (result) {
      case 'win':
        return 'text-green-400'
      case 'lose':
        return 'text-red-400'
      case 'tie':
        return 'text-yellow-400'
      default:
        return 'text-white'
    }
  }

  if (gameState === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-Radial-Gradient-first to-Radial-Gradient-second  flex flex-col items-center justify-center px-4 py-8">
        {/* Header con palabras y score */}
        <GameHeaderHard score={score} />

        {/* Textos YOU PICKED y THE HOUSE PICKED */}
        <div className="flex justify-between items-center w-full max-w-4xl mb-8">
          <h2 className="text-2xl font-bold text-white">YOU PICKED</h2>
          <h2 className="text-2xl font-bold text-white">THE HOUSE PICKED</h2>
        </div>

        {/* Layout responsivo para las opciones y botón Play Again */}
        <div className="w-full max-w-4xl">
          {/* Desktop Layout */}
          <div className="hidden md:flex justify-between items-center mb-8">
            {/* Opción del jugador */}
            <div className="bg-white rounded-full border-20 border-Paper-Gradient-first p-8 shadow-lg">
              <img src={playerChoice.img} alt={playerChoice.name} className="w-20 h-20" />
            </div>

            {/* Botón Play Again en el medio - Solo Desktop */}
            <div className="flex flex-col items-center space-y-4">
              <h2 className={`text-4xl font-bold ${getResultColor()} text-center`}>
                {getResultMessage()}
              </h2>
              <button 
                onClick={playAgain}
                className="bg-white px-20 py-4 cursor-pointer rounded-xl font-bold text-Dark-Text hover:scale-105 transform transition-all duration-200 shadow-lg"
              >
                PLAY AGAIN
              </button>
            </div>

            {/* Opción de la casa */}
            <div className="bg-white rounded-full border-20 border-Rock-Gradient-first p-8 shadow-lg">
              <img src={houseChoice.img} alt={houseChoice.name} className="w-20 h-20" />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Opciones seleccionadas - Mobile */}
            <div className="flex justify-between items-center mb-8">
              {/* Opción del jugador */}
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="text-6xl">{playerChoice.img}</div>
              </div>

              {/* Opción de la casa */}
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="text-6xl">{houseChoice.img}</div>
              </div>
            </div>

            {/* Resultado del juego - Mobile */}
            <div className="mb-8">
              <h2 className={`text-3xl font-bold ${getResultColor()} text-center`}>
                {getResultMessage()}
              </h2>
            </div>

            {/* Botón Play Again abajo - Solo Mobile */}
            <div className="flex justify-center mb-8">
              <button 
                onClick={playAgain}
                className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-200 shadow-lg"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>

        {/* Botón Back to Menu */}
        <div className="mt-4">
          <Link to="/">
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transform transition-all duration-200 border border-white/30">
              Back to Menu
            </button>
          </Link>
        </div>

        {/* Footer con botón RULES */}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-Radial-Gradient-first to-Radial-Gradient-second flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Header con palabras y score */}
      <GameHeaderHard score={score} />

      {/* Contenedor de opciones de juego con diseño específico para 5 elementos */}
      <div className="flex flex-col items-center space-y-8 w-full max-w-3/7">
        {/* Primer div - SCISSORS en el medio superior */}
        <div className="flex justify-center">
          <div 
            onClick={() => handlePlayerChoice(choices[2])} // scissors
            className="bg-white border-16 border-Scissors-Gradient-first rounded-full p-10 shadow-lg cursor-pointer hover:border-Scissors-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <picture >
                <img src={Scissors} alt="Scissors Image" />
            </picture>
          </div>
        </div>

        {/* Segundo div - SPOCK (izquierda) y PAPER (derecha) */}
        <div className="flex justify-between w-full">
          {/* SPOCK */}
          <div 
            onClick={() => handlePlayerChoice(choices[4])} // spock
            className="bg-white border-16 border-Spock-Gradient-first rounded-full p-10 shadow-lg cursor-pointer hover:border-Spock-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <picture >
                <img src={Spock} alt="Spock Image" />
            </picture>
          </div>
          
          {/* PAPER */}
          <div 
            onClick={() => handlePlayerChoice(choices[1])} // paper
            className="bg-white border-16 border-Paper-Gradient-first rounded-full p-10 shadow-lg cursor-pointer hover:border-Paper-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <picture >
                <img src={Paper} alt="Paper Image" />
            </picture>
          </div>
        </div>

        {/* Tercer div - LIZARD (izquierda) y ROCK (derecha) con justify-around */}
        <div className="flex justify-around w-full">
          {/* LIZARD */}
          <div 
            onClick={() => handlePlayerChoice(choices[3])} // lizard
            className="bg-white border-16 border-Lizard-Gradient-first rounded-full p-10 shadow-lg cursor-pointer hover:border-Lizard-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <picture >
                <img src={Lizard} alt="Lizard Image" />
            </picture>
          </div>
          
          {/* ROCK */}
          <div 
            onClick={() => handlePlayerChoice(choices[0])} // rock
            className="bg-white border-16 border-Rock-Gradient-first rounded-full p-10 shadow-lg cursor-pointer hover:border-Rock-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <picture >
                <img src={Rock} alt="Rock Image" />
            </picture>
          </div>
        </div>
      </div>



      {/* Footer con botón RULES */}
      <div className=" right-4 w-full flex justify-center md:justify-end px-4 mt-8">
        <button 
          onClick={() => setShowRules(true)}
          className="bg-Radial-Gradient-second cursor-pointer backdrop-blur-sm text-white px-12 py-3 rounded-xl font-bold text-lg border-white border-2 hover:bg-Radial-Gradient-first transform transition-all duration-200  "
        >
          RULES
        </button>
      </div>

      {/* Modal de Reglas */}
      <RulesModal showRules={showRules} setShowRules={setShowRules} />
    </div>
  )
}

export default Hard