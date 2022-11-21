import React, { useEffect, useState } from "react";

import CocktailItem from "../Components/CocktailItem/CocktailItem";
import Headings from "../Components/Headings/Headings";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";
import OxAPI from "../data/OxAPI";

export default function CocktailList() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    OxAPI.getAllDrinks().then((data) => {
      setDrinks(
        data.drinks.sort((a, b) => {
          if (a.category !== b.category) {
            return b.category.localeCompare(a.category);
          } else if (/[a-z]/i.test(a.name) === /[a-z]/i.test(b.name)) {
            return a.name.localeCompare(b.name);
          } else {
            return /[a-z]/i.test(a.name) ? -1 : 1;
          }
        })
      );
    });
  }, []);

  if (drinks.length < 1) {
    return <LoadingScreen />;
  } else {
    return (
      <main className="container">
        <Headings Is="h2" text="La liste" />
        <ul className="cocktail-list">
          {drinks.map((el, index) => {
            return <CocktailItem key={index} data={el} />;
          })}
        </ul>
      </main>
    );
  }
}
