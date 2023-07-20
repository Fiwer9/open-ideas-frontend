import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/LoginService";
import CommentService from "../services/CommentService";
import LikesService from "../services/LikesService";
import QueriesService from "../services/QueriesService";

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
            return e.response.data.email
        }
    }

    async postQuery(date: string, name: string, description: string, initiative_direction: string, status: string,
                    implementation_effect: string, organization: number, initiator_users: [number]){
        try {
            const response = await QueriesService.postQuery(date, name, description, initiative_direction, status,
                implementation_effect, organization, initiator_users);
            console.log(response);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async patchQuery(date: string, name: string, description: string, initiative_direction: string, status: string,
                     implementation_effect: string, organization: number, initiator_users: [number], id: number) {
        try {
            const response = await QueriesService.patchQuery(date, name, description, initiative_direction, status,
                implementation_effect, organization, initiator_users, id);
            console.log(response);
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

    async patchLike(id: number, data: any) {
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
            return e.response.data.detail
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
}
