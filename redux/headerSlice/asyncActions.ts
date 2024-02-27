import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { UserResponse } from "../../models/response/UserResponse";
import { FetchUsersArgs } from "../usersSlice/types";
import UsersService from "../../services/UsersService";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import { FetchOrganizationByIdArgs } from "../organizationsSlice/types";
import OrganizationsService from "../../services/OrganizationsService";

export const fetchUserHeader = createAsyncThunk<
  ResponseInterface<UserResponse>,
  FetchUsersArgs
>("header/fetchCurrentUserForHeader", async ({ user_id }) => {
  const { data } = await UsersService.getCurrentUser(user_id);
  return data;
});

export const fetchOrganizationHeader = createAsyncThunk<
  ResponseInterface<OrganizationsResponse>,
  FetchOrganizationByIdArgs
>("header/fetchOrganizationByIdForHeader", async ({ organization_id }) => {
  const { data } = await OrganizationsService.getOrganizationsById(
    organization_id
  );
  return data;
});
