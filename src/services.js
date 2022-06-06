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
    const token = localStorage.getItem("jwt");
    return base
      .get(`/projects`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data);
  },

  updateProject(projectId, project) {
    return base
      .put(`/projects/id/${projectId}`, project)
      .then((res) => res.data);
  },

  updateProjectName(projectId, name) {
    return base
      .put(`/projects/id/name/${projectId}`, { name })
      .then((res) => res.data);
  },

  updateProjectColor(projectId, color) {
    const { r, g, b } = stringifyRGB(color);

    return base
      .put(`/projects/id/color/${projectId}`, { r, g, b }) // {r,g,b} variable passées en body
      .then((res) => res.data);
  },

  createProject(body) {
    const token = localStorage.getItem("jwt");
    return base.post(`/projects/`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
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

  getFilteredTimesheetList(body) {
    const token = localStorage.getItem("jwt");
    return base
      .post(`/timesheet/filter`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getTotalTimebyProject(body) {
    const token = localStorage.getItem("jwt");
    return base
      .post(`/timesheet/project/graph`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
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

  createNewMessage(body) {
    return base.post("/contact", body);
  },
};

export default services;
