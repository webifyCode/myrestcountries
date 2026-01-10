import React from 'react'
import '../styles/SearchBar.css'
import searchIcon from '../assets/magnifier.svg'

const SearchBar = ({searchQuery, setSearchQuery, darkMode}) => {
  return (
    <div className={`search-bar-container ${darkMode ? 'dark-element' : ''}`}>
      <img className='search-icon' src={searchIcon} alt="search-icon" />
      <input onChange={(e)=>setSearchQuery(e.target.value)
      } value={searchQuery} type="search" className="search-box" name="searchBox" id="search-box" placeholder='Search for a country...' />
    </div>
  )
}

export default SearchBar