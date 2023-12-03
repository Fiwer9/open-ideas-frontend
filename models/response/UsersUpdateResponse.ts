import {IDepartment} from "../IDepartment";

export interface UsersUpdateResponse {
  email: string;
  id: number;
  name: string;
  department: IDepartment;
  likes: number[];
}
