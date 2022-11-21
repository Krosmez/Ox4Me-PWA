import "./filter-button.css";

import React from "react";

import { ReactComponent as Filter } from "../../../assets/img/filter-icon.svg";

export default function FilterButton({}) {
  return (
    <>
      <div className="filter-select">
        <Filter /> Filtrer
      </div>
    </>
  );
}
