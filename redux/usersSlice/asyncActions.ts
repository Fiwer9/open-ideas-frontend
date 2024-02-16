import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { UserResponse } from "../../models/response/UserResponse";
import UsersService from "../../services/UsersService";
import { FetchUsersArgs } from "./types";
import { UsersUpdateResponse } from "../../models/response/UsersUpdateResponse";

export const fetchCurrentUser = createAsyncThunk<
  ResponseInterface<UserResponse>,
  FetchUsersArgs
>("users/fetchCurrentUser", async ({ user_id }) => {
  const { data } = await UsersService.getCurrentUser(user_id);
  return data;
});

export const fetchCurrentUpdateUser = createAsyncThunk<
  ResponseInterface<UsersUpdateResponse>,
  FetchUsersArgs
>("users/fetchCurrentUpdateUser", async ({ user_id }) => {
  const { data } = await UsersService.getCurrentUpdateUser(user_id);
  return data;
});

export const fetchUpdateUsers = createAsyncThunk<
  ResponseInterface<UsersUpdateResponse[]>
>("users/fetchUpdateUser", async () => {
  const { data } = await UsersService.getUsersUpdate();
  return data;
});
