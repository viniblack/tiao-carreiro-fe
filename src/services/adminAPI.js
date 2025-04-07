import apiClient from "../api/apiClient";

const adminAPI = {
  getApprove: async (page = 1) => {
    const response = await apiClient.get(`/admin/pending?page=${page}`);
    return response.data;
  },
  approving: async (id) => {
    const response = await apiClient.post(`/admin/approve/${id}`);
    return response.data;
  },
  createMusicAdmin: async (payload) => {
    const response = await apiClient.post("/admin/musics", payload);
    return response.data;
  },
  rejecting: async (id) => {
    const response = await apiClient.delete(`/admin/rejecting/${id}`);
    return response.data;
  },
  editMusic: async (id, payload) => {
    const response = await apiClient.patch(`/admin/musics/${id}`, payload);
    return response.data;
  },
};

export default adminAPI;
