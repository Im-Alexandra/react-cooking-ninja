import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

//below is the component which we use to wrap the components we want to have this context
//<ThemeContext.Provider></ThemeContext.Provider>

//we are creating this outside of the component so it doesnt run every time the component is reevaluated
//the state logic will live here
const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export function ThemeProvider({ children }) {
  //we specify the initial value and the function which we will use to update this state
  //dispatch is the way we can dispatch state change to the reducer function
  const [state, dispatch] = useReducer(themeReducer, {
    color: "#58249c",
    mode: "dark",
  });

  //this is function we will use to change the state, we also pass this to themecontext provider below
  const changeColor = (color) => {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
