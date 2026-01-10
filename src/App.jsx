import React, { useEffect } from "react";
import { useState } from "react";
import TitleBar from "./components/TitleBar";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import CountryCard from "./components/CountryCard";
import DetailsPage from "./components/DetailsPage";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [detailCountry, setDetailCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) return savedMode === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetch("./data.json")
      .then((result) => result.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const displayedCountries = countries.filter((country) => {
    const matchesRegion = filter === "All" || country.region === filter;

    const matchesSearch =
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.nativeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const countryCards = displayedCountries.map((country) => (
    <CountryCard
      showDetails={() => setDetailCountry(country)}
      key={country.name}
      country={country}
      darkMode={darkMode}
    />
  ));

  darkMode
    ? document.body.classList.add("dark-container")
    : document.body.classList.remove("dark-container");
  darkMode
    ? document.getElementById("root").classList.add("dark-container")
    : document.getElementById("root").classList.remove("dark-container");

  return (
    <>
      <TitleBar setDarkMode={setDarkMode} darkMode={darkMode}></TitleBar>
      {!detailCountry && (
        <div
          className={`content-container ${darkMode ? "dark-container" : ""} `}
        >
          <div className="search-filter-container">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              darkMode={darkMode}
            ></SearchBar>
            <Filter setFilter={setFilter} darkMode={darkMode}></Filter>
          </div>
          <div className="country-cards-container">{countryCards}</div>
        </div>
      )}
      {detailCountry && (
        <DetailsPage
          country={detailCountry}
          onBack={() => setDetailCountry(null)}
          changeCountry={setDetailCountry}
          countries={countries}
          darkMode={darkMode}
        ></DetailsPage>
      )}
    </>
  );
};

export default App;
