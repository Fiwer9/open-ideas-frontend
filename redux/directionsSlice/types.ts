import { DirectionResponse } from "../../models/response/DirectionResponse";
import { Status } from "../queriesSlice/types";
import { DetailType } from "../../models/response/ResponseInterface";

export interface DirectionsSliceState {
  items: DirectionResponse[];
  item: DirectionResponse;
  status: Status;
  detail: DetailType;
}

export interface PostDirectionArgs {
  name: string;
  description: string;
  experts: number[];
}

export interface PatchDirectionArgs {
  id: number;
  name: string;
  description: string;
  experts: number[];
}