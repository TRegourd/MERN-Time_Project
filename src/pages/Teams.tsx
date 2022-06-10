import React, { useContext } from "react";
import DashboardMenu from "../components/Dashboard_Components/DashboardMenu";
import TeamDataGrid from "../components/Teams_Components/DataGrid";
import { GridContextType, GridDataContext } from "../GridDataProvider";

function Teams() {
  const { currentTeams, getCurrentTeams } = useContext(
    GridDataContext
  ) as GridContextType;

  React.useEffect(() => {
    getCurrentTeams();
  }, []);

  return (
    <div>
      <DashboardMenu />
      {currentTeams && <TeamDataGrid teamList={currentTeams} />}
    </div>
  );
}

export default Teams;
