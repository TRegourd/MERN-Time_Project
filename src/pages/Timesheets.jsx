import React, { useContext } from "react";
import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers/";

import "../components/timesheet.css";
import Charts from "../components/Charts";
import ExportCSV from "../components/TimeSheet_Components/ExportCSV";
import { TimesheetFilter } from "../components/TimeSheet_Components/Filter";
import { AuthContext } from "../AuthProvider";

export default function Timesheets() {
  const [timeList, setList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const [projectValue, setProjectValue] = useState("");
  const [filterStartValue, setFilterStartValue] = useState(null);
  const [filterEndValue, setFilterEndValue] = useState(null);
  const { currentUser } = useContext(AuthContext);

  function fetchAndSetTimesheet() {
    if (filterStartValue && filterEndValue) {
      const filter = { startDate: filterStartValue, endDate: filterEndValue };
      services
        .getFilteredTimesheetList(filter)
        .then((list) => {
          setList(list);
        })
        .catch(() => alert("erreur"));
    } else {
      services
        .getAllTimesheetList()
        .then((list) => {
          setList(list);
        })
        .catch(() => alert("erreur"));
    }
  }

  useEffect(fetchAndSetTimesheet, []);

  function deleteTimesheet(id) {
    services
      .deleteTimesheetById(id)
      .then(() => {
        fetchAndSetTimesheet();
        fetchAndSetChartData();
        alert("Timesheet Deleted from DB");
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
    user: currentUser,
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
    services.createNewTimesheet(body).then(() => {
      fetchAndSetChartData();
      fetchAndSetTimesheet();
    });
  }

  // ** envoi du formulaire

  const [data, setData] = useState([]);

  function fetchAndSetChartData() {
    if (filterStartValue && filterEndValue) {
      const filter = { startDate: filterStartValue, endDate: filterEndValue };
      services.getTotalTimebyProject(filter).then((result) => {
        setData(result);
      });
    } else {
      services.getTotalTimebyProject().then((result) => {
        setData(result);
      });
    }
  }

  useEffect(() => {
    fetchAndSetProjectList();
    fetchAndSetTimesheet();
    fetchAndSetChartData();
  }, []);

  function handleFilter() {
    fetchAndSetTimesheet();
    fetchAndSetChartData();
  }

  return (
    <div style={{ marginTop: "100px" }}>
      {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}

      <Box
        component="form"
        onSubmit={handleSubmit}
        onChange={handleChangeInput}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "center",
        }}
        noValidate
        autoComplete="off"
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

        <Button type="sumbit" variant="contained">
          Submit
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        {TimesheetFilter(
          filterStartValue,
          setFilterStartValue,
          filterEndValue,
          setFilterEndValue,
          handleFilter
        )}
        {timeList.length != 0 && <ExportCSV timeList={timeList}></ExportCSV>}
      </Box>
      <Box>
        <Charts data={data}></Charts>
      </Box>
      <Grid
        className="timesheets"
        container
        direction="row"
        spacing={2}
        justifyContent="Center"
      >
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Project</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Duration</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeList.map((time) => (
                  <TableRow
                    key={time._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {time.desc}
                    </TableCell>
                    <TableCell align="center">{time.project.name}</TableCell>
                    <TableCell align="center">
                      {dayjs(time.date).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">{time.duration}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        className="deleteButton"
                        onClick={() => {
                          deleteTimesheet(time._id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
