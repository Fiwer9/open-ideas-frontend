import {IDepartment} from "../IDepartment";
import {QueriesResponse} from "./QueriesResponse";

interface IGroup {
    id: number;
    name: string;
    permissions: number[];
}

export interface UserResponse {
    id: number;
    password: string;
    last_login: string;
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    name: string;
    email: string;
    department: IDepartment;
    groups: IGroup[];
    user_permissions: [];
    likes: QueriesResponse[];
}
