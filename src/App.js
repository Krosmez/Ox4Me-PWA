import React from 'react';
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Cocktail from './Views/Cocktail';
import CocktailList from './Views/CocktailList';
import FavoritesList from './Views/FavoritesList';
import Home from './Views/Home';
import RandomCocktail from './Views/RandomCocktail';

function App() {
  const [screenWidth, setScreenWidth] = useState(Infinity);

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
      <NavBar isHeader />
      <Routes>
        <Route path='/' element={<Home screenWidth={screenWidth}/>} />
        <Route path='/cocktail/:id' element={<Cocktail screenWidth={screenWidth} />} />
        <Route path='/random' element={<RandomCocktail />} />
        <Route path='/list' element={<CocktailList />} />
        <Route path='/favorites' element={<FavoritesList />} />
      </Routes>
      <NavBar />
    </>
  );
}

export default App;
