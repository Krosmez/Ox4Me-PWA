import "./cocktail.css";

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Headings from "../../Components/Headings/Headings";
import IconBar from "../../Components/IconBar/IconBar";
import IngredientListItem from "../../Components/IngredientsListItem/IngredientListItem";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import OxAPI from "../../data/OxAPI";
import StorageTools from "../../data/StorageTools";
import { ReactComponent as BackIcon } from "../../assets/img/arrow.svg";

export default function Cocktail() {
  const params = useParams();
  const navigate = useNavigate();

  const [isConsumed, setIsConsumed] = useState(
    StorageTools.containsConsumedDrink(params?.id)
  );
  const [isLike, setIsLike] = useState(
    StorageTools.containsFavoriteDrink(params?.id)
  );
  const [drinkName, setDrinkName] = useState("");
  const [drinkCategory, setDrinkCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function addRemoveLike() {
    if (!StorageTools.containsFavoriteDrink(params?.id)) {
      StorageTools.addFavoriteDrink(params?.id);
      setIsLike(true);
    } else {
      StorageTools.removeFavoriteDrink(params?.id);
      setIsLike(false);
    }
  }

  function setResetConsumed() {
    if (!StorageTools.containsConsumedDrink(params?.id)) {
      StorageTools.addConsumedDrink(params?.id);
      setIsConsumed(true);
    } else {
      StorageTools.removeConsumedDrink(params?.id);
      setIsConsumed(false);
    }
  }

  function handleReturn() {
    navigate(-1);
  }

  useEffect(() => {
    OxAPI.getDrinkDetails(params?.id).then(
      ({ name, category, ingredients }) => {
        setDrinkName(name);
        setDrinkCategory(category);
        setIngredients(ingredients);
      }
    );
  }, [params.id]);

  if (!drinkName) {
    return <LoadingScreen />;
  } else {
    return (
      <main className="cocktail-view container">
        <section className="cocktail-top">
          <div className="cocktail-info">
            <div className="cocktail-info --top">
              <div className="cocktail-heading">
                <button
                  type="button"
                  className="cocktail-back-btn"
                  onClick={handleReturn}
                >
                  <BackIcon />
                  <span>Retour</span>
                </button>
                <Headings Is="h2" text={drinkName} />
              </div>
            </div>

            <IconBar
              isConsumed={isConsumed}
              setResetConsumed={setResetConsumed}
              addRemoveLike={addRemoveLike}
              isLike={isLike}
            />
          </div>

          <div className="cocktail-img">
            {drinkCategory && (
              <p className="cocktail-category">
                {drinkCategory === "classic"
                  ? "Classique"
                  : drinkCategory === "homemade"
                  ? "Spécialité Oxford"
                  : "Inconnu"}
              </p>
            )}
            <img
              src={`https://ox4me.deta.dev/static/images/drink/${params?.id}.svg`}
              alt={`Illustration du cocktail ${drinkName}`}
              loading="lazy"
            />
          </div>
        </section>

        <section className="cocktail-bottom">
          <Headings Is="h3" text="Les ingrédients" />
          <ul className="ingredients-list">
            {ingredients?.map((el, index) => {
              return <IngredientListItem data={el} key={index} />;
            })}
          </ul>
        </section>
      </main>
    );
  }
}
