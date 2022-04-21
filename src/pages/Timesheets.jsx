import React from "react";
import { useEffect, useState } from "react";
import Timesheet from "../components/Timesheet";
import services from "../services";

export default function Timesheets() {
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

  function deleteTimesheet(id) {
    services
      .deleteTimesheetById(id)
      .then(() => {
        fetchAndSetTimesheet();
        alert("Timesheet Deleted from DB");
      })
      .catch(() => alert("erreur"));
  }

  useEffect(fetchAndSetTimesheet, []);

  return (
    <div>
      <h1>Timesheets</h1>
      <ul>
        {timeList.map((time) => (
          <li>
            <Timesheet
              key={time._id}
              {...time}
              onDeleteTimesheet={() => deleteTimesheet(time._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
