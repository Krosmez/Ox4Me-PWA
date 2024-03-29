import "./App.css";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import BottomNavBar from "./Components/BottomNavBar/BottomNavBar";
import Cocktail from "./Views/CocktailView/Cocktail";
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

  function getSearchValue(searchedValue) {
    setPattern(searchedValue);
  }

  return (
    <>
      <SearchBar
        getSearchValue={getSearchValue}
        screenWidth={dimensions.width}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cocktail/:id"
          element={<Cocktail screenWidth={dimensions.width} />}
        />
        <Route path="/random" element={<RandomCocktail />} />
        <Route path="/list" element={<CocktailList />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/search" element={<SearchResult pattern={pattern} />} />
      </Routes>
      {dimensions.width >= 768 ? (
        <div> This is a new component</div>
      ) : (
        <BottomNavBar />
      )}
    </>
  );
}

export default App;
