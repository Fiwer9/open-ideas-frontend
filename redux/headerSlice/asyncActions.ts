import { createAsyncThunk } from "@reduxjs/toolkit";

import { IDepartment } from "../../models/IDepartment";
import { UserResponse } from "../../models/response/UserResponse";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import { formatAccountDisplayName } from "../../utils/formatAccountDisplayName";
import { resolveUserId } from "../../utils/resolveUserId";
import { unwrapApiResponse } from "../../utils/unwrapApiResponse";
import UsersService from "../../services/UsersService";
import OrganizationsService from "../../services/OrganizationsService";
import { FetchUsersArgs } from "../usersSlice/types";
import { AccountHeaderData } from "./types";
import { setUserId } from "../authSlice/slice";
import { RootState } from "../store";

const resolveDepartment = async (
  department: IDepartment | number | null | undefined
): Promise<IDepartment | null> => {
  if (typeof department === "object" && department !== null) {
    return department;
  }

  if (typeof department === "number" && department > 0) {
    const { data: responsePayload } =
      await OrganizationsService.getDepartmentById(department);
    const { data: departmentData, error } =
      unwrapApiResponse<IDepartment>(responsePayload);

    if (error || !departmentData) {
      return null;
    }

    return departmentData;
  }

  return null;
};

export const fetchAccountHeader = createAsyncThunk<
  AccountHeaderData,
  FetchUsersArgs,
  { state: RootState }
>("header/fetchAccountHeader", async ({ user_id }, { rejectWithValue, dispatch, getState }) => {
  const authUser = getState().auth.user;
  const resolvedId = await resolveUserId(user_id, String(authUser.email ?? ""));

  if (!resolvedId) {
    return rejectWithValue("User id is missing");
  }

  if (Number(authUser.user_id) !== resolvedId) {
    dispatch(setUserId(resolvedId));
  }

  const { data: userResponsePayload } =
    await UsersService.getCurrentUser(resolvedId);
  const { data: user, error: userError } = unwrapApiResponse<UserResponse>(
    userResponsePayload
  );

  if (userError || !user) {
    return rejectWithValue(userError ?? "Failed to load user profile");
  }

  const department = await resolveDepartment(
    user.department as IDepartment | number
  );
  let organization = "";

  if (department?.organization) {
    const { data: orgResponsePayload } =
      await OrganizationsService.getOrganizationsById(department.organization);
    const { data: orgData, error: orgError } =
      unwrapApiResponse<OrganizationsResponse>(orgResponsePayload);

    if (!orgError && orgData?.name) {
      organization = orgData.name;
    }
  }

  return {
    userName: formatAccountDisplayName(user.name) || user.name || "",
    department: department?.name ?? "",
    organization,
    organizationId: department?.organization ?? 0,
  };
});

export const fetchUserHeader = fetchAccountHeader;
