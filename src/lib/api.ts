import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // or keep your proxy to 3000 if configured
});

// IMPORTANT: let Axios set the boundary for FormData
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Remove any preset header so browser sets proper multipart boundary
    if (config.headers) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }
  }
  return config;
});