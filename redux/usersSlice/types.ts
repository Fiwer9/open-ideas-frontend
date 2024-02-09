import { Status } from "../queriesSlice/types";
import { DetailType } from "../../models/response/ResponseInterface";
import { UserResponse } from "../../models/response/UserResponse";
import { UsersUpdateResponse } from "../../models/response/UsersUpdateResponse";

export interface UsersSliceState {
  users: UserResponse[] | UserResponse;
  usersUpdate: UsersUpdateResponse[] | UsersUpdateResponse;
  status: Status;
  detail: DetailType;
}

export type FetchUsersArgs = {
  user_id: number;
};
