import { createContext, useReducer } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  let initialState = {
    theme: "default",
    modal: null,
    favoritesDrinks: [],
    consumedDrinks: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_THEME":
        return { ...state, theme: action.payload };
      case "HANDLE_MODAL":
        return { ...state, modal: action.payload };
      case "HANDLE_FAVORITE":
        return { ...state, favoritesDrinks: action.payload };
      case "HANDLE_CONSUMED":
        return { ...state, consumedDrinks: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
