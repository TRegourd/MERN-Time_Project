import axios from "axios";
import stringifyRGB from "./libs/colors";

const baseURL = process.env.REACT_APP_API_URL;

const base = axios.create({ baseURL });

const services = {
  /**
   * SERVICES USERS
   *
   */
  getCurrentUser() {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data);
  },

  updateCurrentUser(body) {
    const token = localStorage.getItem("jwt");
    return base
      .put(`/users`, body, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data);
  },

  /**
   * SERVICES PROJECTS
   *
   */
  getProjectsList() {
    return base.get(`/projects`).then((res) => res.data);
  },

  updateProject(id) {
    return base.put(`/projects/id/${id}`).then((res) => res.data);
  },

  updateProjectColor(projectId, color) {
    const { r, g, b } = stringifyRGB(color);

    return base
      .put(`/projects/id/color/${projectId}`, { r, g, b }) // {r,g,b} variable passées en body
      .then((res) => res.data);
  },

  createProject(body) {
    return base.post(`/projects/`, body);
  },

  deleteProject(projectId) {
    return base.delete(`/projects/id/${projectId}`).then((res) => res.data);
  },

  /**
   * SERVICES TIMESHEET
   *
   */
  getAllTimesheetList() {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/timesheet/all`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data);
  },

  getTimesheetOfProject(idProject) {
    return base.get(`/timesheet/project/${idProject}`);
  },

  deleteTimesheetById(id) {
    return base.delete(`/timesheet/delete/${id}`).then((res) => res.data);
  },

  createNewTimesheet(body) {
    const token = localStorage.getItem("jwt");
    return base
      .post(`timesheet/newtimesheet`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  login(body) {
    // email, password
    return base.post("/auth/login", body);
  },

  signin(body) {
    return base.post("/auth/signin", body);
  },
};

export default services;
