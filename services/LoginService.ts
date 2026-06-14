import axios, { AxiosResponse } from "axios";
import $api from "../http";
import {
  AuthorizationResponse,
  AuthResponse,
} from "../models/response/AuthResponse";
import { ResponseInterface } from "../models/response/ResponseInterface";
import { API_URL_TOKEN } from "../http";
import { getUserIdFromAccessToken } from "../utils/jwt";

export default class AuthService {
  static async sendCode(email: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/auth/login/", { email });
  }

  static async postAuthorization(
    email: string,
    password: string
  ): Promise<AxiosResponse<ResponseInterface<AuthorizationResponse>>> {
    if (!API_URL_TOKEN) {
      return {
        data: {
          error: {
            is_error: true,
            detail: "NEXT_PUBLIC_BASE_TOKEN is not set",
          },
          data: {} as AuthorizationResponse,
          code: 500,
        },
      } as AxiosResponse<ResponseInterface<AuthorizationResponse>>;
    }

    // Swagger: POST /token/create/ expects { username, password } and returns JWT pair.
    // Backend may return plain SimpleJWT or wrapped ResponseInterface — normalize to wrapper.
    const response = await axios.post(
      `${API_URL_TOKEN}/token/create/`,
      { username: email, password },
      { withCredentials: true }
    );

    const maybeWrapped = response.data as any;
    if (
      maybeWrapped &&
      typeof maybeWrapped === "object" &&
      typeof maybeWrapped.code === "number" &&
      maybeWrapped.error &&
      typeof maybeWrapped.error.is_error === "boolean" &&
      "data" in maybeWrapped
    ) {
      return response as AxiosResponse<ResponseInterface<AuthorizationResponse>>;
    }

    const access =
      maybeWrapped?.access ?? maybeWrapped?.jwt_access ?? maybeWrapped?.access_token;
    const refresh =
      maybeWrapped?.refresh ?? maybeWrapped?.jwt_refresh ?? maybeWrapped?.refresh_token;
    const userIdFromPayload = Number(
      maybeWrapped?.user_id ?? maybeWrapped?.data?.user_id ?? 0
    );
    const userIdFromToken = getUserIdFromAccessToken(
      typeof access === "string" ? access : null
    );

    const normalized: ResponseInterface<AuthorizationResponse> = {
      error: { is_error: false, detail: "" },
      code: 200,
      data: {
        email,
        password: "",
        user_id: userIdFromPayload || userIdFromToken || 0,
        is_verified: true,
        jwt_access: typeof access === "string" ? access : "",
        jwt_refresh: typeof refresh === "string" ? refresh : "",
      },
    };

    return { ...(response as any), data: normalized };
  }

  static async confirmEmail(
    code: number
  ): Promise<AxiosResponse<ResponseInterface<AuthorizationResponse>>> {
    return $api.post(`/auth/token/${code}/`);
  }

  static async logout() {
    return $api.post<AuthResponse>("/auth/logout/");
  }

  static async putRegistration(
    name: string,
    department: number
  ): Promise<AxiosResponse<ResponseInterface<AuthResponse>>> {
    return $api.put(`/auth/register/`, { name, department });
  }

  static async postRegistration(
    email: string,
    password: string
  ): Promise<AxiosResponse<ResponseInterface<AuthorizationResponse>>> {
    return $api.post(`/auth/passreg/`, { email, password });
  }
}
