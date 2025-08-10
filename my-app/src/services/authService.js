// src/services/authService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change if needed
  withCredentials: true, // Required for cookies (refresh token)
});

export const login = async (email, password) => {
  const res = await API.post("/login", { email, password });
  return res.data; // should return { accessToken, user }
};

export const logout = async () => {
  await API.post("/logout");
};

export const refreshToken = async () => {
  const res = await API.post("/refresh");
  return res.data.accessToken;
};
