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
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers/";
import Charts from "../components/Charts";

import { TimesheetFilter } from "../components/TimeSheet_Components/Filter";
import { AuthContext } from "../AuthProvider";
import TimeDataGrid from "../components/TimeSheet_Components/DataGrid";
import {
  fetchChartData,
  fetchProjectList,
  fetchTimeSheetList,
} from "../libs/apiCalls";
import AddTimeSheet from "../components/TimeSheet_Components/AddTimeSheet";

export default function Timesheets() {
  const [timeList, setTimeList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const [projectValue, setProjectValue] = useState("");
  const [filterStartValue, setFilterStartValue] = useState(null);
  const [filterEndValue, setFilterEndValue] = useState(null);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

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
      fetchChartData(filterStartValue, filterEndValue).then((result) => {
        setData(result);
      });
      fetchTimeSheetList().then((result) => {
        setTimeList(result);
      });
    });
  }

  // ** envoi du formulaire

  function handleFilter() {
    fetchChartData(filterStartValue, filterEndValue).then((result) => {
      setData(result);
    });
  }

  React.useEffect(() => {
    fetchTimeSheetList().then((result) => {
      setTimeList(result);
    });
    fetchProjectList().then((result) => {
      setProjectList(result);
    });
    fetchChartData(filterStartValue, filterEndValue).then((result) => {
      setData(result);
    });
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
      <AddTimeSheet></AddTimeSheet>
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
      </Box>
      <Box>
        <Charts data={data}></Charts>
      </Box>
      {timeList.length != 0 && <TimeDataGrid list={timeList}></TimeDataGrid>}
    </div>
  );
}
