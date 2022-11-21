import "./cocktailitem.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Headings from "../Headings/Headings";
import StorageTools from "../../data/StorageTools";
import { ReactComponent as Heart } from "../../assets/img/heart.svg";
import { ReactComponent as HeartFill } from "../../assets/img/heart-fill.svg";

export default function CocktailItem({ data, onLikeDislike = () => {} }) {
  const { id, name, score, category } = data;

  const isConsumed = StorageTools.containsConsumedDrink(id);
  const [isLike, setIsLike] = useState(StorageTools.containsFavoriteDrink(id));

  function addRemoveLike() {
    if (!StorageTools.containsFavoriteDrink(id)) {
      StorageTools.addFavoriteDrink(id);
      setIsLike(true);
    } else {
      StorageTools.removeFavoriteDrink(id);
      setIsLike(false);
    }
    onLikeDislike();
  }

  return (
    <li className="cocktail-list-item">
      <Link to={`/cocktail/${id}`} className="card-link">
        <div className="link-top">
          <img
            src={`https://ox4me.deta.dev/static/images/drink/${id}.svg`}
            alt={`Illustration de ${name}`}
            style={{
              backgroundColor: `hsl(${Math.floor(
                Math.random() * 360
              )}, 30%, 70%)`,
            }}
          />
        </div>
        <div className="link-info">
          <Headings
            Is="h2"
            cardTitle
            isConsumed={isConsumed}
            text={name}
            variant="card-title"
          />
          {category === "classic" ? (
            <p>Classique</p>
          ) : category === "homemade" ? (
            <p>Spécialité Oxford</p>
          ) : (
            ""
          )}
        </div>
      </Link>
      <div className="card-aside">
        {score && <div className="score">{(score * 100).toFixed(0)}%</div>}
        <div className="like-container">
          {isLike ? (
            <HeartFill onClick={addRemoveLike} />
          ) : (
            <Heart onClick={addRemoveLike} />
          )}
        </div>
      </div>
    </li>
  );
}
