import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import React from 'react'
import Home from './pages/Home/home'
import Single from './pages/SingleEvent/Single'
import Register from './pages/Home/Register/Register'



const App = () => {
  return (
    <div className='app'>
      <Navbar/> 

      <Routes>
        
        <Route path="/" element={<Home></Home>} />
        <Route path="/event/:id" element={<Single />} />
        <Route path="/Register" element={<Register />} />
        
      </Routes>
      
    </div>
  )
}

export default App