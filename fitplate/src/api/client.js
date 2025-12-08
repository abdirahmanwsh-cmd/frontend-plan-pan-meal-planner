import axios from "axios";

// Base URL for your FastAPI backend
const apiClient = axios.create({
  baseURL:"https://backend-plan-pan-meal-planner.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach token automatically if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
