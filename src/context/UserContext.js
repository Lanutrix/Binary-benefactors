// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Загружаем пользователя из localStorage при первом рендере
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username) => {
    const userData = { name: username };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Сохраняем в localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Удаляем из localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
