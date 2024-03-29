import { createContext } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  return <ThemeContext.Provider>{props.children}</ThemeContext.Provider>;
};
