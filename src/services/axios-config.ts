import axios from 'axios'

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
})

AxiosInstance.interceptors.response.use(
  (r) => r,
  (err) => Promise.reject(err)
);