import React, { useContext, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { fetchChartData } from "../../libs/apiCalls";

export default function Statistics() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    fetchChartData(null, null).then((result) => {
      setData(result);
    });
  }, []);
  return (
    <div
      style={
        {
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          // marginTop: "10px",
          // width: "1000px",
        }
      }
    >
      <ResponsiveContainer height={400}>
        <BarChart
          data={data}
          height={250}
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
          <Bar dataKey="totalTime" fill="grey" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
