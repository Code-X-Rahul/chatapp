import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/data";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/v1/users/showMe");
      console.log(response);
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
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
    <UserContext.Provider value={{ user, setUser, isLoading, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

//custom hook below
export function useUser() {
  return useContext(UserContext);
}
