import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  //this evaluates to true when we are trying to use the context data outside of it
  if (context === undefined) {
    throw new Error("useTheme() must be used inside a ThemeProvider");
  }

  return context;
};
