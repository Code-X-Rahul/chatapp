import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/data";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/v1/users/showMe");
      setState(response.state);
    } catch (error) {
      setState(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await api.delete("/api/v1/auth/logout");
      setState(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ state, setState, isLoading, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

//custom hook below
export function useUser() {
  return useContext(UserContext);
}
