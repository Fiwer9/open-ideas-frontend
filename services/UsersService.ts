import $api from "../http";
import {AxiosResponse} from "axios";
import {UserResponse} from "../models/response/UserResponse";
import {UsersUpdateResponse} from "../models/response/UsersUpdateResponse";

export default class UsersService {
    static async getUsers():Promise<AxiosResponse<UserResponse[]>> {
        return $api.get('/users/users/');
    }

    static async getUsersUpdate():Promise<AxiosResponse<UsersUpdateResponse[]>> {
        return $api.get('/users/update/');
    }

    static async getCurrentUser(id: number):Promise<AxiosResponse<UserResponse>> {
        return $api.get(`/users/users/${id}`)
    }

    static async getCurrentUpdateUser(id: number):Promise<AxiosResponse<UsersUpdateResponse>> {
        return $api.get(`/users/update/${id}`)
    }
}
