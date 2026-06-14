import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { TokenResponse } from "../models/response/AuthResponse";
import router from "next/router";
import { ResponseInterface } from "../models/response/ResponseInterface";

let flag = true;

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const API_URL_TOKEN = process.env.NEXT_PUBLIC_BASE_TOKEN;
axios.defaults.withCredentials = true;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (localStorage.getItem("token_access")) {
    const token = localStorage.getItem("token_access");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function isWrappedResponse(data: any): data is ResponseInterface<any> {
  return (
    data &&
    typeof data === "object" &&
    typeof data.code === "number" &&
    data.error &&
    typeof data.error.is_error === "boolean" &&
    "data" in data
  );
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = localStorage.getItem("token_refresh");
  if (!refresh || !API_URL_TOKEN) {
    return null;
  }

  // Backend may return either wrapped or plain SimpleJWT response.
  const response = await axios.post(`${API_URL_TOKEN}/token/refresh/`, { refresh }, { withCredentials: true });
  const maybeWrapped = response.data;

  if (isWrappedResponse(maybeWrapped)) {
    if (maybeWrapped.error?.is_error) {
      return null;
    }
    const access = maybeWrapped.data?.access;
    return typeof access === "string" ? access : null;
  }

  const access = maybeWrapped?.access;
  return typeof access === "string" ? access : null;
}

$api.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    // If backend returns wrapped responses, handle "soft errors" inside 200.
    if (!isWrappedResponse(response.data)) {
      return response;
    }

    if (!response.data.error.is_error) {
      return response;
    }

    if (response.data.code !== 401 || window.location.pathname.includes("code")) {
      return response;
    }

    const access = await refreshAccessToken();
    if (!access) {
      flag && router.push("/");
      flag = false;
      return response;
    }

    localStorage.setItem("token_access", access);
    return $api.request(response.config);
  },
  async (error: AxiosError) => {
    // Handle real HTTP 401 errors (common case).
    const status = error.response?.status;
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (status !== 401 || !originalRequest || originalRequest._retry) {
      throw error;
    }
    if (typeof window !== "undefined" && window.location.pathname.includes("code")) {
      throw error;
    }

    originalRequest._retry = true;

    const access = await refreshAccessToken();
    if (!access) {
      flag && router.push("/");
      flag = false;
      throw error;
    }

    originalRequest.headers = originalRequest.headers ?? {};
    originalRequest.headers.Authorization = `Bearer ${access}`;
    localStorage.setItem("token_access", access);
    return $api.request(originalRequest);
  }
);

export default $api;
