import { IUser } from "../../models/IUser";
import { Status } from "../queriesSlice/slice";

export type AuthorizationState = {
  user: IUser;
  status: Status;
};

export type PostAuthorizationArgs = {
  email: string;
  password: string;
};

export type PostCodeConfirmationArgs = {
  code: string;
};

export type PutRegistrationArgs = {
  name: string;
  departmentId: number;
};
