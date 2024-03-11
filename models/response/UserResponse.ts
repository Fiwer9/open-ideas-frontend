import { IDepartment } from "../IDepartment";

interface IGroup {
  id: number;
  name: string;
  permissions: number[];
}

export interface UserResponse {
  is_staff: boolean;
  email: string;
  id: number;
  name: string;
  department: IDepartment;
  likes: number[];
  is_verified: boolean;
  is_active: boolean;
  is_superuser: boolean;
}
