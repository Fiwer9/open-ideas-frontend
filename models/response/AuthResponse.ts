import {IUser} from "../IUser";

export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: IUser;
    email: string;
    id: string;
}
