import React from "react";
import { useEffect, useState } from "react";

import CocktailItem from "../Components/CocktailItem/CocktailItem";
import Headings from "../Components/Headings/Headings";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";
import OxAPI from "../data/OxAPI";

export default function SearchResult({ pattern }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    OxAPI.searchDrinks(pattern).then((data) => setDrinks(data.drinks));
  }, [pattern]);

  if (drinks.length < 1) {
    return <LoadingScreen />;
  } else {
    return (
      <main className="result-main container">
        <Headings Is="h2" text="Résultat de recherche" variant="result title" />
        <ul className="cocktail-list ">
          {drinks.map((el, index) => {
            return <CocktailItem key={index} data={el} />;
          })}
        </ul>
      </main>
    );
  }
}
