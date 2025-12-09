import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const userEmail = localStorage.getItem("userEmail");

    if (accessToken && userId) {
      setUser({
        accessToken,
        userId,
        username,
        email: userEmail,
      });
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("userId", userData._id);
    localStorage.setItem("username", userData.username);
    localStorage.setItem("userEmail", userData.email);

    setUser({
      accessToken: userData.accessToken,
      userId: userData._id,
      username: userData.username,
      email: userData.eimal,
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    lcoalStorage.removeItem("username");
    localStorage.removeItem("userEmail");

    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
