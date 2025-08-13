import axios from "axios";
import { getToken, isAuthenticated, clearAuth } from "@/utils/storage";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  if (isAuthenticated()) {
    const token = getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      clearAuth();

      window.location.assign("/");
    }
    return Promise.reject(err);
  }
);

export default client;
