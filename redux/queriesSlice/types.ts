import { QueriesResponse } from "../../models/response/QueriesResponse";

export type FetchFamousArgs = {
  user_id?: number;
};

export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export interface QueriesSliceState {
  queries: QueriesResponse[];
  status: Status;
}
