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
  items: QueriesResponse[] | QueriesResponse;
  status: Status;
  detail: DetailType;
}

export interface FetchQueriesByNameArgs {
  value: string;
}

export interface FetchQueriesByIdArgs {
  id: string;
}

export interface PatchQueryArgs {
  date: string;
  name: string;
  description: string;
  initiative_direction: number;
  status: string;
  implementation_effect: string;
  organization: number;
  initiator_users: [number];
  id: number;
}
