import { CommentResponse } from "../../models/response/CommentResponse";
import { Status } from "../queriesSlice/types";
import { DetailType } from "../../models/response/ResponseInterface";

export interface CommentsSliceState {
  items: CommentResponse[];
  status: Status;
  detail: DetailType;
}
