import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "./Interfaces";
import services from "./services";

export interface GridContextType {
  currentProjects: any;
  setCurrentProjects: (result: any) => void;
  getCurrentProjects: () => void;
}

export const GridDataContext = createContext<GridContextType | null>(null);

export default function GirdDataProvider({ children }: any) {
  const [currentProjects, setCurrentProjects] = useState();

  function getCurrentProjects() {
    services
      .getProjectsList()
      .then((result) => {
        setCurrentProjects(result);
      })
      .catch(() => alert("erreur"));
  }

  const value = {
    currentProjects,
    setCurrentProjects,
    getCurrentProjects,
  };

  return (
    <GridDataContext.Provider value={value}>
      {children}
    </GridDataContext.Provider>
  );
}
