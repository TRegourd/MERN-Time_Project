import axios from "axios";

const baseURL = "http://localhost:1337"; // api.myamazingwebsite.com

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
};

export default services;
