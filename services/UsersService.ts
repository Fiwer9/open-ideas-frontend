import $api from "../http";
import { AxiosResponse } from "axios";
import { UserResponse } from "../models/response/UserResponse";
import { ResponseInterface } from "../models/response/ResponseInterface";
import { PatchUserArgs } from "../redux/usersSlice/types";

export default class UsersService {
  static async getUsers(): Promise<
    AxiosResponse<ResponseInterface<UserResponse[]>>
  > {
    return $api.get("/users/users/");
  }

  static async getUsersByName(
    value: string
  ): Promise<AxiosResponse<ResponseInterface<UserResponse[]>>> {
    return $api.get(`/users/users?search=${value}`);
  }

  static async getCurrentUser(
    id: number | string
  ): Promise<AxiosResponse<ResponseInterface<UserResponse>>> {
    return $api.get(`/users/users/${id}/`);
  }
  static async patchUser(props: PatchUserArgs) {
    return $api.patch(`/users/users/${props.id}/`, { ...props });
  }
}
