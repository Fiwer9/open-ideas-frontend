import { AxiosResponse } from "axios";
import $api from "../http";
import { DirectionResponse } from "../models/response/DirectionResponse";
import { ResponseInterface } from "../models/response/ResponseInterface";
import {
  PatchDirectionArgs,
  PostDirectionArgs,
} from "../redux/directionsSlice/types";

export default class DirectionsService {
  static async getDirections(): Promise<
    AxiosResponse<ResponseInterface<DirectionResponse[]>>
  > {
    return $api.get("/queries/directions/");
  }

  static async getDirectionById(
    id: number
  ): Promise<AxiosResponse<ResponseInterface<DirectionResponse>>> {
    return $api.get(`/queries/directions/${id}/`);
  }

  static async postDirection(
    direction: PostDirectionArgs
  ): Promise<AxiosResponse<ResponseInterface<DirectionResponse>>> {
    return $api.post("/queries/directions/", direction);
  }

  static async patchDirection(
    id: number,
    props: PatchDirectionArgs
  ): Promise<AxiosResponse<ResponseInterface<DirectionResponse>>> {
    return $api.patch(`/queries/directions/${id}/`, {
      ...props,
    });
  }

  static async deleteDirection(
    id: number
  ): Promise<AxiosResponse<ResponseInterface<null>>> {
    return $api.delete(`/queries/directions/${id}/`);
  }
}
