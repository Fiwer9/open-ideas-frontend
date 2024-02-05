import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import { Status } from "../queriesSlice/types";
import { IDepartment } from "../../models/IDepartment";

export type OrganizationsSliceState = {
  organizations: OrganizationsResponse[];
  departments: IDepartment[];
  status: Status;
};

export type FetchDepartmentsArgs = {
  organization_id: number;
};
