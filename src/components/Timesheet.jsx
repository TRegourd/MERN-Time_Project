import React from "react";
import Grid from "@mui/material/Grid";
import "./timesheet.css";
import { Item } from "./Item";

export default function Timesheet({
  desc,
  userId,
  projectId,
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
              {userId.first_name} {userId.last_name}
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{projectId.name}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </div>
      <br />
      <Grid>
        <Grid item xs={12}>
          <DeleteButton className="deleteButton" onDelete={onDeleteTimesheet}>
            Delete Timesheet
          </DeleteButton>
        </Grid>
      </Grid>
      <hr />
    </div>
  );
}

function DeleteButton({ onDelete, children }) {
  return <button onClick={onDelete}> X {children} </button>;
}
