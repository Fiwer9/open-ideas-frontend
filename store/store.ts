import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/LoginService";
import CommentService from "../services/CommentService";
import LikesService from "../services/LikesService";
import QueriesService from "../services/QueriesService";
import UsersService from "../services/UsersService";

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
            sessionStorage.setItem('email', response.data.email);
            this.setAuth(false);
            this.setUser(response.data.user);
        } catch (e: any) {
            return e.response.data.email
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
}
