import $api from "../http";
import {AxiosResponse} from "axios";
import {SettingsResponse} from "../models/response/SettingsResponse";

export default class SettingsService {
    static async getSettings():Promise<AxiosResponse<SettingsResponse[]>> {
        return $api.get('/settings/');
    }

    static putSettings(id: number, allow_file_attachment: boolean, max_file_size: number, max_files_attached: number, anonymous_status: boolean): Promise<AxiosResponse<SettingsResponse>> {
        return $api.put(`/settings/${id}/`, {allow_file_attachment, max_file_size, max_files_attached, anonymous_status})
    }
}
