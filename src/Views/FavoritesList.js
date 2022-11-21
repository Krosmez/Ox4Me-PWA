import React from "react";
import { useEffect, useState } from "react";

import CocktailItem from "../Components/CocktailItem/CocktailItem";
import Headings from "../Components/Headings/Headings";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";
import OxAPI from "../data/OxAPI";
import StorageTools from "../data/StorageTools";

export default function FavoritesList() {
  const [allDrinks, setAllDrinks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  function updateLikeAndSuggestions() {
    const favoriteDrink = StorageTools.initCheckFavoritesDrinks();
    setDrinks(
      allDrinks
        .sort((a, b) => {
          if (a.category !== b.category) {
            return b.category.localeCompare(a.category);
          } else if (/[a-z]/i.test(a.name) === /[a-z]/i.test(b.name)) {
            return a.name.localeCompare(b.name);
          } else {
            return /[a-z]/i.test(a.name) ? -1 : 1;
          }
        })
        .filter((e) => favoriteDrink.includes(e.id))
    );
  }

  useEffect(() => {
    OxAPI.getAllDrinks().then((data) => {
      setAllDrinks(data.drinks);
    });
  }, []);

  useEffect(updateLikeAndSuggestions, [allDrinks]);
  return (
    <main className="container favorites">
      <section>
        <Headings Is="h2" text="Vos favoris" />
        {drinks.length > 0 ? (
          <ul className="cocktail-list ">
            {drinks.map((el) => {
              return (
                <CocktailItem
                  key={el.id}
                  data={el}
                  onLikeDislike={updateLikeAndSuggestions}
                />
              );
            })}
          </ul>
        ) : (
          <LoadingScreen />
        )}
      </section>
    </main>
  );
}
