import { useContext, useState } from "react";

import GlobalContext from "../Context/globalContext";

const useStorage = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [favorites, setFavorites] = useState(state.favoritesDrinks);
  const [consumed, setConsumed] = useState(state.consumedDrinks);
  const FAVORITES_DRINKS_STORAGE = "favDrinks";
  const CONSUMED_DRINKS_STORAGE = "consumedDrinks";

  function initCheckStorage() {
    let favoritesLocal = localStorage.getItem(FAVORITES_DRINKS_STORAGE);
    let consumedLocal = localStorage.getItem(CONSUMED_DRINKS_STORAGE);

    if (favoritesLocal) {
      dispatch({
        type: "HANDLE_FAVORITE",
        payload: JSON.parse(favoritesLocal),
      });
    } else {
      localStorage.setItem(
        FAVORITES_DRINKS_STORAGE,
        JSON.stringify(state.favoritesDrinks)
      );
    }

    if (consumedLocal) {
      dispatch({ type: "HANDLE_CONSUMED", payload: JSON.parse(consumedLocal) });
    } else {
      localStorage.setItem(
        CONSUMED_DRINKS_STORAGE,
        JSON.stringify(state.consumedDrinks)
      );
    }
  }

  const addFavoriteDrink = (drinkID) => {
    if (!favorites.includes(drinkID)) {
      setFavorites([...favorites, drinkID]);
      dispatch({ type: "HANDLE_FAVORITE", payload: [...favorites, drinkID] });
    }
  };

  const addConsumedDrink = (drinkID) => {
    if (!consumed.includes(drinkID)) {
      setConsumed([...consumed, drinkID]);
      dispatch({ type: "HANDLE_CONSUMED", payload: [...consumed, drinkID] });
    }
  };

  const removeFavoriteDrink = (drinkID) => {
    if (favorites.includes(drinkID)) {
      const newFavorites = favorites.filter((id) => drinkID !== id);
      setFavorites(newFavorites);
      dispatch({ type: "HANDLE_FAVORITE", payload: newFavorites });
    }
  };

  const removeConsumedDrink = (drinkID) => {
    if (consumed.includes(drinkID)) {
      const newConsumed = consumed.filter((id) => drinkID !== id);
      setConsumed(newConsumed);
      dispatch({ type: "HANDLE_CONSUMED", payload: newConsumed });
    }
  };

  return {
    favorites,
    consumed,
    addFavoriteDrink,
    initCheckStorage,
    addConsumedDrink,
    removeFavoriteDrink,
    removeConsumedDrink,
  };
};

export default useStorage;
