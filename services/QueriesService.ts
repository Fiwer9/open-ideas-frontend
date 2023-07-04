import $api from "../http";
import {QueriesResponse} from "../models/response/QueriesResponse";
import {AxiosResponse} from "axios";

export default class QueriesService {
    static async getQueriesTableData():Promise<AxiosResponse<QueriesResponse[]>> {
        return $api.get(`/queries/queries/`);
    }
    static async getQueriesTableDataById(id= ''):Promise<AxiosResponse<QueriesResponse>> {
        return $api.get(`/queries/queries/${id}/`);
    }
}
