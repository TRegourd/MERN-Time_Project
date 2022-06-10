import { useEffect, useState } from "react";

import DashboardMenu from "../components/Dashboard_Components/DashboardMenu";
import ProjectDataGrid from "../components/Projects_Components/DataGrid";
import { fetchProjectList } from "../libs/apiCalls";

export default function Projects() {
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    fetchProjectList().then((result) => {
      setProjectsList(result);
    });
  }, []);

  return (
    <div>
      <DashboardMenu />
      {projectsList.length != 0 && (
        <ProjectDataGrid
          projectList={projectsList}
          setProjectList={setProjectsList}
        />
      )}
    </div>
  );
}
