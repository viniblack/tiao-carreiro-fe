import apiClient from "../api/apiClient";

const musicAPI = {
  getMusics: async () => {
    const response = await apiClient.get("/musics");
    return response.data;
  },
  createMusic: async (payload) => {
    const response = await apiClient.post("/musics", payload);
    return response.data;
  },
};

export default musicAPI;
