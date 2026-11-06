import React from 'react'
import '../styles/CountryCard.css'

const CountryCard = ({country, showDetails, darkMode}) => {
  let population = country.population.toLocaleString()
  return (
    <div
      onClick={showDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          showDetails()
        }
      }}
      role="button"
      tabIndex={0}
      className={`country-card element ${darkMode ? 'dark-element' : ''}`}>
    <img className='card-flag' src={country.flag} alt={`Flag of ${country.name}`} />
    <div className='card-details'>
      <h2 className='card-name'>{country.name}</h2>
      <div className='card-population'><span>Population:</span> {population}</div>
      <div className='card-region'><span>Region:</span> {country.region}</div>
      <div className='card-capital'><span>Capital:</span> {country.capital || 'N/A'}</div>
    </div>
    </div>
  )
}

export default CountryCard