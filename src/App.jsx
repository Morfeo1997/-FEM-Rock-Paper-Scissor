import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Normal from './Pages/Normal'
import Hard from './Pages/Hard'



function App() {


  return (
    <>
      <Router>
        <div className="min-h-screen ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/normal" element={<Normal />} />
            <Route path="/hard" element={<Hard />} />

          </Routes>
          
        </div>
        
        
      </Router>
    </>
  )
}

export default App
