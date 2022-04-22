import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "./timesheet.css";
import { Item } from "./Item";

export default function Timesheet({
  desc,
  user,
  project,
  date,
  duration,
  onDeleteTimesheet,
}) {
  return (
    <div className="timesheet">
      <div className="timesheetConatiner">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>{desc}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              {user.first_name} {user.last_name}
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{project.name}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{date}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{duration} min</Item>
          </Grid>
        </Grid>
      </div>
      <br />
      <Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            className="deleteButton"
            onClick={onDeleteTimesheet}
          >
            Delete Timesheet
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}