import React, { useContext } from "react";
import { AuthContext, AuthContextType } from "../AuthProvider";
import DashboardMenu from "../components/Dashboard_Components/DashboardMenu";
import TeamDataGrid from "../components/Teams_Components/ManagerDataGrid";
import UserTeamDataGrid from "../components/Teams_Components/UserDataGrid";
import { GridContextType, GridDataContext } from "../GridDataProvider";

function Teams() {
  const { currentTeams, getCurrentTeams } = useContext(
    GridDataContext
  ) as GridContextType;
  const { currentUser } = React.useContext(AuthContext) as AuthContextType;

  React.useEffect(() => {
    getCurrentTeams();
  }, []);

  return (
    <div>
      <DashboardMenu />
      {currentTeams && currentUser.isAdmin && (
        <TeamDataGrid teamList={currentTeams} />
      )}
      {currentUser.team && <UserTeamDataGrid teamList={currentUser.team} />}
    </div>
  );
}

export default Teams;
