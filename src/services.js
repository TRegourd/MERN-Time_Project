import axios from "axios";

const baseURL = "http://localhost:1337";

const base = axios.create({ baseURL });

const services = {
  getUsersList() {
    return base.get(`/users`).then((res) => res.data);
  },
  getAllTimesheetList() {
    return base.get(`/timesheet/all`).then((res) => res.data);
  },
};

export default services;
