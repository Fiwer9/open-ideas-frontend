import { DomainsResponse } from "../../models/response/DomainsResponse";
import { SettingsResponse } from "../../models/response/SettingsResponse";
import { DetailType } from "../../models/response/ResponseInterface";
import { Status } from "../queriesSlice/types";

export interface SettingsSliceState {
  domains: DomainsResponse[];
  settings: SettingsResponse;
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
