import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

function Navbar() {
  return (
    <div className='navbar'>

      <div className="navbar-logo">
        <img src={assets.logo} alt="Logo" className="logo" />
        
      </div>
      
    <div>
    <span className="admin-panel-text">Admin Panel</span>
    </div>
      
    </div>
  )
}

export default Navbar