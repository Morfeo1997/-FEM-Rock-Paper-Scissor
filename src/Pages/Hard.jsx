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
  const [gameState, setGameState] = useState('playing') 
  const [playerChoice, setPlayerChoice] = useState(null)
  const [houseChoice, setHouseChoice] = useState(null)
  const [result, setResult] = useState(null) 
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
    
    if (gameResult === 'win') {
      setScore(prevScore => prevScore + 1)
    } else if (gameResult === 'lose') {
      setScore(prevScore => Math.max(0, prevScore - 1)) 
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

  if (gameState === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-Radial-Gradient-first to-Radial-Gradient-second  flex flex-col items-center justify-center px-4 py-8">
        {/* Header with score */}
        <GameHeaderHard score={score} />

        {/* Textos YOU PICKED y THE HOUSE PICKED */}
        <div className="flex gap-x-24 md:gap-0 justify-between md:items-center w-full md:max-w-4xl mb-8">
          <h2 className="text-2xl font-bold text-white">YOU PICKED</h2>
          <h2 className="text-2xl font-bold text-white">THE HOUSE PICKED</h2>
        </div>

        {/* Layout for options and Play Again Btn */}
        <div className="w-full max-w-4xl">
          {/* Desktop Layout */}
          <div className="hidden md:flex justify-between items-center mb-8">
            {/* Player Choice */}
            <div className="bg-white rounded-full border-20 border-Paper-Gradient-first p-8 shadow-lg">
              <img src={playerChoice.img} alt={playerChoice.name} className="w-20 h-20" />
            </div>

            {/* Play Again btn - Desktop */}
            <div className="flex flex-col items-center space-y-4">
              <h2 className={`text-4xl font-bold text-white text-center`}>
                {getResultMessage()}
              </h2>
              <button 
                onClick={playAgain}
                className="bg-white px-20 py-4 cursor-pointer rounded-xl font-bold text-Dark-Text hover:scale-105 transform transition-all duration-200 shadow-lg"
              >
                PLAY AGAIN
              </button>
            </div>

            {/* House Choice */}
            <div className="bg-white rounded-full border-20 border-Rock-Gradient-first p-8 shadow-lg">
              <img src={houseChoice.img} alt={houseChoice.name} className="w-20 h-20" />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Choices - Mobile */}
            <div className="flex justify-between items-center mb-8">
              {/* Player Choice */}
              <div className="bg-white rounded-full p-8 shadow-lg border-12 border-Paper-Gradient-first">
                <img src={playerChoice.img} alt={playerChoice.name} className="w-16 h-16" />
              </div>

              {/* House Choice */}
              <div className="bg-white rounded-full p-8 shadow-lg border-12 border-Rock-Gradient-first">
                <img src={houseChoice.img} alt={houseChoice.name} className="w-16 h-16" />
              </div>
            </div>

            {/* Game result - Mobile */}
            <div className="mb-8">
              <h2 className={`text-3xl font-bold text-white text-center`}>
                {getResultMessage()}
              </h2>
            </div>

            {/* Play Again btn - Mobile */}
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

        {/* Back to Menu Btn */}
        <div className="mt-4">
          <Link to="/">
            <button className="bg-white cursor-pointer text-Dark-Text px-12 py-4 rounded-xl font-medium text-lg hover:scale-105 transform transition-all duration-200 shadow-lg">
              Back to Menu
            </button>
          </Link>
        </div>

        
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-Radial-Gradient-first to-Radial-Gradient-second flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Header con palabras y score */}
      <GameHeaderHard score={score} />

      {/* Contenedor de opciones de juego con diseño específico para 5 elementos */}
      <main className="bg-[url(../assets/Images/bg-pentagon.svg)] bg-cover bg-no-repeat flex flex-col items-center space-y-8 w-full max-w-full md:max-w-4/8">
        {/* Primer div - SCISSORS en el medio superior */}
        <div className="flex justify-center">
          <div 
            onClick={() => handlePlayerChoice(choices[2])} // scissors
            className="bg-white w-28 h-28 md:w-auto md:h-auto border-12 md:border-16 border-Scissors-Gradient-first rounded-full p-5 md:p-10 shadow-lg cursor-pointer hover:border-Scissors-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <picture >
                <img src={Scissors} alt="Scissors Image" className='w-9/10 h-9/10 md:w-full md:h-full'/>
            </picture>
          </div>
        </div>

        {/* Segundo div - SPOCK (izquierda) y PAPER (derecha) */}
        <div className="flex justify-between w-full">
          {/* SPOCK */}
          <div 
            onClick={() => handlePlayerChoice(choices[4])} // spock
            className="bg-white w-28 h-28 md:w-auto md:h-auto border-12 md:border-16 border-Spock-Gradient-first flex justify-center items-center rounded-full p-5 md:p-10 cursor-pointer hover:border-Spock-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <picture >
                <img src={Spock} alt="Spock Image" className='w-9/10 h-9/10 md:w-full md:h-full'/>
            </picture>
          </div>
          
          {/* PAPER */}
          <div 
            onClick={() => handlePlayerChoice(choices[1])} // paper
            className="bg-white w-28 h-28 md:w-auto md:h-auto border-12 md:border-16 border-Paper-Gradient-first flex justify-center items-center rounded-full p-5 md:p-10 shadow-lg cursor-pointer hover:border-Paper-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <picture >
                <img src={Paper} alt="Paper Image" className='w-9/10 h-9/10 md:w-full md:h-full'/>
            </picture>
          </div>
        </div>

        {/* Tercer div - LIZARD (izquierda) y ROCK (derecha) con justify-around */}
        <div className="flex justify-around w-full ">
          {/* LIZARD */}
          <div 
            onClick={() => handlePlayerChoice(choices[3])} // lizard
            className="bg-white w-28 h-28 md:w-auto md:h-auto border-12 md:border-16 border-Lizard-Gradient-first rounded-full p-5 md:p-10 shadow-lg cursor-pointer hover:border-Lizard-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <picture >
                <img src={Lizard} alt="Lizard Image"  className='w-9/10 h-9/10 md:w-full md:h-full'/>
            </picture>
          </div>
          
          {/* ROCK */}
          <div 
            onClick={() => handlePlayerChoice(choices[0])} // rock
            className="bg-white w-28 h-28 md:w-auto md:h-auto border-12 md:border-16 border-Rock-Gradient-first rounded-full p-5 md:p-10 shadow-lg cursor-pointer hover:border-Rock-Gradient-second hover:scale-105 transform transition-all duration-300"
          >
            <picture >
                <img src={Rock} alt="Rock Image" className='w-9/10 h-9/10 md:w-full md:h-full' />
            </picture>
          </div>
        </div>
      </main>



      {/* Footer con botón RULES */}
      <footer className=" right-4 w-full flex justify-center md:justify-end px-4 mt-8">
        <button 
          onClick={() => setShowRules(true)}
          className="bg-Radial-Gradient-second cursor-pointer backdrop-blur-sm text-white px-12 py-3 rounded-xl font-bold text-lg border-white border-2 hover:bg-Radial-Gradient-first transform transition-all duration-200  "
        >
          RULES
        </button>
      </footer>

      {/* Modal de Reglas */}
      <RulesModal showRules={showRules} setShowRules={setShowRules} />
    </div>
  )
}

export default Hard