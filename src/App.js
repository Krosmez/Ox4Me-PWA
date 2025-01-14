import "./App.css";

import React, { useEffect, useState } from "react";

import BottomNavBar from "./Components/BottomNavBar/BottomNavBar";
import SearchBar from "./Components/SearchBar/SearchBar";
import useResize from "./customHooks/useResize";
import useStorage from "./customHooks/useStorage";

function App() {
  const { initCheckStorage } = useStorage();
  const [pattern, setPattern] = useState("");
  const { dimensions } = useResize();

  function getSearchValue(searchedValue) {
    setPattern(searchedValue);
  }

  useEffect(() => {
    initCheckStorage();
  }, []);

  return (
    <>
      <SearchBar
        getSearchValue={getSearchValue}
        screenWidth={dimensions.width}
      />

      {dimensions.width >= 768 ? (
        <div> This is a new component</div>
      ) : (
        <BottomNavBar />
      )}
    </>
  );
}

export default App;
