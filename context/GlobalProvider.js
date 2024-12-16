import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (!user) {
          setIsLoggedIn(false);
          setUser(null);
        } else {
          setIsLoggedIn(true);
          setUser(user);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("contexxt", error);
      }).finally(() => setLoading(false));
  }, []);

  return <GlobalContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser, loading, setLoading}}>{children}</GlobalContext.Provider>;
};

