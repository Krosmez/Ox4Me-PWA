import "./filter-bar.css";

import React from "react";

import FilterButton from "./FilterButton/filterButton";

export default function FilterBar() {
  return (
    <div className="container filter-bar">
      <FilterButton />
    </div>
  );
}
