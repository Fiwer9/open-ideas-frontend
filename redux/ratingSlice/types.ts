import { DetailType } from "../../models/response/ResponseInterface";
import { EmployeeRecord } from "../../components/ratingComponents/ratingTypes";
import { Status } from "../queriesSlice/types";

export type FetchRatingArgs = {
  search?: string;
  rank?: number;
  organization_id?: number;
  organization_name?: string;
  department_id?: number;
  department_name?: string;
  start_date?: string;
  end_date?: string;
  period?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
};

export interface RatingSliceState {
  employees: EmployeeRecord[];
  status: Status;
  detail: DetailType;
  totalCount: number;
  errorMessage: string | null;
}
