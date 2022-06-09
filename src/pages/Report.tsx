import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../AuthProvider";
import Charts from "../components/Charts";
import DashboardMenu from "../components/Dashboard_Components/DashboardMenu";
import { TimesheetFilter } from "../components/TimeSheet_Components/Filter";
import { fetchChartData } from "../libs/apiCalls";

function Report() {
  const [filterStartValue, setFilterStartValue] = useState(null);
  const [filterEndValue, setFilterEndValue] = useState(null);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  function handleFilter() {
    fetchChartData(filterStartValue, filterEndValue).then((result) => {
      setData(result);
    });
  }

  React.useEffect(() => {
    fetchChartData(filterStartValue, filterEndValue).then((result) => {
      setData(result);
    });
  }, []);
  return (
    <div>
      <DashboardMenu />{" "}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        {TimesheetFilter(
          filterStartValue,
          setFilterStartValue,
          filterEndValue,
          setFilterEndValue,
          handleFilter
        )}
      </Box>
      <Box>{data.length != 0 && <Charts data={data}></Charts>}</Box>
    </div>
  );
}

export default Report;
