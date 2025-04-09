import { useState } from 'react'

import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Users from './Pages/Users/Users'

import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    
      <div>
        <Navbar/>
        <hr />
        <div className="app-content">
          <Sidebar/>
          <Routes>
            <Route path="/add" element={<Add/>} />
            <Route path="/list" element={<List/>} />
            <Route path="/Users" element={<Users/>} />
           
            
          </Routes>
        </div>
      </div>
      
    
  )
}

export default App
