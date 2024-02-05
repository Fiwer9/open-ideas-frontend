import { RootState } from "../store";

export const selectOrganizations = (state: RootState) =>
  state.organizations.organizations;

export const selectDepartments = (state: RootState) =>
  state.organizations.departments;
