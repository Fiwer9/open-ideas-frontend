import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/LoginService";
import CommentService from "../services/CommentService";
import LikesService from "../services/LikesService";
import QueriesService from "../services/QueriesService";
import UsersService from "../services/UsersService";
import SettingsService from "../services/SettingsSetvice";
import axios from "axios";
import {TokenResponse} from "../models/response/AuthResponse";
import {API_URL_TOKEN} from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isAnonymous = false;
    isAllowFileAttachment = false;
    maxFileSize: number = 1024;
    maxFilesAttached: number = 5;

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
            sessionStorage.setItem('email', response.data.email);
            this.setAuth(false);
            this.setUser(response.data.user);
        } catch (e: any) {
            return e.response.data.email
        }
    }

    async postAuthorization (username: string, password: string) {
        try {
            const response = await AuthService.postAuthorization(username, password);
            const user = {
                user_id : response.data.user_id,
                email: response.data.email,
                token_access : response.data.jwt_access,
                token_refresh: response.data.jwt_refresh
            }
            sessionStorage.setItem('token_access', user.token_access)
            sessionStorage.setItem('token_refresh', user.token_refresh)
            sessionStorage.setItem('user', JSON.stringify(user))
            sessionStorage.setItem('user_id', String(user.user_id))
            this.setAuth(true);
        } catch (e: any) {
            console.log(e)
            return e.response.data.detail
        }
    }

    async postQuery(date: string, name: string, description: string, initiative_direction: number, status: string,
                    implementation_effect: string, organization: number, initiator_users: [number]){
        try {
            await QueriesService.postQuery(date, name, description, initiative_direction, status,
                implementation_effect, organization, initiator_users);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async patchQuery(date: string, name: string, description: string, initiative_direction: number, status: string,
                     implementation_effect: string, organization: number, initiator_users: [number], id: number, expertUsers?: number[]) {
        try {
            expertUsers ? await QueriesService.patchQuery(date, name, description, initiative_direction, status,
                implementation_effect, organization, initiator_users, id, expertUsers) : await QueriesService.patchQuery(date, name, description, initiative_direction, status,
              implementation_effect, organization, initiator_users, id)
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async putUserUpdate(name: string, email: string, is_verified: boolean, is_active: boolean, is_staff: boolean, is_superuser: boolean, id: number) {
        try {
            await UsersService.putUserUpdate(name, email, is_verified, is_staff, is_superuser, id, is_active)
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async deleteQuery(id: number) {
        try {
            await QueriesService.deleteQuery(id)
        } catch (e: any) {
            console.error(e.response?.data?.message);
        }
    }

    async sendComment(comment: string, query: number, user: number) {
        try {
            await CommentService.sendComment(comment, query, user);
        } catch (e: any) {
            console.error(e.response?.data?.message);
        }
    }

    async patchLike(id: number, data: any) {
        try {
            await LikesService.patchLike(id, data);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async confirmEmail(code: string) {
        try {
            const response = await AuthService.confirmEmail(code);
            const user = {user_id: response.data.user_id}
            sessionStorage.setItem('user_id', user.user_id)
            this.setAuth(true);
            this.setUser(response.data.user);
            return response.data
        } catch (e: any) {
            return e.response.data.detail
        }
    }

    async putRegistration(name: string, department: number) {
        try {
            await AuthService.putRegistration(name, department);
        } catch (e: any) {
            return e.response.data.detail
        }
    }

    async getSettings() {
        try {
            return await SettingsService.getSettings()
        } catch (e: any) {
            console.error(e)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            sessionStorage.removeItem('user_id');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async postRegistration(email: string, password: string) {
        try {
            const response = await AuthService.postRegistration(email, password);
            const user = {
                user_id : response.data.user_id,
                email: response.data.email,
                token_access : response.data.jwt_access,
                token_refresh: response.data.jwt_refresh
            }
            sessionStorage.setItem('token_access', user.token_access)
            sessionStorage.setItem('token_refresh', user.token_refresh)
            sessionStorage.setItem('user', JSON.stringify(user))
            sessionStorage.setItem('user_id', String(user.user_id))
            this.setAuth(true)
        }
        catch (e: any) {
            return e.response.data.detail
        }
    }

    async checkAuth() {
        const refresh = sessionStorage.getItem('token_refresh')
        try {
            const response = await axios.post<TokenResponse>(`${API_URL_TOKEN}/token/refresh/`, {refresh}, {withCredentials: true})
            localStorage.setItem('token_access', response.data.access)
            this.setAuth(true)
        } catch (e) {
            console.error(e.response.data.message)
        }
    }
}
