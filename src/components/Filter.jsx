import React from 'react'

const Filter = ({setFilter, darkMode}) => {
  return (
    <select onChange={(e)=> setFilter(e.target.value)} className={`filter element ${darkMode ? 'dark-element' : ''}`} name="filter" id="filter">
      <option value="" hidden>Filter by Region</option>
      <option value="All">All Countries</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  )
}

export default Filter