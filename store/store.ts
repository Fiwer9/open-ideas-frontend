import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import AuthService from "../services/LoginService";
import CommentService from "../services/CommentService";
import LikesService from "../services/LikesService";

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
        try {
            const response = await AuthService.sendCode(email);
            console.log(response);
            sessionStorage.setItem('email', response.data.email);
            this.setAuth(false);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async sendComment(comment: string, query: number, user: number) {
        try {
            const response = await CommentService.sendComment(comment, query, user);
            console.log(response);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async patchLike(id: number, data: [number]) {
        try {
            const response = await LikesService.patchLike(id, data);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async confirmEmail(code: string) {
        try {
            const response = await AuthService.confirmEmail(code);
            console.log(response);
            const user = {user_id: response.data.user_id}
            sessionStorage.setItem('user_id', user.user_id)
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
            sessionStorage.removeItem('user_id');
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
            sessionStorage.setItem('user_id', response.data.user_id)
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
}
