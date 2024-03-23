import $api from "../http";
import { AxiosResponse } from "axios";
import { ResponseInterface } from "../models/response/ResponseInterface";
import { SettingsResponse } from "../models/response/SettingsResponse";

export default class SettingsService {
  static async getSettings(): Promise<
    AxiosResponse<ResponseInterface<SettingsResponse[]>>
  > {
    return $api.get("/settings/");
  }

  static async postSettings(
    allow_file_attachment?: boolean | undefined,
    max_file_size?: number | undefined,
    max_files_attached?: number | undefined,
    anonymous_status?: boolean,
  ): Promise<AxiosResponse<ResponseInterface<SettingsResponse>>> {
    return $api.post("/settings/", {
      allow_file_attachment,
      max_file_size,
      max_files_attached,
      anonymous_status,
    });
  }

  static async putSettings(
    id: number,
    allow_file_attachment?: boolean,
    max_file_size?: number,
    max_files_attached?: number,
    anonymous_status?: boolean,
  ): Promise<AxiosResponse<ResponseInterface<SettingsResponse>>> {
    return $api.put(`/settings/${id}/`, {
      allow_file_attachment,
      max_file_size,
      max_files_attached,
      anonymous_status,
    });
  }
}
