import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.data instanceof FormData) {
    if (!config.headers) config.headers = {};
    if ("Content-Type" in config.headers) delete config.headers["Content-Type"];
    if ("content-type" in config.headers) delete config.headers["content-type"];
  }
  return config;
});
