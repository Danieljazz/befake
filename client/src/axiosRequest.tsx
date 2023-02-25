import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://befake-api.onrender.com/api/v1",
  withCredentials: true,
});
