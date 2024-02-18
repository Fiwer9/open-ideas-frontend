import { IDepartment } from "../IDepartment";

export interface UsersUpdateResponse {
  is_staff: boolean;
  email: string;
  id: number;
  name: string;
  department: number;
  likes: number[];
}
