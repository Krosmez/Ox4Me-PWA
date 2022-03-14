import React from 'react';
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Cocktail from './Views/Cocktail';
import CocktailList from './Views/CocktailList';
import FavoritesList from './Views/FavoritesList';
import Home from './Views/Home';
import RandomCocktail from './Views/RandomCocktail';
import SearchResult from './Views/SearchResult';
import './App.css';

function App() {
  const [pattern, setPattern] = useState("");
  const [screenWidth, setScreenWidth] = useState(Infinity);

  function getSearchValue(pattern) {
    setPattern(pattern);
  };

  useEffect(() => {
    function timeResize() {
      setTimeout(
        () => setScreenWidth(window.screen.width), 300
      )
    }
    timeResize();
    clearTimeout(timeResize);
    window.addEventListener('resize', timeResize);
    return () => {
      window.removeEventListener('resize', timeResize);
    }
  }, [screenWidth]);

  return (
    <>
      <NavBar isHeader getSearchValue={getSearchValue} />
      <Routes>
        <Route path='/' element={<Home screenWidth={screenWidth} />} />
        <Route path='/cocktail/:id' element={<Cocktail screenWidth={screenWidth} />} />
        <Route path='/random' element={<RandomCocktail />} />
        <Route path='/list' element={<CocktailList />} />
        <Route path='/favorites' element={<FavoritesList />} />
        <Route path='/search' element={<SearchResult pattern={pattern} />} />
      </Routes>
      {/* {
        screenWidth > 996 ? '' :
          <NavBar />
      } */}
    </>
  );
}

export default App;
