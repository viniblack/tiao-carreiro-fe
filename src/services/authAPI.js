import apiClient from "../api/apiClient";

const authAPI = {
  register: async (payload) => {
    const response = await apiClient.post("/register", payload);
    return response.data;
  },
  login: async (payload) => {
    const response = await apiClient.post("/login", payload);
    return response.data;
  },
};

export default authAPI;
