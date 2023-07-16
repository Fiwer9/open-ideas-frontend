import $api from "../http";
import {AxiosResponse} from "axios";
import {CommentResponse} from "../models/response/CommentResponse";
import {AxiosRequestConfig} from "axios";

export default class CommentService {
    static async getComments():Promise<AxiosResponse<CommentResponse[]>> {
        return $api.get('/queries/comments/');
    }

    static async sendComment(comment_text: string, query: number, user: number): Promise<AxiosResponse<CommentResponse>> {
        const headers: AxiosRequestConfig["headers"] = {
            "X-CSRFToken": `HPZnsSyWM6kS4ox2iDF9IrApK7ccH13e`,
        };
        return $api.post('/queries/comments/', {comment_text, query, user}, {headers})
    }
}
