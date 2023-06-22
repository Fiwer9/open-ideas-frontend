
import {AxiosResponse} from "axios";
import $api from "../http";
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async sendCode(email: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login/', {email})
    }

    static currentEmailID = '';

    static setCurrentEmailID(id: string) {
        this.currentEmailID = id;
    }

    static async confirmEmail( codeStr: string): Promise<AxiosResponse<AuthResponse>> {
        const code = Number(codeStr)
        return $api.post<AuthResponse>(`/auth/token/${code}/`, { code });
    }

    static async logout() {
        return $api.post<AuthResponse>('/auth/logout/')
    }
}
