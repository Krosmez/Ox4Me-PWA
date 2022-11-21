import "./iconbar.css";

import React from "react";

import { ReactComponent as Heart } from "../../assets/img/heart.svg";
import { ReactComponent as HeartFill } from "../../assets/img/heart-fill.svg";

export default function IconBar({
  isConsumed,
  setResetConsumed,
  addRemoveLike,
  isLike,
}) {
  return (
    <div className="cocktail-icons">
      <label
        htmlFor="already-drink"
        className={!isConsumed ? "switch-label" : "switch-label checked"}
      >
        <input
          type="checkbox"
          id="already-drink"
          name="already-drink"
          className="switch-checkbox"
          checked={isConsumed}
          onClick={setResetConsumed}
          readOnly
        />
        <div className="switch-btn" />
        <div className="switch-txt">
          <span>Déjà bû</span>
          <span>Jamais testé</span>
        </div>
      </label>
      <label htmlFor="like" onClick={addRemoveLike} className="btn-heart">
        <input type="checkbox" name="like" checked={isLike} readOnly />
        {!isLike ? <Heart /> : <HeartFill />}
      </label>
    </div>
  );
}
