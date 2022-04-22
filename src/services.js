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

  updateProject(id) {
    return base.put(`/projects/id/${id}`).then((res) => res.data);
  },

  updateProjectColor(projectId, color) {
    function stringifyRGB(RGBasNumber) {
      const { r, g, b } = RGBasNumber;
      return { r: String(r), g: String(g), b: String(b) };
    }

    const { r, g, b } = stringifyRGB(color);

    return base
      .put(`/projects/id/color/${projectId}`, { r, g, b }) // {r,g,b} variable passées en body
      .then((res) => res.data);
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
