import axios from "axios";

export const myAPI = axios.create({
  baseURL: "https://backendnews-production.up.railway.app/api",
});
