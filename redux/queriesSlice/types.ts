import { QueriesResponse } from "../../models/response/QueriesResponse";
import { DetailType } from "../../models/response/ResponseInterface";

export type FetchQueriesArgs = {
  user_id?: number;
};

export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
  WAITING = "waiting",
}

export interface QueriesSliceState {
  items: QueriesResponse[];
  status: Status;
  detail: DetailType;
}

export interface FetchQueriesByNameArgs {
  value: string;
}
