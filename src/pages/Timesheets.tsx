import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext, AuthContextType } from "../AuthProvider";
import TimeDataGrid from "../components/TimeSheet_Components/DataGrid";
import { fetchTimeSheetList } from "../libs/apiCalls";

import DashboardMenu from "../components/Dashboard_Components/DashboardMenu";
import { GridContextType, GridDataContext } from "../GridDataProvider";

export default function Timesheets() {
  const [timeList, setTimeList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const { currentProjects, getCurrentProjects } = useContext(
    GridDataContext
  ) as GridContextType;

  React.useEffect(() => {
    fetchTimeSheetList().then((result) => {
      setTimeList(result);
    });
  }, []);

  return (
    <div>
      <DashboardMenu />
      {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
      {timeList.length != 0 && currentProjects && (
        <TimeDataGrid
          timeList={timeList}
          projectList={currentProjects}
        ></TimeDataGrid>
      )}
    </div>
  );
}
