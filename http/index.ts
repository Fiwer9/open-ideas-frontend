import axios from "axios";
import { TokenResponse } from "../models/response/AuthResponse";
import router from "next/router";

let flag = true;

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const API_URL_TOKEN = process.env.NEXT_PUBLIC_BASE_URL.substring(
  0,
  process.env.NEXT_PUBLIC_BASE_URL.length - 4
);
axios.defaults.withCredentials = true;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (sessionStorage.getItem("token_access")) {
    const token = sessionStorage.getItem("token_access");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      !window.location.pathname.includes("code")
    ) {
      try {
        const refresh = sessionStorage.getItem("token_refresh");
        const response = await axios.post<TokenResponse>(
          `${API_URL_TOKEN}/token/refresh/`,
          { refresh },
          { withCredentials: true }
        );
        sessionStorage.setItem("token_access", response.data.access);
        return $api.request(originalRequest);
      } catch (e) {
        console.error(e.message);
        flag && router.push("/");
        flag = false;
      }
    }
  }
);

export default $api;
