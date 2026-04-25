import axios from "axios";

const API = axios.create({
  baseURL: "https://finance-trackerapp.onrender.com",
});

// 🔥 ALWAYS attach token automatically
API.interceptors.request.use((config) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const setAuthToken = () => {}; // no longer needed but keep to avoid breaking imports

export default API;