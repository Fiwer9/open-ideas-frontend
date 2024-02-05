import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import OrganizationsService from "../../services/OrganizationsService";
import { IDepartment } from "../../models/IDepartment";
import { FetchDepartmentsArgs } from "./types";

export const fetchOrganizations = createAsyncThunk<OrganizationsResponse[]>(
  "organizations/fetchOrganizations",
  async () => {
    const { data } = await OrganizationsService.getOrganizations();
    return data;
  }
);

export const fetchDepartments = createAsyncThunk<
  IDepartment[],
  FetchDepartmentsArgs
>("organizations/fetchDepartments", async ({ organization_id }) => {
  const { data } = await OrganizationsService.getDepartments(organization_id);
  return data;
});
