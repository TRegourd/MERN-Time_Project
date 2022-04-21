import axios from "axios";

const baseURL = "http://localhost:1337"; // api.myamazingwebsite.com

const base = axios.create({ baseURL });

const services = {
  getUsersList() {
    return base.get(`/users`).then((res) => res.data);
  },
};

export default services;
