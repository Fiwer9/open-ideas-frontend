import {IDepartment} from "../IDepartment";

export interface UsersUpdateResponse {
  organization: string;
  email: string;
  id: number;
  name: string;
  department: IDepartment;
  likes: number[];
}
