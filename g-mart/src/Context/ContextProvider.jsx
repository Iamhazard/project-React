import React, { createContext, useState, useContext } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [userToken, setUserToken] = useState();
  const contextValue = {
    currentUser,
    setCurrentUser,
    userToken,
    setUserToken,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
