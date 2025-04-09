import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets' 


const Navbar = () => {
  const [menu,setMenu]=useState("home");
  return (
    <div className='navbar'>
      
      <img className='logo' src={assets.logo} alt="" />
      
        <ul className='navbar-menu'>
            <li onClick={()=>setMenu("home")} className={menu ==="home"?"active":""}>Home</li>
            <li onClick={()=>setMenu("Events")} className={menu ==="Events"?"active":""}>Events</li>
            <li onClick={()=>setMenu("Contact us")} className={menu ==="Contact us"?"active":""}>Contact us</li>
            <li onClick={()=>setMenu("About us")} className={menu ==="About us"?"active":""}>About us</li>
        </ul>
        <div className="navbar-right">
            {/* This is a single-line comment in JSXsearch icon */}
            <div className="navbar-search-icon">
            <img  src={assets.search_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button>Sign in</button>
        </div>
    </div>
  )
}

export default Navbar