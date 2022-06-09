import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext, AuthContextType } from "../AuthProvider";
import TimeDataGrid from "../components/TimeSheet_Components/DataGrid";
import { fetchProjectList, fetchTimeSheetList } from "../libs/apiCalls";

import DashboardMenu from "../components/DashboardMenu/DashboardMenu";

export default function Timesheets() {
  const [timeList, setTimeList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  React.useEffect(() => {
    fetchTimeSheetList().then((result) => {
      setTimeList(result);
    });
    fetchProjectList().then((result) => {
      setProjectList(result);
    });
  }, []);

  return (
    <div>
      <DashboardMenu />
      {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
      {timeList.length != 0 && projectList.length != 0 && (
        <TimeDataGrid
          timeList={timeList}
          projectList={projectList}
        ></TimeDataGrid>
      )}
    </div>
  );
}
