import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

export const api = axios.create({
  baseURL, // -> http://localhost:3000
  withCredentials: false,
  timeout: 15000,
});

// (optional) tiny helper to see what URL you’re hitting
if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log("[api] baseURL =", api.defaults.baseURL);
}

// export const api5000 = axios.create({
//   baseURL: "http://localhost:3000",
// });

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Axios will automatically set correct headers for multipart/form-data
    delete config.headers?.["Content-Type"];
    delete config.headers?.["content-type"];
  }
  return config;
});

export default api;
