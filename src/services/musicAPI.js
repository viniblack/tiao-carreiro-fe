import apiClient from "../api/apiClient";

const musicAPI = {
  getMusics: async (page = 1) => {
    const response = await apiClient.get(`/musics?page=${page}`);
    return response.data;
  },
  createMusic: async (payload) => {
    const response = await apiClient.post("/musics", payload);
    return response.data;
  },
};

export default musicAPI;
