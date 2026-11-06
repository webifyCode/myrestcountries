import React, { useEffect, useState } from "react";
import TitleBar from "./components/TitleBar";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import CountryCard from "./components/CountryCard";
import DetailsPage from "./components/DetailsPage";

const THEME_KEY = "theme";

function getInitialDarkMode() {
  try {
    const savedMode = localStorage.getItem(THEME_KEY);
    if (savedMode) return savedMode === "dark";
  } catch {
    // localStorage can be unavailable (private mode, blocked storage)
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [detailCountry, setDetailCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
    } catch {
      // ignore: the theme just won't persist
    }
    // Keep the page background in sync with the theme.
    document.body.classList.toggle("dark-container", darkMode);
    document.getElementById("root").classList.toggle("dark-container", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}data.json`, { signal: controller.signal })
      .then((result) => {
        if (!result.ok) throw new Error(`Request failed: ${result.status}`);
        return result.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const query = searchQuery.toLowerCase();
  const displayedCountries = countries.filter((country) => {
    const matchesRegion = filter === "All" || country.region === filter;
    const matchesSearch =
      country.name.toLowerCase().includes(query) ||
      country.nativeName.toLowerCase().includes(query);
    return matchesRegion && matchesSearch;
  });

  const countryCards = displayedCountries.map((country) => (
    <CountryCard
      showDetails={() => setDetailCountry(country)}
      key={country.alpha3Code}
      country={country}
      darkMode={darkMode}
    />
  ));

  let status = null;
  if (loading) status = "Loading countries...";
  else if (error) status = "Couldn't load country data. Please refresh and try again.";
  else if (displayedCountries.length === 0) status = "No countries found.";

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
            <Filter filter={filter} setFilter={setFilter} darkMode={darkMode}></Filter>
          </div>
          {status && <p className="status-message">{status}</p>}
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
