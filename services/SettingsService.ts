import $api from "../http";
import {AxiosResponse} from "axios";
import {SettingsRespone} from "../models/response/SettingsRespone";

export default class SettingsService {
    static async getSettings():Promise<AxiosResponse<SettingsRespone[]>> {
        return $api.get('/settings/');
    }

    static async postSettings(allow_file_attachment?: boolean | undefined, max_file_size?: number | undefined, max_files_attached?: number | undefined, anonymous_status?: boolean): Promise<AxiosResponse<SettingsRespone>> {
        return $api.post('/settings/', {allow_file_attachment, max_file_size, max_files_attached, anonymous_status})
    }

    static async putSettings(id: number, allow_file_attachment?: boolean, max_file_size?: number, max_files_attached?: number, anonymous_status?: boolean): Promise<AxiosResponse<SettingsRespone>> {
        return $api.put(`/settings/${id}/`, {allow_file_attachment, max_file_size, max_files_attached, anonymous_status})
    }
}
