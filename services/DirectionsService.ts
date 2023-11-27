import {AxiosResponse} from "axios";
import $api from "../http";
import {DirectionResponse} from "../models/response/DirectionResponse";

export default class DirectionsService{
  static async getDirections(): Promise<AxiosResponse<DirectionResponse[]>>  {
    return $api.get('/queries/directions/');
  }
}
