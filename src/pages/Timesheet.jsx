import React from "react";
import { useEffect, useState } from "react";
import services from "../services";

export default function Timesheet() {
  const [timeList, setList] = useState([]);

  function fetchAndSetTimesheet() {
    services
      .getAllTimesheetList()
      .then((list) => {
        console.log(list);
        setList(list);
      })
      .catch(() => alert("erreur"));
  }

  console.log(timeList);

  useEffect(fetchAndSetTimesheet, []);

  return (
    <div>
      <h1>Hello it's Timesheet</h1>
      <ul>
        {timeList.map((time) => (
          <li>{time.desc}</li>
        ))}
      </ul>
    </div>
  );
}
