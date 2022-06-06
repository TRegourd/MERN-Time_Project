import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  logged: boolean;
  setLogged: (logged: boolean) => void;
  disconnect: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: any) {
  const [logged, setLogged] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const hasJwt = localStorage.getItem("jwt");
    setLogged(Boolean(hasJwt));
  }, []);

  function disconnect() {
    navigate("/");
    setLogged(false);
    localStorage.removeItem("jwt");
  }

  const value = { logged, setLogged, disconnect };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
