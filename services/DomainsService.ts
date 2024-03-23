import $api from "../http";
import { AxiosResponse } from "axios";
import { DomainsResponse } from "../models/response/DomainsResponse";
import { ResponseInterface } from "../models/response/ResponseInterface";

export default class DomainsService {
  static async getDomains(): Promise<
    AxiosResponse<ResponseInterface<DomainsResponse[]>>
  > {
    return $api.get("/domain/domains/");
  }

  static async deleteDomain(id: number): Promise<void> {
    return $api.delete(`/domain/domains/${id}`);
  }

  static postDomain(
    domain: string,
  ): Promise<AxiosResponse<ResponseInterface<DomainsResponse>>> {
    return $api.post(`/domain/domains/`, { domain });
  }

  static putDomain(id: number, domain: string) {
    return $api.put(`/domain/domains/${id}/`, { domain });
  }
}
