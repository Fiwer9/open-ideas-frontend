import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentResponse } from "../../models/response/CommentResponse";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import CommentService from "../../services/CommentService";
import { FetchCommentsByQueryArgs, PostCommentsArgs } from "./types";

export const fetchCommentsById = createAsyncThunk<
  ResponseInterface<CommentResponse[]>,
  FetchCommentsByQueryArgs
>("comments/fetchCommentsById", async ({ queryId }) => {
  const { data } = await CommentService.getCommentsByQuery(Number(queryId));
  return data;
});

export const postComment = createAsyncThunk<
  ResponseInterface<CommentResponse>,
  PostCommentsArgs
>("comments/postComment", async ({ comment, query_id, user_id }) => {
  const { data } = await CommentService.sendComment(comment, query_id, user_id);
  return data;
});
