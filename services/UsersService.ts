import $api from "../http";
import { AxiosResponse } from "axios";
import { UserResponse } from "../models/response/UserResponse";
import { UsersUpdateResponse } from "../models/response/UsersUpdateResponse";
import { ResponseInterface } from "../models/response/ResponseInterface";

export default class UsersService {
  static async getUsers(): Promise<
    AxiosResponse<ResponseInterface<UserResponse[]>>
  > {
    return $api.get("/users/users/");
  }

  static async getUsersUpdate(): Promise<
    AxiosResponse<ResponseInterface<UsersUpdateResponse[]>>
  > {
    return $api.get("/users/update/");
  }

  static async getCurrentUser(
    id: number
  ): Promise<AxiosResponse<ResponseInterface<UserResponse>>> {
    return $api.get(`/users/users/${id}/`);
  }

  static async getCurrentUpdateUser(
    id: number
  ): Promise<AxiosResponse<ResponseInterface<UsersUpdateResponse>>> {
    return $api.get(`/users/update/${id}/`);
  }

  static async putUserUpdate(
    name: string,
    email: string,
    is_verified: boolean,
    is_staff: boolean,
    is_superuser: boolean,
    id: number,
    is_active: boolean
  ) {
    return $api.put(`/users/update/${id}/`, {
      name,
      email,
      is_active,
      is_staff,
      is_superuser,
      is_verified,
    });
  }
}
