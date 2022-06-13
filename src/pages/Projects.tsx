import { useContext, useEffect, useState } from "react";

import DashboardMenu from "../components/Dashboard_Components/DashboardMenu";
import ProjectDataGrid from "../components/Projects_Components/DataGrid";
import { GridContextType, GridDataContext } from "../GridDataProvider";

export default function Projects() {
  const { currentProjects, getCurrentProjects, currentTeams, getCurrentTeams } =
    useContext(GridDataContext) as GridContextType;

  useEffect(() => {
    getCurrentProjects();
    getCurrentTeams();
  }, []);

  return (
    <div>
      <DashboardMenu />
      {currentProjects && currentTeams && (
        <ProjectDataGrid
          projectList={currentProjects}
          teamList={currentTeams}
        />
      )}
    </div>
  );
}
