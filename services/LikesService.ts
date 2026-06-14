import $api from "../http";
import { AxiosResponse } from "axios";
import { LikesResponse } from "../models/response/LikesResponse";
import { ResponseInterface } from "../models/response/ResponseInterface";

export default class LikesService {
  static async patchLike(
    id: number,
    liked_queries: number[]
  ): Promise<AxiosResponse<ResponseInterface<LikesResponse>>> {
    return $api.patch(`/users/likes/${id}/`, { likes: liked_queries });
  }
}
