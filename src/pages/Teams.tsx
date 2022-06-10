import React, { useEffect, useState } from "react";
import DashboardMenu from "../components/Dashboard_Components/DashboardMenu";
import TeamDataGrid from "../components/Teams_Components/DataGrid";
import { fetchProjectList, fetchTeamList } from "../libs/apiCalls";

function Teams() {
  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    fetchTeamList().then((result) => {
      setTeamsList(result);
    });
  }, []);

  return (
    <div>
      <DashboardMenu />
      {teamsList.length != 0 && <TeamDataGrid teamList={teamsList} />}
    </div>
  );
}

export default Teams;
