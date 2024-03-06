import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { FetchUsersArgs } from "../usersSlice/types";
import UsersService from "../../services/UsersService";
import { UserResponse } from "../../models/response/UserResponse";

export const fetchUserIsStaff = createAsyncThunk<
  ResponseInterface<UserResponse>,
  FetchUsersArgs
>("menu/fetchUserIsStaff", async ({ user_id }) => {
  const { data } = await UsersService.getCurrentUser(user_id);
  return data;
});
