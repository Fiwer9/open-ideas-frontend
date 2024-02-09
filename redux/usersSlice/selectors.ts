import { RootState } from "../store";
import { UserResponse } from "../../models/response/UserResponse";
import { UsersUpdateResponse } from "../../models/response/UsersUpdateResponse";

export const selectUser = (state: RootState) =>
  state.users.users as UserResponse;

export const selectUsers = (state: RootState) =>
  state.users.users as UserResponse[];

export const selectUpdateUser = (state: RootState) =>
  state.users.usersUpdate as UsersUpdateResponse;

export const selectUpdateUsers = (state: RootState) =>
  state.users.usersUpdate as UsersUpdateResponse[];
