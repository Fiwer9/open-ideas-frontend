import { IUser } from "../../models/IUser";
import { Status } from "../queriesSlice/types";
import { DetailType } from "../../models/response/ResponseInterface";

export type AuthorizationState = {
  user: IUser;
  status: Status;
  detail: DetailType | string;
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
