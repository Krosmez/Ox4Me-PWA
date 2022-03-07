import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Cocktail from './Views/Cocktail';
import CocktailList from './Views/CocktailList';
import FavoritesList from './Views/FavoritesList';
import Home from './Views/Home';
import RandomCocktail from './Views/RandomCocktail';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/random' element={<RandomCocktail />} />
        <Route path='/list' element={<CocktailList />} />
        <Route path='/favorites' element={<FavoritesList />} />
        <Route path='/cocktail/:id' element={<Cocktail />} />
      </Routes>
    </>
  );
}

export default App;
