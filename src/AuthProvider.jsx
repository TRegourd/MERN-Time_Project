import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    const hasJwt = localStorage.getItem("jwt");
    setLogged(Boolean(hasJwt));
  }, []);

  const value = { logged, setLogged };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
