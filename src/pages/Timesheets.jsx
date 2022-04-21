import React from "react";
import { useEffect, useState } from "react";
import Timesheet from "../components/Timesheet";
import services from "../services";
import Grid from "@mui/material/Grid";
import { Item } from "../components/Item";

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
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>Description</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>User</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>Project</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>Date</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>Duration</Item>
        </Grid>
      </Grid>
      {timeList.map((time) => (
        <Timesheet
          key={time._id}
          {...time}
          onDeleteTimesheet={() => deleteTimesheet(time._id)}
        />
      ))}
    </div>
  );
}
