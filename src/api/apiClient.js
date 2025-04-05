import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default apiClient;
