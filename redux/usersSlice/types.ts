import { Status } from "../queriesSlice/types";
import { DetailType } from "../../models/response/ResponseInterface";
import { UserResponse } from "../../models/response/UserResponse";
import { IDepartment } from "../../models/IDepartment";

export interface UsersSliceState {
  users: UserResponse[];
  user?: UserResponse;
  status: Status;
  detail: DetailType;
}

export type FetchUsersArgs = {
  user_id: string | number;
};

export type PatchLikesArgs = {
  userId: number;
  likedQueries: number[];
};

export type FetchUsersByNameArgs = {
  value: string;
};

export type PatchUserArgs = {
  id: number;
  name: string;
  email: string;
  department: IDepartment;
  is_verified: boolean;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
};
