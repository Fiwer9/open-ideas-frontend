
import {AxiosResponse} from "axios";
import $api from "../../http";
import {AuthResponse} from "../../models/response/AuthResponse";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class AuthService {
    static async sendCode(email: string): Promise<AxiosResponse<AuthResponse>> {
        console.log(cookies)
        return $api(
            {
                method: 'post',
                url: '/auth/login/',
                data: email,
                headers: {
                    'X-CSRFToken': cookies.get('csrftoken'),
                }
            }
        )
    }

    static async confirmEmail( codeStr: string): Promise<AxiosResponse<AuthResponse>> {
        const code = Number(codeStr)
        return $api.post<AuthResponse>(`/auth/token/${code}/`, { code });
    }

    static async logout() {
        return $api.post<AuthResponse>('/auth/logout/')
    }
}
