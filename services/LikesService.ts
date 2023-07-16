import $api from "../http";
import {AxiosResponse} from "axios";
import {LikesResponse} from "../models/response/LikesResponse";

export default class LikesService {
    static async patchLike(id: number, data: [number]):Promise<AxiosResponse<LikesResponse>> {
        return $api.patch(`/users/likes/${id}/`, {"likes": data});
    }
}
