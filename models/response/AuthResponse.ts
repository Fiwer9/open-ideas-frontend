import { IUser } from "../IUser";

export interface AuthResponse {
  user: IUser;
  email: string;
  user_id: string;
  id: string;
  sessionid: string;
  _csrftoken: string;
  is_verified: boolean;
}

export interface AuthorizationResponse {
  email: string;
  user_id: number;
  is_verified: boolean;
  jwt_refresh: string;
  jwt_access: string;
}

export interface TokenResponse {
  access: string;
}
