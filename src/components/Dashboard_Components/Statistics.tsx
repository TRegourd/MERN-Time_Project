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
import { GridContextType, GridDataContext } from "../../GridDataProvider";

import { fetchChartData } from "../../libs/apiCalls";

export default function Statistics() {
  const { chartData, fetchChartData } = useContext(
    GridDataContext
  ) as GridContextType;

  React.useEffect(() => {
    fetchChartData(null, null);
  }, []);

  return (
    <div>
      <ResponsiveContainer height={400}>
        <BarChart
          data={chartData}
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
