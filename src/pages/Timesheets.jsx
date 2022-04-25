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
  const [currentUser, setCurrentUser] = useState({});
  const [projectList, setProjectList] = useState([]);
  const [showTimesheet, setShowTimesheet] = useState(false);

  const [dateValue, setDateValue] = useState(null);
  const [projectValue, setProjectValue] = useState("");
  const [userValue, setUserValue] = useState("");

  function fetchAndSetTimesheet() {
    if (showTimesheet) {
      services
        .getAllTimesheetList()
        .then((list) => {
          setList(list);
          setShowTimesheet(!showTimesheet);
        })
        .catch(() => alert("erreur"));
    } else {
      setList([]);
      setShowTimesheet(!showTimesheet);
    }
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
      .getCurrentUser()
      .then((user) => {
        console.log(user);
        setCurrentUser(user);
      })
      .catch(() => alert("erreur"));
  }

  function fetchAndSetProjectList() {
    services
      .getProjectsList()
      .then((list) => {
        setProjectList(list);
      })
      .catch(() => alert("erreur"));
  }

  function handleShowButton() {
    fetchAndSetTimesheet();
  }

  // envoi du formulaire

  const [form, setForm] = useState({
    desc: "",
    duration: "",
  });

  const body = {
    desc: form.desc,
    date: dateValue,
    duration: form.duration,
    project: projectValue,
    user: userValue,
  };

  function updateForm(key, value) {
    setForm({ ...form, [key]: value });
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    updateForm(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(body);
    services.createNewTimesheet(body);
  }

  // envoi du formulaire

  useEffect(() => {
    fetchAndSetUserList();
    //fetchAndSetTimesheet();
    fetchAndSetProjectList();
    fetchAndSetTimesheet();
  }, []);

  return (
    <div style={{ marginTop: "100px" }}>
      <h2>New Timesheet</h2>
      {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        onChange={handleChangeInput}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        // onSubmit={console.log("toto")}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            name="date"
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          id="filled-basic"
          name="desc"
          label="Description"
          variant="filled"
        />
        <TextField
          id="filled-basic"
          name="duration"
          label="Duration (min)"
          variant="filled"
        />
        <FormControl>
          <InputLabel id="projectLabel">Project</InputLabel>
          <Select
            labelId="projectLabel"
            name="project"
            value={projectValue}
            onChange={(newValue) => {
              setProjectValue(newValue.target.value);
            }}
          >
            <MenuItem value={""}>Chose Project</MenuItem>
            {projectList.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="userLabel">User</InputLabel>
          <Select
            labelId="userLabel"
            name="user"
            value={userValue}
            onChange={(newValue) => {
              setUserValue(newValue.target.value);
            }}
          >
            <MenuItem value={""}>Chose User</MenuItem>
            <MenuItem key={currentUser._id} value={currentUser._id}>
              {currentUser.first_name} {currentUser.last_name}
            </MenuItem>
          </Select>
        </FormControl>

        <Button type="sumbit" variant="contained">
          Submit
        </Button>
      </Box>

      <h2>Timesheets</h2>
      <Button onClick={handleShowButton} variant="contained">
        Show/Hide
      </Button>
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
          onDeleteTimesheet={() => {
            deleteTimesheet(time._id);
          }}
        />
      ))}
    </div>
  );
}
