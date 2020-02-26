import React, { createContext, useContext, useReducer } from "react";

// create an inital context
export const StateContext = createContext();

const initialState = {
  session: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setSession":
      return {
        ...state,
        session: action.session
      };
    default:
      return state;
  }
};

// create provider to wrap components
export const GlobalStateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// custom hook to get current global state.
// returns value prop from StateContext.Provider
export const useGlobalState = () => useContext(StateContext);
