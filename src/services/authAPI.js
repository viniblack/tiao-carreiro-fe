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
  logout: async (token) => {
    const response = await apiClient.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};

export default authAPI;
