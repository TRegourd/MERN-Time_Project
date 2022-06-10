import { useContext, useEffect, useState } from "react";

import DashboardMenu from "../components/Dashboard_Components/DashboardMenu";
import ProjectDataGrid from "../components/Projects_Components/DataGrid";
import { GridContextType, GridDataContext } from "../GridDataProvider";

export default function Projects() {
  const { currentProjects, getCurrentProjects } = useContext(
    GridDataContext
  ) as GridContextType;

  useEffect(() => {
    getCurrentProjects();
  }, []);

  return (
    <div>
      <DashboardMenu />
      {currentProjects && <ProjectDataGrid projectList={currentProjects} />}
    </div>
  );
}
