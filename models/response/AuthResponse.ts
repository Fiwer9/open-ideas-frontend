import {IUser} from "../IUser";

export interface AuthResponse {
    user: IUser;
    email: string;
    _auth_user_id: string;
    id: string;
    sessionid: string;
    _csrftoken: string;
}
