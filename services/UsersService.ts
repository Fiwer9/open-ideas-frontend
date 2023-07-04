import $api from "../http";
import {AxiosResponse} from "axios";
import {UserResponse} from "../models/response/UserResponse";

export default class UsersService {
    static async getUsers():Promise<AxiosResponse<UserResponse[]>> {
        return $api.get('/users/users/');
    }
}
