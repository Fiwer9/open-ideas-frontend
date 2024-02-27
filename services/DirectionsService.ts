import { AxiosResponse } from "axios";
import $api from "../http";
import { DirectionResponse } from "../models/response/DirectionResponse";
import { ResponseInterface } from "../models/response/ResponseInterface";

export default class DirectionsService {
  static async getDirections(): Promise<
    AxiosResponse<ResponseInterface<DirectionResponse[]>>
  > {
    return $api.get("/queries/directions/");
  }
}
