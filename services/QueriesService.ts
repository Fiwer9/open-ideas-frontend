import $api from "../http";
import {QueriesResponse} from "../models/response/QueriesResponse";
import {AxiosResponse} from "axios";

export default class QueriesService {
    static async getQueriesTableData(userId?: number):Promise<AxiosResponse<QueriesResponse[]>> {
        return userId? $api.get(`/queries/queries/?expert_users=${userId}`) : $api.get(`/queries/queries/`);
    }
    static async getQueriesTableDataById(id: string):Promise<AxiosResponse<QueriesResponse>> {
        return $api.get(`/queries/queries/${id}/`);
    }

    static async postQuery(date: string, name: string, description: string, initiative_direction: string, status: string,
                           implementation_effect: string, organization: number, initiator_users: [number]):Promise<AxiosResponse> {
        return $api.post(`/queries/queries/`, {date, name, description, initiative_direction, status,
            implementation_effect, organization, initiator_users});
    }

    static async patchQuery(date: string, name: string, description: string, initiative_direction: string, status: string,
                           implementation_effect: string, organization: number, initiator_users: [number], id: number, expert_users? : number[]):Promise<AxiosResponse> {
        return expert_users ?  $api.patch(`/queries/queries/${id}/`, {date, name, description, initiative_direction, status,
            implementation_effect, organization, initiator_users, expert_users})
          : $api.patch(`/queries/queries/${id}/`, {date, name, description, initiative_direction, status,
            implementation_effect, organization, initiator_users, });
    }

    static async deleteQuery(id: number):Promise<AxiosResponse> {
        return $api.delete(`/queries/queries/${id}/`);
    }
}
