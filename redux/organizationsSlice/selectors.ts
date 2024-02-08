import { RootState } from "../store";

export const selectOrganizations = (state: RootState) =>
  state.organizations.organizations;

export const selectDepartments = (state: RootState) =>
  state.organizations.departments;

export const selectDetail = (state: RootState) => state.organizations.detail;

export const selectOrgStatus = (state: RootState) => state.organizations.status;
