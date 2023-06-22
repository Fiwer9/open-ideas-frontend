import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import AuthService from "../services/LoginService";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async sendCode(email: string) {
        console.log(email)
        try {
            const response = await AuthService.sendCode(email);
            console.log(response);
            AuthService.setCurrentEmailID(response.data.id);
            const user = {id: response.data.id, email: response.data.email, token: response.data.token}
            sessionStorage.setItem('user', JSON.stringify(user));
            this.setAuth(false);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async confirmEmail(code: string) {
        try {
            console.log(code)
            const response = await AuthService.confirmEmail(code);
            console.log(response);
            const user = {id: response.data.id, email: response.data.email, token: response.data.token}
            sessionStorage.setItem('token', user.token)
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }


    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response)
            sessionStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/session`, {withCredentials: true})
            console.log(response);
            sessionStorage.setItem('token', response.data.token)
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
}
