import { DomainsResponse } from "../../models/response/DomainsResponse";
import { SettingsResponse } from "../../models/response/SettingsResponse";
import { DetailType } from "../../models/response/ResponseInterface";
import { Status } from "../queriesSlice/types";

export interface SettingsSliceState {
  domains: DomainsResponse[];
  settings: SettingsResponse | undefined;
  detail: DetailType;
  status: Status;
}

export interface postDomainArgs {
  domain: string;
}

export interface patchDomainArgs {
  id: number | string;
  domain: string;
}

export interface deleteDomainArgs {
  id: number | string;
}

export enum AssignmentSettings {
  MANUAL = "manual",
  DIRECTION = "direction",
  DEPARTMENT = "department",
}

export interface putSettingsArgs {
  id: number;
  allow_file_attachment?: boolean;
  max_file_size?: number;
  max_files_attached?: number;
  anonymous_status?: boolean;
  assignment_settings?: AssignmentSettings;
}
