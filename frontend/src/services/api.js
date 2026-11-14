import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});
export const getKnowledge = async (params = {}) =>
  (await api.get("/knowledge", { params })).data.data;
export const getDashboard = async () => (await api.get("/dashboard")).data.data;
export const getFilters = async () => (await api.get("/filters")).data.data;
export const getQuestions = async () => (await api.get("/questions")).data.data;
export const getCommunities = async () =>
  (await api.get("/communities")).data.data;
export const getExperts = async () => (await api.get("/experts")).data.data;
export const getLeaderboard = async () =>
  (await api.get("/leaderboard")).data.data;
export default api;
