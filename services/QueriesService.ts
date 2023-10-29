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
        return $api.post(`/queries/queries/`, {date, name, description, initiative_direction, status,
            implementation_effect, organization, initiator_users});
    }

    static async patchQuery(date: string, name: string, description: string, initiative_direction: string, status: string,
                           implementation_effect: string, organization: number, initiator_users: [number], id: number, expertUsers? : number[]):Promise<AxiosResponse> {
        return expertUsers ?  $api.patch(`/queries/queries/${id}/`, {date, name, description, initiative_direction, status,
            implementation_effect, organization, initiator_users, expertUsers})
          : $api.patch(`/queries/queries/${id}/`, {date, name, description, initiative_direction, status,
            implementation_effect, organization, initiator_users});
    }
}
