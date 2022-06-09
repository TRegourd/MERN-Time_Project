import React, { useContext, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { AuthContext, AuthContextType } from "../AuthProvider";
import { fetchChartData } from "../libs/apiCalls";
import { TimesheetFilter } from "./TimeSheet_Components/Filter";

export default function Charts() {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      {TimesheetFilter(
        filterStartValue,
        setFilterStartValue,
        filterEndValue,
        setFilterEndValue,
        handleFilter
      )}

      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalTime" fill="grey" />
      </BarChart>
    </div>
  );
}
