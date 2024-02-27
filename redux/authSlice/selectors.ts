import { RootState } from "../store";

export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectDetail = (state: RootState) => state.auth.detail;
