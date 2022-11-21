import React from "react";
import { useNavigate } from "react-router-dom";

import ButtonLink from "../Components/ButtonLink/ButtonLink";
import Headings from "../Components/Headings/Headings";
import OxAPI from "../data/OxAPI";
import StorageTools from "../data/StorageTools";

export default function RandomCocktail() {
  const randomButtons = [
    { text: "Tous cocktails", criterion: "all" },
    { text: "Fortement alcoolisé" },
    { text: "Peu alcoolisé" },
    { text: "Classique", criterion: "classic" },
    { text: "Spécialité Oxford", criterion: "homemade" },
    { text: "Sucré", criterion: "sweet" },
    { text: "Acidulé", criterion: "sour" },
    { text: "Amer", criterion: "bitter" },
    { text: "Crémeux", criterion: "creamy" },
    { text: "Épicé", criterion: "spicy" },
    { text: "Favoris seulement", action: navigateToRandomFavorites },
    { text: "A découvrir" },
    { text: "La spéciale développeur" },
  ];

  const navigate = useNavigate();

  async function navigateToRandomCriterion(criterion) {
    const drinkData = await OxAPI.getRandomDrink(criterion);
    await navigate(`/cocktail/${drinkData.id}`);
  }

  async function navigateToRandomFavorites() {
    const drinks = StorageTools.initCheckFavoritesDrinks();
    await navigate(
      `/cocktail/${drinks[Math.floor(Math.random() * drinks.length)]}`
    );
  }

  return (
    <main className="container">
      <Headings Is="h2" text="Cocktail Aléatoire" />
      <div className="btn-random-ctn">
        {randomButtons.map((button, index) => {
          if (button.hasOwnProperty("action")) {
            return (
              <ButtonLink
                key={index}
                onClick={async () => await button.action()}
                content={button.text}
              />
            );
          } else if (button.hasOwnProperty("criterion")) {
            return (
              <ButtonLink
                key={index}
                onClick={async () =>
                  await navigateToRandomCriterion(button.criterion)
                }
                content={button.text}
              />
            );
          } else {
            return <ButtonLink key={index} disabled content={button.text} />;
          }
        })}
      </div>
    </main>
  );
}
