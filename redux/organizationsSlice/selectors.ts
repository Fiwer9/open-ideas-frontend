import { RootState } from "../store";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";

export const selectOrganizations = (state: RootState) =>
  state.organizations.organizations as OrganizationsResponse[];

export const selectDepartments = (state: RootState) =>
  state.organizations.departments;

export const selectDetail = (state: RootState) => state.organizations.detail;

export const selectOrgStatus = (state: RootState) => state.organizations.status;

export const selectOrganization = (state: RootState) =>
  state.organizations.organizations as OrganizationsResponse;
