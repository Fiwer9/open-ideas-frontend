import $api from "../http";
import { AxiosResponse } from "axios";
import { CommentResponse } from "../models/response/CommentResponse";
import { ResponseInterface } from "../models/response/ResponseInterface";

export default class CommentService {
  static async getComments(): Promise<
    AxiosResponse<ResponseInterface<CommentResponse[]>>
  > {
    return $api.get("/queries/comments/");
  }

  static async getCommentsByQuery(
    query: number
  ): Promise<AxiosResponse<ResponseInterface<CommentResponse[]>>> {
    return $api.get(`/queries/comments/?query=${query}`);
  }

  static async sendComment(
    comment_text: string,
    query: number,
    user: number
  ): Promise<AxiosResponse<ResponseInterface<CommentResponse>>> {
    return $api.post("/queries/comments/", { comment_text, query, user });
  }
}
