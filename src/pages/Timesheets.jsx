import React from "react";
import { useEffect, useState } from "react";
import Timesheet from "../components/Timesheet";
import services from "../services";
import { Button, Select, Grid, Box, TextField, MenuItem } from "@mui/material";

import { Item } from "../components/Item";
import "../components/timesheet.css";

export default function Timesheets() {
  const [timeList, setList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [projectList, setProjectList] = useState([]);

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

  function fetchAndSetUserList() {
    services
      .getUsersList()
      .then((list) => {
        console.log(list);
        setUserList(list);
      })
      .catch(() => alert("erreur"));
  }

  function fetchAndSetProjectList() {
    services
      .getProjectList()
      .then((list) => {
        console.log(list);
        setProjectList(list);
      })
      .catch(() => alert("erreur"));
  }
  console.log(userList);

  useEffect(fetchAndSetUserList, []);
  useEffect(fetchAndSetTimesheet, []);
  useEffect(fetchAndSetProjectList, []);

  return (
    <div>
      <h2>New Timesheet</h2>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={console.log("toto")}
      >
        <TextField id="filled-basic" label="Filled" variant="filled" />

        <Select>
          {projectList.map((item) => (
            <MenuItem
              key={item._id}
              value={item._id}
              //   style={getStyles(name, personName, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>

        <Select>
          {userList.map((item) => (
            <MenuItem
              key={item._id}
              value={item._id}
              //   style={getStyles(name, personName, theme)}
            >
              {item.first_name} {item.last_name}
            </MenuItem>
          ))}
        </Select>

        <Button type="sumbit" variant="contained">
          Submit
        </Button>
      </Box>

      <h2>Timesheets</h2>
      <Grid className="timesheets" container spacing={2}>
        <Grid item xs={4}>
          <Item className="headerItem">Description</Item>
        </Grid>
        <Grid item xs={2}>
          <Item className="headerItem">User</Item>
        </Grid>
        <Grid item xs={2}>
          <Item className="headerItem">Project</Item>
        </Grid>
        <Grid item xs={2}>
          <Item className="headerItem">Date</Item>
        </Grid>
        <Grid item xs={2}>
          <Item className="headerItem">Duration</Item>
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
