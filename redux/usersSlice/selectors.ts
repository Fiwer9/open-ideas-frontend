import { RootState } from "../store";

export const selectUser = (state: RootState) => state.users.user;

export const selectUsers = (state: RootState) => state.users.users;

export const selectUsersStatus = (state: RootState) => state.users.status;
