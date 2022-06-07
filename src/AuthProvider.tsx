import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "./Interfaces";
import services from "./services";

export interface AuthContextType {
  logged: boolean;
  setLogged: (logged: boolean) => void;
  disconnect: () => void;
  currentUser: IUser;
  setCurrentUser: (user: IUser) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: any) {
  const [logged, setLogged] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    _id: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const hasJwt = localStorage.getItem("jwt");
    setLogged(Boolean(hasJwt));
    getCurrentUSer();
  }, []);

  function disconnect() {
    navigate("/");
    setLogged(false);
    localStorage.removeItem("jwt");
  }

  function getCurrentUSer() {
    services
      .getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => alert("erreur"));
  }

  const value = { logged, setLogged, disconnect, currentUser, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
