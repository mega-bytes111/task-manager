import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // userName ab localStorage se bhi aayega
  const [userName, setUserName] = useState(localStorage.getItem("name"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserName(localStorage.getItem("name"));
  }, []);

  // Yahan login me name parameter bhi le lo (token, name)
  const login = (jwt, name) => {
    setToken(jwt);
    setUserName(name);
    localStorage.setItem("token", jwt);
    localStorage.setItem("name", name);
  };

  const logout = () => {
    setToken(null);
    setUserName(null);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider value={{ userName, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}