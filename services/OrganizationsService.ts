import $api from "../http";
import {AxiosResponse} from "axios";
import {OrganizationsResponse} from "../models/response/OrganizationsResponse";

export default class OrganizationsService {
    static async getOrganizations():Promise<AxiosResponse<OrganizationsResponse[]>> {
        return $api.get('/organizations/organizations/');
    }
}
