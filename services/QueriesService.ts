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

    static async postQuery(date: string, name: string, description: string, initiative_direction: string, status: string,
                           implementation_effect: string, organization: number, initiator_users: [number]):Promise<AxiosResponse> {
        console.log(organization)
        return $api.post(`/queries/queries/`, {date, name, description, initiative_direction, status,
            implementation_effect, organization, initiator_users});
    }
}
