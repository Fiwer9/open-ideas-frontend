export interface UsersUpdateResponse {
  is_staff: boolean;
  email: string;
  id: number;
  name: string;
  department: number;
  likes: number[];
  is_verified: boolean;
  is_active: boolean;
  is_superuser: boolean;
}
