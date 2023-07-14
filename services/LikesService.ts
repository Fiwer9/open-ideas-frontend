import $api from "../http";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {LikesResponse} from "../models/response/LikesResponse";

export default class LikesService {
    static async patchLike(id: number, data: [number]):Promise<AxiosResponse<LikesResponse>> {
        const headers: AxiosRequestConfig["headers"] = {
            "X-CSRFToken": '1ddxeFdqMj1LzswXAnK8JUe4fFZG24Qk',
        };
        return $api.patch(`/users/likes/${id}/`, {"likes": data}, {headers});
    }
}
