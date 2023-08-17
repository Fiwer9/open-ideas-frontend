import $api from "../http";
import {AxiosResponse} from "axios";
import {OrganizationsResponse} from "../models/response/OrganizationsResponse";
import {IDepartment} from "../models/IDepartment";

export default class OrganizationsService {
    static async getOrganizations():Promise<AxiosResponse<OrganizationsResponse[]>> {
        return $api.get('/organizations/organizations/');
    }

    static async getDepartments():Promise<AxiosResponse<IDepartment[]>> {
        return $api.get('/organizations/departments/')
    }
}
