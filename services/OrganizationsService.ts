import $api from "../http";
import { AxiosResponse } from "axios";
import { OrganizationsResponse } from "../models/response/OrganizationsResponse";
import { IDepartment } from "../models/IDepartment";
import { ResponseInterface } from "../models/response/ResponseInterface";

export default class OrganizationsService {
  static async getOrganizations(): Promise<
    AxiosResponse<ResponseInterface<OrganizationsResponse[]>>
  > {
    return $api.get("/organizations/organizations/");
  }
  static async getOrganizationsById(
    id: number
  ): Promise<AxiosResponse<OrganizationsResponse[]>> {
    return $api.get(`/organizations/organizations/${id}`);
  }

  static async getDepartments(
    organization_id: number
  ): Promise<AxiosResponse<ResponseInterface<IDepartment[]>>> {
    return $api.get(
      `/organizations/departments/?organization=${organization_id}`
    );
  }
}
