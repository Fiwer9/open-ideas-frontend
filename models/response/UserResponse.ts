import { IDepartment } from "../IDepartment";
import { QueriesResponse } from "./QueriesResponse";

interface IGroup {
  id: number;
  name: string;
  permissions: number[];
}

export interface UserResponse {
  id: number;
  is_verified: boolean;
  name: string;
  email: string;
  department: IDepartment;
  likes: QueriesResponse[];
}
