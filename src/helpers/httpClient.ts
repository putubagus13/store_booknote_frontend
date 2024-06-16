import { LOGIN } from "@/route";
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_PATH;

const httpClient = axios.create({
  baseURL: baseURL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}` ?? "";
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      window.location.href = window.location.origin + LOGIN;
    }

    return Promise.reject(error);
  }
);

export default httpClient;
