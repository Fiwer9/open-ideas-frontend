import $api from "../http";
import {AxiosResponse} from "axios";
import {DomainsResponse} from "../models/response/DomainsResponse";

export default class DomainsService {
  static async getDomains():Promise<AxiosResponse<DomainsResponse[]>> {
    return $api.get('/domain/domains/');
  }

  static async deleteDomain(id: number): Promise<void> {
    return $api.delete(`/domain/domains/${id}`);
  }

  static postDomain(domain: string): Promise<AxiosResponse<DomainsResponse>> {
    return $api.post(`/domain/domains/`, {domain})
  }
}
