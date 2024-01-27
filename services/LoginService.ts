import {AxiosResponse} from "axios";
import $api from "../http";
import {AuthorizationResponse, AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async sendCode(email: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/auth/login/', { email })
    }

    static async authorization(username: string, password: string): Promise<AxiosResponse<AuthorizationResponse>> {
        return $api.post(`/auth/password/${username}/${password}/`)
    }

    static async confirmEmail( codeStr: string): Promise<AxiosResponse<AuthResponse>> {
        const code = Number(codeStr)
        return $api.post<AuthResponse>(`/auth/token/${code}/`, {code})
    }

    static async logout() {
        return $api.post<AuthResponse>('/auth/logout/')
    }

    static async putRegistration(name: string, department: number) {
        return $api.put<AuthResponse>(`/auth/register/`, {name, department})
    }
}
