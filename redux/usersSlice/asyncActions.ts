import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { UserResponse } from "../../models/response/UserResponse";
import UsersService from "../../services/UsersService";
import { FetchUsersArgs, PatchLikesArgs } from "./types";
import { UsersUpdateResponse } from "../../models/response/UsersUpdateResponse";
import LikesService from "../../services/LikesService";
import { LikesResponse } from "../../models/response/LikesResponse";

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
>("users/fetchUpdateUsers", async () => {
  const { data } = await UsersService.getUsersUpdate();
  return data;
});

export const patchLikes = createAsyncThunk<
  ResponseInterface<LikesResponse>,
  PatchLikesArgs
>("users/patchLikes", async ({ userId, likedQueries }) => {
  const { data } = await LikesService.patchLike(userId, likedQueries);
  console.log(data)
  return data;
});
