import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "./Interfaces";
import services from "./services";

export interface GridContextType {
  currentProjects: any;
  setCurrentProjects: (result: any) => void;
  getCurrentProjects: () => void;
  currentTimesheets: any;
  setCurrentTimesheets: (result: any) => void;
  getCurrentTimesheets: () => void;
  currentTeams: any;
  setCurrentTeams: (result: any) => void;
  getCurrentTeams: () => void;
  currentTeamMembers: any;
  setCurrentTeamMembers: (result: any) => void;
  getCurrentTeamMembers: (teamId: string) => void;
}

export const GridDataContext = createContext<GridContextType | null>(null);

export default function GirdDataProvider({ children }: any) {
  const [currentProjects, setCurrentProjects] = useState();
  const [currentTimesheets, setCurrentTimesheets] = useState();
  const [currentTeams, setCurrentTeams] = useState();
  const [currentTeamMembers, setCurrentTeamMembers] = useState();

  function getCurrentProjects() {
    services
      .getProjectsList()
      .then((result) => {
        setCurrentProjects(result);
      })
      .catch(() => alert("erreur"));
  }

  function getCurrentTimesheets() {
    services
      .getAllTimesheetList()
      .then((result) => {
        setCurrentTimesheets(result);
      })
      .catch(() => alert("erreur"));
  }

  function getCurrentTeams() {
    services
      .getTeamList()
      .then((result) => {
        setCurrentTeams(result);
      })
      .catch(() => alert("erreur"));
  }

  function getCurrentTeamMembers(teamId: string) {
    services
      .getTeamMembers(teamId)
      .then((result) => {
        setCurrentTeamMembers(result);
      })
      .catch(() => alert("erreur"));
  }

  const value = {
    currentProjects,
    setCurrentProjects,
    getCurrentProjects,
    currentTimesheets,
    setCurrentTimesheets,
    getCurrentTimesheets,
    currentTeams,
    setCurrentTeams,
    getCurrentTeams,
    currentTeamMembers,
    setCurrentTeamMembers,
    getCurrentTeamMembers,
  };

  return (
    <GridDataContext.Provider value={value}>
      {children}
    </GridDataContext.Provider>
  );
}
