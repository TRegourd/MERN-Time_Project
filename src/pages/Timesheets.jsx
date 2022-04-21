import React from "react";
import { useEffect, useState } from "react";
import Timesheet from "../components/Timesheet";
import services from "../services";
import {
  Button,
  Select,
  Grid,
  Box,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers/";

import { Item } from "../components/Item";
import "../components/timesheet.css";

export default function Timesheets() {
  const [timeList, setList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [dateValue, setDateValue] = useState(null);

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

  useEffect(() => {
    fetchAndSetUserList();
    fetchAndSetTimesheet();
    fetchAndSetProjectList();
  }, []);

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField id="filled-basic" label="Description" variant="filled" />
        <TextField id="filled-basic" label="Duration (min)" variant="filled" />
        <FormControl>
          <InputLabel id="projectLabel">Project</InputLabel>
          <Select labelId="projectLabel">
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
        </FormControl>
        <FormControl>
          <InputLabel id="userLabel">User</InputLabel>
          <Select labelId="userLabel">
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
        </FormControl>

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
