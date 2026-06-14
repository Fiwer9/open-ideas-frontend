import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { UserResponse } from "../../models/response/UserResponse";
import UsersService from "../../services/UsersService";
import {
  FetchUsersArgs,
  FetchUsersByNameArgs,
  PatchLikesArgs,
  PatchUserArgs,
} from "./types";
import LikesService from "../../services/LikesService";
import { LikesResponse } from "../../models/response/LikesResponse";

export const fetchCurrentUser = createAsyncThunk<
  ResponseInterface<UserResponse>,
  FetchUsersArgs
>("users/fetchCurrentUser", async ({ user_id }) => {
  const { data } = await UsersService.getCurrentUser(Number(user_id));
  return data;
});

export const fetchUsers = createAsyncThunk<ResponseInterface<UserResponse[]>>(
  "users/fetchUsers",
  async () => {
    const { data } = await UsersService.getUsers();
    return data;
  }
);

export const fetchUsersByName = createAsyncThunk<
  ResponseInterface<UserResponse[]>,
  FetchUsersByNameArgs
>("users/fetchUsersByName", async ({ value }) => {
  const { data } = await UsersService.getUsersByName(value);
  return data;
});

export const patchLikes = createAsyncThunk<
  ResponseInterface<LikesResponse>,
  PatchLikesArgs
>("users/patchLikes", async ({ userId, likedQueries }) => {
  const { data } = await LikesService.patchLike(userId, likedQueries);
  return data;
});

export const patchUser = createAsyncThunk<
  ResponseInterface<UserResponse>,
  PatchUserArgs
>("users/patchUser", async (props) => {
  const { data } = await UsersService.patchUser(props);
  return data;
});
