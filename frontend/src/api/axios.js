import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error("Missing VITE_API_URL. Add it to frontend/.env.");
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/") {
        toast.error("Your session expired. Please login again.");
        window.location.replace("/");
      }
    } else if (status === 403) {
      toast.error("You do not have permission to perform this action.");
    } else if (status === 404) {
      toast.error(error.response?.data?.message || "Requested resource was not found.");
    } else if (status >= 500) {
      toast.error("Server error. Please try again shortly.");
    } else if (!error.response) {
      toast.error("Backend is unavailable. Check your connection and try again.");
    }

    return Promise.reject(error);
  }
);

export default api;
