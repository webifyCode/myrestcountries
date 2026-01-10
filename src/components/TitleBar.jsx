import React from 'react'
import '../styles/TitleBar.css'
import darkMoon from '../assets/moon-dark.svg'
import lightMoon from '../assets/moon.svg'

const TitleBar = ({setDarkMode, darkMode}) => {
  return (
    <div className={`title-bar element ${darkMode ? 'dark-element' : ''}`}>
        <h1 className='title-text'>Where in the world?</h1>
        <span onClick={()=>setDarkMode(!darkMode)} className='theme-toggler'>
            <img className='theme-icon' src={darkMode ? darkMoon : lightMoon} alt="theme-icon" />
            <span className='theme-text'>Dark Mode</span>
        </span>
    </div>
  )
}

export default TitleBar