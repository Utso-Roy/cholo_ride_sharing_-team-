// import axios, { AxiosRequestConfig } from "axios";


// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
// });

// export const api5000 = axios.create({
//   baseURL: "http://localhost:3000",
// });

// api.interceptors.request.use((config: AxiosRequestConfig) => {
//   if (config.data instanceof FormData) {
//     if (!config.headers) config.headers = {};
//     if ("Content-Type" in config.headers) delete config.headers["Content-Type"];
//     if ("content-type" in config.headers) delete config.headers["content-type"];
//   }
//   return config;
// });


import axios, { AxiosRequestConfig } from "axios";

// Base API instance (environment variable বা fallback)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional secondary API instance (if needed)
export const api5000 = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor
api.interceptors.request.use((config?: AxiosRequestConfig) => {
  if (!config) return config;

  if (config.data instanceof FormData) {
    if (!config.headers) config.headers = {};
    delete config.headers["Content-Type"];
    delete config.headers["content-type"];
  }

  return config;
});
// Helper function to safely GET user by email
export const getUserByEmail = async (email: string) => {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await api.get(`/users/${encodedEmail}`);
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      console.warn("User not found:", email);
      return null;
    } else {
      console.error("Failed to fetch user:", err.message);
      throw err;
    }
  }
};

// Optional helper: POST data to any endpoint
export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (err: any) {
    console.error(`Failed to POST to ${endpoint}:`, err.message);
    throw err;
  }
};
