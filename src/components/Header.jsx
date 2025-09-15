import React from 'react'
import { NavLink } from 'react-router-dom'
import style from "../styling/headerStyling.module.css"
import logo from '../images/logo.png'

const Header = () => {
  return (
    <div className={style.head}>
        <img src={logo} alt="logo" className={style.logo} />
        <p className={style.name} >KinoVerse</p>
        <div className={style.navBar}>
            <NavLink to='/'
             className={({isActive})=> 
                isActive ? `${style.active} ${style.navItem}`: `${style.notActive} ${style.navItem}`}
            >Home</NavLink>
            <NavLink to='/movies' 
            className={({isActive})=> 
                isActive ? `${style.active} ${style.navItem}`: `${style.notActive} ${style.navItem}`}
            >Movies</NavLink>
            <NavLink to='tvseries'
            className={({isActive})=> 
                isActive ? `${style.active} ${style.navItem}`: `${style.notActive} ${style.navItem}`}
             >TV Series</NavLink>
            <NavLink to='/favorite'
            className={({isActive})=> 
                isActive ? `${style.active} ${style.navItem}`: `${style.notActive} ${style.navItem}`}
             >Favorite</NavLink>
        </div>
    </div>
  )
}

export default Header