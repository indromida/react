import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Explore from '../../components/Explore-menu/Explore'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'
import Footer from '../../components/Footer/Footer'

function home() {
  return (
    <div>
        <Header></Header>
        <Explore/>
        <Categories/>
        <Contact />
        <Footer/>
    </div>
  )
}

export default home