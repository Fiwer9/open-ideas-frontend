import axios, { AxiosResponse } from "axios";
import { TokenResponse } from "../models/response/AuthResponse";
import router from "next/router";
import { ResponseInterface } from "../models/response/ResponseInterface";

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
  async (config: AxiosResponse<ResponseInterface<any>>) => {
    if (!config.data.error.is_error) {
      return config;
    }
    if (
      config.data.code === 401 &&
      !window.location.pathname.includes("code")
    ) {
      const refresh = sessionStorage.getItem("token_refresh");
      const response = await axios.post<ResponseInterface<TokenResponse>>(
        `${API_URL_TOKEN}/token/refresh/`,
        { refresh },
        { withCredentials: true }
      );
      if (response.data?.error?.is_error) {
        flag && router.push("/");
        flag = false;
        return;
      }
      const acceptResponse =
        response as unknown as AxiosResponse<TokenResponse>;
      refresh &&
        sessionStorage.setItem("token_access", acceptResponse.data.access);
      return $api.request(config.config);
    }
    return config;
  }
);

export default $api;
