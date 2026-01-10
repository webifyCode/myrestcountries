import React from 'react'
import '../styles/CountryCard.css'

const CountryCard = ({country, showDetails, darkMode}) => {
  let population = country.population.toLocaleString()
  return (
    <div onClick={showDetails} className={`country-card element ${darkMode ? 'dark-element' : ''}`}>
    <img className='card-flag' src={country.flag} alt="" />
    <div className='card-details'>
      <h2 className='card-name'>{country.name}</h2>
      <div className='card-population'><span>Population:</span> {population}</div>
      <div className='card-region'><span>Region:</span> {country.region}</div>
      <div className='card-capital'><span>Capital:</span> {country.capital}</div>
    </div>
    </div>
  )
}

export default CountryCard