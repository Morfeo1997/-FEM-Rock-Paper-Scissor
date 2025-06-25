import { useState } from 'react'
import { Link } from 'react-router-dom'
import RulesModal from '../Components/RulesModalNormal'
import Header from '../Components/GameHeader'
import Paper from '../assets/Icons/icon-paper.svg'
import Scissors from '../assets/Icons/icon-scissors.svg'
import Rock from '../assets/Icons/icon-rock.svg'

function Normal() {
const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState('playing') // 'playing' or 'result'
  const [playerChoice, setPlayerChoice] = useState(null)
  const [houseChoice, setHouseChoice] = useState(null)
  const [result, setResult] = useState(null) // 'win', 'lose', 'tie'
  const [showRules, setShowRules] = useState(false) // Estado para mostrar/ocultar reglas

  const choices = [
    { name: 'rock', img: Rock },
    { name: 'paper', img : Paper },
    { name: 'scissors', img : Scissors }
  ]

  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex]
  }

  const determineWinner = (player, house) => {
    if (player.name === house.name) {
      return 'tie'
    }
    
    if (
      (player.name === 'rock' && house.name === 'scissors') ||
      (player.name === 'paper' && house.name === 'rock') ||
      (player.name === 'scissors' && house.name === 'paper')
    ) {
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
        return 'YOU WIN'
      case 'lose':
        return 'YOU LOSE'
      case 'tie':
        return "IT'S A TIE"
      default:
        return ''
    }
  }

  const getResultColor = () => {
    switch (result) {
      case 'win':
        return 'text-white'
      case 'lose':
        return 'text-white'
      case 'tie':
        return 'text-white'
      default:
        return 'text-white'
    }
  }

  if (gameState === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-Radial-Gradient-first to-Radial-Gradient-second  flex flex-col items-center justify-center px-4 py-8">
        {/* Header con palabras y score */}
        <Header score={score} />

        {/* Textos YOU PICKED y THE HOUSE PICKED */}
        <div className="flex gap-x-24 md:gap-0 justify-between md:items-center w-full md:max-w-4xl mb-8">
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
              <div className="bg-white rounded-full p-8 shadow-lg border-12 border-Paper-Gradient-first">
                <img src={playerChoice.img} alt={playerChoice.name} className="w-16 h-16" />
              </div>

              {/* Opción de la casa */}
              <div className="bg-white rounded-full p-8 shadow-lg border-12 border-Rock-Gradient-first">
                <img src={houseChoice.img} alt={houseChoice.name} className="w-16 h-16" />
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
                className="bg-white cursor-pointer text-Dark-Text px-16 py-4 rounded-xl font-medium text-lg hover:scale-105 transform transition-all duration-200 shadow-lg"
              >
                PLAY AGAIN
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-Radial-Gradient-first to-Radial-Gradient-second flex flex-col items-center justify-center px-4 py-8">
      {/* Contenedor principal con palabras y score */}
      
      <Header score={score} />

      {/* Contenedor de opciones de juego */}
      <div className="flex flex-col items-center space-y-8">
        {/* Primer div - Paper y Scissors */}
        <div className="flex space-x-8">
          {/* Paper */}
          <div 
            onClick={() => handlePlayerChoice(choices[1])}
            className="bg-white border-16 border-Paper-Gradient-first rounded-full p-10 shadow-lg cursor-pointer hover:border-Paper-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <div >
                <img src={Paper} alt="Paper Image" className='w-full h-full' />
            </div>
          </div>
          
          {/* Scissors */}
          <div 
            onClick={() => handlePlayerChoice(choices[2])}
            className="bg-white border-16 border-Scissors-Gradient-first rounded-full p-10 shadow-lg cursor-pointer hover:border-Scissors-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <div>
                <img src={Scissors} alt="" />
            </div>
          </div>
        </div>

        {/* Segundo div - Rock en el medio */}
        <div className="flex justify-center">
          <div 
            onClick={() => handlePlayerChoice(choices[0])}
            className="bg-white border-16 border-Rock-Gradient-first rounded-full p-10 shadow-lg cursor-pointer hover:border-Rock-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <div className="text-6xl">
                <img src={Rock} alt="Rock option" />
            </div>
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

export default Normal
