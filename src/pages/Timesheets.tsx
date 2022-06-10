import React, { useContext } from "react";
import TimeDataGrid from "../components/TimeSheet_Components/DataGrid";
import DashboardMenu from "../components/Dashboard_Components/DashboardMenu";
import { GridContextType, GridDataContext } from "../GridDataProvider";

export default function Timesheets() {
  const {
    currentProjects,
    currentTimesheets,
    getCurrentTimesheets,
    getCurrentProjects,
    setCurrentTimesheets,
  } = useContext(GridDataContext) as GridContextType;

  React.useEffect(() => {
    getCurrentTimesheets();
    getCurrentProjects();
  }, []);

  return (
    <div>
      <DashboardMenu />
      {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
      {currentTimesheets && currentProjects && (
        <TimeDataGrid
          timeList={currentTimesheets}
          projectList={currentProjects}
          setTimeList={setCurrentTimesheets}
        ></TimeDataGrid>
      )}
    </div>
  );
}
