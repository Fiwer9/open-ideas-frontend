import { DetailType } from "../../models/response/ResponseInterface";
import { Status } from "../queriesSlice/types";

export interface HeaderSliceState {
  userName: string;
  organization: string;
  department: string;
  organizationId: number;
  detail: DetailType;
  status: Status;
}
