import React from "react";
import { useEffect, useState } from "react";

import ButtonLink from "../Components/ButtonLink/ButtonLink";
import CocktailItem from "../Components/CocktailItem/CocktailItem";
import Headings from "../Components/Headings/Headings";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";
import OxAPI from "../data/OxAPI";
import StorageTools from "../data/StorageTools";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [drinkOfTheDay, setDrinkOfTheDay] = useState(false);
  const [allDrinks, setAllDrinks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const favoriteDrink = StorageTools.initCheckFavoritesDrinks();

  function initLoadingTime() {
    setTimeout(() => setIsLoading(false), 300);
  }

  function updateLikeAndSuggestions() {
    setSuggestions([]);
    OxAPI.getDrinksSuggestions(favoriteDrink).then((suggestDrink) => {
      setSuggestions(
        allDrinks
          .filter((d) => suggestDrink.some(({ id }) => d.id === id))
          .map((drink) =>
            Object({
              ...drink,
              score: suggestDrink.find(({ id }) => drink.id === id).score,
            })
          )
          .filter((d) => d.score >= 0.000000001)
          .sort((d1, d2) => d2.score - d1.score)
      );
    });
  }

  useEffect(() => {
    initLoadingTime();
    clearTimeout(initLoadingTime);
    OxAPI.drinkOfTheDay().then((drink) => setDrinkOfTheDay(drink));
  }, []);

  useEffect(() => {
    OxAPI.getAllDrinks().then((data) => {
      setAllDrinks(data.drinks);
    });
  }, []);

  useEffect(updateLikeAndSuggestions, [allDrinks]);

  return (
    <main className="home">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <section className="hero screen-reader-text">
            <Headings Is="h1" text="Ox4Me" />
          </section>

          <section className="daily">
            <Headings
              Is="h2"
              variant="title container"
              text="Le Cocktail du Jour"
            />
            <div className="daily-content container">
              <div className="cocktail-img">
                <img
                  src={`https://ox4me.deta.dev/static/images/drink/${drinkOfTheDay.id}.svg`}
                  alt={`Illustration du cocktail ${drinkOfTheDay.name}`}
                  loading="lazy"
                />
              </div>
              <div className="daily-info container">
                <div>
                  <Headings Is="h3" text={drinkOfTheDay.name} />
                  {drinkOfTheDay.category === "classic" ? (
                    <p>Classique</p>
                  ) : drinkOfTheDay.category === "homemade" ? (
                    <p>Spécialité Oxford</p>
                  ) : (
                    ""
                  )}
                </div>
                <ButtonLink
                  isLink
                  variant="link-btn"
                  to={
                    drinkOfTheDay.hasOwnProperty("id")
                      ? `/cocktail/${drinkOfTheDay.id}`
                      : ""
                  }
                  content="Voir le cocktail"
                />
              </div>
            </div>
          </section>
          {
            // Oh wow ! I need optimisation here !
            favoriteDrink < 1 ? (
              <></>
            ) : (
              <section className="container section-suggestions">
                <Headings Is="h2" text="Suggestions" />
                <p className="suggest-text">
                  D'après votre liste de cocktails favoris, nous vous
                  recommandons :
                </p>
                {suggestions.length > 0 ? (
                  <ul className="suggestions">
                    {suggestions.map((suggested) => {
                      return (
                        <CocktailItem
                          key={suggested.id}
                          data={suggested}
                          onLikeDislike={updateLikeAndSuggestions}
                        />
                      );
                    })}
                  </ul>
                ) : (
                  <LoadingScreen />
                )}
              </section>
            )
          }
        </>
      )}
    </main>
  );
}
