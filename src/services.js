import axios from "axios";

const baseURL = "http://localhost:1337";

const base = axios.create({ baseURL });

const services = {
  getUsersList() {
    return base.get(`/users`).then((res) => res.data);
  },

  getProjectsList() {
    return base.get(`/projects`).then((res) => res.data);
  },

  updateProject() {
    return base.post(`/projects/id/:id`).then((res) => res.data);
  },

  getProjectList() {
    return base.get(`/projects`).then((res) => res.data);
  },
  getAllTimesheetList() {
    return base.get(`/timesheet/all`).then((res) => res.data);
  },
  deleteTimesheetById(id) {
    return base.delete(`/timesheet/delete/${id}`).then((res) => res.data);
  },
};

export default services;
