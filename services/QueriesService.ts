import $api from "../http";
import { QueriesResponse } from "../models/response/QueriesResponse";
import { AxiosResponse } from "axios";
import { ResponseInterface } from "../models/response/ResponseInterface";
import { PatchQueryArgs, PostQueryArgs } from "../redux/queriesSlice/types";

export default class QueriesService {
  static async getQueriesTableData(
    userId?: number,
  ): Promise<AxiosResponse<ResponseInterface<QueriesResponse[]>>> {
    return userId
      ? $api.get(`/queries/queries/?expert_users=${userId}`)
      : $api.get(`/queries/queries/`);
  }
  static async getQueriesTableDataById(
    id: number,
  ): Promise<AxiosResponse<ResponseInterface<QueriesResponse>>> {
    return $api.get(`/queries/queries/${id}/`);
  }

  static async postQuery({
    date,
    name,
    description,
    initiative_direction,
    status,
    implementation_effect,
    organization,
    initiator_users,
  }: PostQueryArgs): Promise<
    AxiosResponse<ResponseInterface<QueriesResponse>>
  > {
    return $api.post(`/queries/queries/`, {
      date,
      name,
      description,
      initiative_direction,
      status,
      implementation_effect,
      organization,
      initiator_users,
    });
  }

  static async patchQuery(
    id: number,
    props: PatchQueryArgs,
  ): Promise<AxiosResponse> {
    return $api.patch(`/queries/queries/${id}/`, {
      ...props,
    });
  }

  static async deleteQuery(
    id: number,
  ): Promise<AxiosResponse<ResponseInterface<null>>> {
    return $api.delete(`/queries/queries/${id}/`);
  }

  static async getQueriesTableDataByName(
    value: string,
  ): Promise<AxiosResponse<ResponseInterface<QueriesResponse[]>>> {
    return $api.get(`/queries/queries?search=${value}`);
  }
}
