import "./search-bar.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Loupe } from "../../assets/img/loupe.svg";

export default function SearchBar({ getSearchValue }) {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    getSearchValue(searchValue.trim());
    navigate(`/search`);
    setSearchValue("");
  }
  return (
    <form className="search-form container" onSubmit={handleSearch}>
      <label htmlFor="search">
        <span className="screen-reader-text">Trouver un cocktail</span>
      </label>
      <input
        type="search"
        name="search"
        className="search-input"
        spellCheck="false"
        autoComplete="off"
        placeholder="Rechercher un cocktail"
        aria-label="Rechercher un cocktail"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button type="submit" className="submit-btn">
        <Loupe />
      </button>
    </form>
  );
}
