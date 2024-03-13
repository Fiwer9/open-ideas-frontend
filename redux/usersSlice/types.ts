import { Status } from "../queriesSlice/types";
import { DetailType } from "../../models/response/ResponseInterface";
import { UserResponse } from "../../models/response/UserResponse";

export interface UsersSliceState {
  users: UserResponse[];
  user?: UserResponse;
  status: Status;
  detail: DetailType;
}

export type FetchUsersArgs = {
  user_id: number;
};

export type PatchLikesArgs = {
  userId: number;
  likedQueries: number[];
};
