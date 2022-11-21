import "./App.css";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Cocktail from "./Views/Cocktail";
import CocktailList from "./Views/CocktailList";
import FavoritesList from "./Views/FavoritesList";
import Home from "./Views/Home";
import RandomCocktail from "./Views/RandomCocktail";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResult from "./Views/SearchResult";
import useResize from "./customHooks/useResize";

function App() {
  const [pattern, setPattern] = useState("");
  const { dimensions } = useResize();

  function getSearchValue(pattern) {
    setPattern(pattern);
  }

  return (
    <>
      <SearchBar
        getSearchValue={getSearchValue}
        screenWidth={dimensions.width}
      />
      <Routes>
        <Route path="/" element={<Home screenWidth={dimensions.width} />} />
        <Route
          path="/cocktail/:id"
          element={<Cocktail screenWidth={dimensions.width} />}
        />
        <Route path="/random" element={<RandomCocktail />} />
        <Route path="/list" element={<CocktailList />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/search" element={<SearchResult pattern={pattern} />} />
      </Routes>
    </>
  );
}

export default App;
