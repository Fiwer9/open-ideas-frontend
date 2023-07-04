
import {AxiosRequestConfig, AxiosResponse} from "axios";
import $api from "../http";
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async sendCode(email: string): Promise<AxiosResponse<AuthResponse>> {
        const headers: AxiosRequestConfig["headers"] = {
            "X-CSRFToken": 'lDaRf6cCiup80wzwWYmHNrJLUR2ichMn',
        };

        return $api.post<AuthResponse>('/auth/login/', {email}, {headers})
    }

    static async confirmEmail( codeStr: string): Promise<AxiosResponse<AuthResponse>> {
        const code = Number(codeStr)
        const headers: AxiosRequestConfig["headers"] = {
            "X-CSRFToken": 'lDaRf6cCiup80wzwWYmHNrJLUR2ichMn',
        };
        return $api.post<AuthResponse>(`/auth/token/${code}/`, { code }, {headers});
    }

    static async logout() {
        return $api.post<AuthResponse>('/auth/logout/')
    }
}
