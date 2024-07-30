import $api from "../http";
import {AxiosResponse} from "axios";
import {ResponseInterface} from "../models/response/ResponseInterface";
import {FilesResponse} from "../models/response/FilesResponse";

export default class FilesService {
    static async sendFiles(
        formFileData: FormData
    ): Promise<AxiosResponse<ResponseInterface<FilesResponse>>> {
        return $api.post("/queries/files/", formFileData);
    }

    static async getFiles(): Promise<AxiosResponse<ResponseInterface<FilesResponse[]>>> {
        return $api.get("/queries/files/")
    }
}