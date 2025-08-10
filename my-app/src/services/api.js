// src/services/api.js
import axios from "axios";
import { getAccessToken, setAccessToken } from "../utils/tokenHelper";
import { refreshToken } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error.config;
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        const newAccessToken = await refreshToken();
        setAccessToken(newAccessToken);
        originalReq.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalReq);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
