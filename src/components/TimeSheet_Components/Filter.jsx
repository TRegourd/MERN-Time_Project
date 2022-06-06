import React from "react";
import { Button, TextField, FormControl, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers/";

export function TimesheetFilter(
  filterStartValue,
  setFilterStartValue,
  filterEndValue,
  setFilterEndValue,
  handleFilter
) {
  return (
    <FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            name="startDate"
            value={filterStartValue}
            onChange={(newValue) => {
              setFilterStartValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="To"
            name="endDate"
            value={filterEndValue}
            onChange={(newValue) => {
              setFilterEndValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button onClick={handleFilter} variant="contained">
          Apply Filter
        </Button>
      </Box>
    </FormControl>
  );
}
