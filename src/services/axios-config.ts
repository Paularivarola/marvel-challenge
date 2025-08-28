import axios from "axios";

const VITE_API_BASE = (import.meta.env.VITE_API_BASE ?? "").replace(/\/$/, "");

const BASE_URL = VITE_API_BASE ? `${VITE_API_BASE}/api` : "/api";

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { Accept: "application/json" },
});

AxiosInstance.interceptors.response.use(
  (r) => r,
  (err) => Promise.reject(err)
);
