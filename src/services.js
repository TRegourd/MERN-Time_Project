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

  createProject(body) {
    const token = localStorage.getItem("jwt");
    return base.post(`/projects/`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteProject(projectId) {
    const token = localStorage.getItem("jwt");
    return base
      .delete(`/projects/id/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
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

  updateTimesheet(body) {
    const token = localStorage.getItem("jwt");
    return base
      .put(`/timesheet/update/${body._id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data;
      });
  },

  /**
   * SERVICES AUTH
   *
   */

  login(body) {
    // email, password
    return base.post("/auth/login", body);
  },

  signin(body) {
    return base.post("/auth/signin", body);
  },

  forgot(body) {
    return base.post("/auth/forgot", body);
  },

  reset(body, id) {
    return base.put(`/auth/reset/${id}`, body);
  },

  /**
   * SERVICES CONTACT
   *
   */

  createNewMessage(body) {
    return base.post("/contact", body);
  },

  /**
   * SERVICES TEAMS
   *
   */

  createTeam(body) {
    const token = localStorage.getItem("jwt");
    return base.post(`/teams/`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getTeamList() {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/teams`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data);
  },

  deleteTeam(id) {
    const token = localStorage.getItem("jwt");
    return base
      .delete(`/teams/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  modifyTeam(id, body) {
    const token = localStorage.getItem("jwt");
    return base
      .put(`/teams/update/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  addUserToTeam(body) {
    const token = localStorage.getItem("jwt");
    return base
      .put(`/teams/addUser`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  leaveTeam(id) {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/teams/leave/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getTeamMembers(id) {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/teams/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
  removeUser(id, body) {
    const token = localStorage.getItem("jwt");
    console.log(body);
    return base
      .put(`/teams/removeUser/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
};

export default services;
