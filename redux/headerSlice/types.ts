import { DetailType } from "../../models/response/ResponseInterface";
import { Status } from "../queriesSlice/types";

export interface AccountHeaderData {
  userName: string;
  organization: string;
  department: string;
  organizationId: number;
}

export interface HeaderSliceState extends AccountHeaderData {
  detail: DetailType;
  status: Status;
}
