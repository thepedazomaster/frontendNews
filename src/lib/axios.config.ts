/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";

export const myAPI = axios.create({
  baseURL: "https://backendnews-production.up.railway.app/api",
});

export const validateUser = (logoutAction: () => void) => {
  myAPI.interceptors.response.use(
    (response) => response,
    (error: any) => {
      if (error.response.status === 401) {
        console.log("entre");
        logoutAction();
      }
      return Promise.reject(error);
    }
  );
};
