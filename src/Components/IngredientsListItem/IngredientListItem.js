import "./ingredients.css";

import React from "react";

export default function IngredientListItem({ data, ...props }) {
  return !data ? (
    "Ingredients non fournis"
  ) : (
    <li className="ingredients-list-item" {...props}>
      <p className="container">{data.name}</p>
    </li>
  );
}
