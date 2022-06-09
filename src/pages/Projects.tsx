import { useEffect, useState } from "react";

import DashboardMenu from "../components/DashboardMenu/DashboardMenu";
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
        <ProjectDataGrid projectList={projectsList} />
      )}
    </div>
  );
}
