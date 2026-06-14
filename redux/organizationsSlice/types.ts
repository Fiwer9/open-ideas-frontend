import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import { Status } from "../queriesSlice/types";
import { IDepartment } from "../../models/IDepartment";
import { DetailType } from "../../models/response/ResponseInterface";

export type OrganizationsSliceState = {
  organizations: OrganizationsResponse[] | OrganizationsResponse;
  departments: IDepartment[];
  status: Status;
  detail: DetailType | string;
};

export type FetchDepartmentsArgs = {
  organization_id?: number;
};

export type FetchOrganizationByIdArgs = {
  organization_id: number;
};
