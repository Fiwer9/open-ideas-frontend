import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { UsersUpdateResponse } from "../../models/response/UsersUpdateResponse";
import { FetchUsersArgs } from "../usersSlice/types";
import UsersService from "../../services/UsersService";

export const fetchUserIsStaff = createAsyncThunk<
  ResponseInterface<UsersUpdateResponse>,
  FetchUsersArgs
>("menu/fetchUserIsStaff", async ({ user_id }) => {
  const { data } = await UsersService.getCurrentUpdateUser(user_id);
  return data;
});
