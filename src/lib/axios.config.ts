import axios from "axios";

export const myAPI = axios.create({
  baseURL: "http://localhost:3000/api",
});
