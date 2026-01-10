import React from "react";
import TitleBar from "./TitleBar";
import { useState, useEffect } from "react";
import "../styles/DetailsPage.css";
import backArrow from '../assets/arrow-left.svg'

const DetailsPage = ({ country, countries, onBack, changeCountry, darkMode }) => {
  const languages = country.languages
    ? country.languages.map((lang) => lang.name).join(", ")
    : "";
  const currencies = country.currencies
    ? country.currencies.map((cur) => cur.name).join(", ")
    : "";

  const borders = country.borders
    ? country.borders.map((border) => border)
    : null;

  let population = country.population.toLocaleString();

  const borderCountries = countries.filter((c) =>
    country.borders?.includes(c.alpha3Code)
  );

  return (
    <>
      <div className={`details-container ${darkMode ? 'dark-container' : ''}`}>
        <button onClick={onBack} className={`back-button ${darkMode ? 'dark-element' : ''}`}>
          <img src={backArrow} alt="back-arrow" className="back-arrow"/>
          Back
        </button>
        <div className="details-country">
          <img className="detail-flag" src={country.flag} alt="detail-flag" />
          <div className="detail-stats">
            <h2 className="detail-country-name">{country.name}</h2>
            <div className="detail-stats-columns">
              <div className="detail-stats-column">
                <p>
                  <strong>Native Name:</strong> {country.nativeName}
                </p>
                <p>
                  <strong>Population:</strong> {population}
                </p>
                <p>
                  <strong>Region:</strong> {country.region}
                </p>
                <p>
                  <strong>Sub Region:</strong>
                  {country.subregion}
                </p>
                <p>
                  <strong>Capital:</strong>
                  {country.capital}
                </p>
              </div>
              <div className="detail-stats-column">
                <p>
                  <strong>Top Level Domain:</strong>
                  {country.topLevelDomain}
                </p>
                <p>
                  <strong>Currencies:</strong>
                  {currencies}
                </p>
                <p>
                  <strong>Languages:</strong>
                  {languages}
                </p>
              </div>
            </div>
            <div className="border-countries">
              <strong>Border Countries:</strong>
              <div className="border-countries-list">
                {borderCountries.length > 0
                  ? borderCountries.map((bor) => (
                      <button
                        key={bor.alpha3Code}
                        onClick={() => changeCountry(bor)}
                        className={`border-country-button ${darkMode ? 'dark-element' : ''}`}
                      >
                        {bor.name}
                      </button>
                    ))
                  : "None"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
