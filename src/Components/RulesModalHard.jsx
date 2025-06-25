import React from 'react'
import Rules from '../assets/Images/image-rules-bonus.svg'
import Close from '../assets/Icons/icon-close.svg'

function RulesModalHard({ showRules, setShowRules }) {
  if (!showRules) return null

  return (
    <>
      {/* Overlay semitransparente - Solo Desktop */}
      <div className="hidden md:min-h-full md:flex md:justify-center md:items-center fixed inset-0 bg-black/50 z-40"></div>
      
      {/* Modal Desktop */}
      <div className="hidden md:block fixed top-1/4 bottom-3/4 items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          {/* Header del modal */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-Dark-Text">RULES</h2>
            <button 
              onClick={() => setShowRules(false)}
              className="cursor-pointer"
            >
              <img src={Close} alt="Close Button" className=' hover:fill-Radial-Gradient-second'/>
            </button>
          </div>
          
          {/* Contenedor de imagen */}
          <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            
            <img src={Rules} alt="" />
          </div>
        </div>
      </div>

      {/* Modal Mobile - Pantalla completa */}
      <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header - Solo título */}
        <div className="flex justify-center items-center py-6 ">
          <h2 className="text-2xl font-bold text-Dark-Text">RULES</h2>
        </div>
        
        {/* Contenedor de imagen - Ocupa el espacio restante */}
        <div className="flex-1  flex items-center justify-center">
          <img src={Rules} alt="Rules Image" />
        </div>
        
        {/* Footer con X para cerrar */}
        <div className="flex justify-center items-center py-6 ">
          <button 
            onClick={() => setShowRules(false)}
            className=" cursor-pointer font-bold"
          >
            <img src={Close} alt="Close Icon" />
          </button>
        </div>
      </div>
    </>
  )
}

export default RulesModalHard
