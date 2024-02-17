import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { CommentResponse } from "../../models/response/CommentResponse";
import CommentService from "../../services/CommentService";
import { PostCommentsArgs } from "./types";

export const fetchComments = createAsyncThunk<
  ResponseInterface<CommentResponse[]>
>("comments/fetchComments", async () => {
  const { data } = await CommentService.getComments();
  return data;
});

export const postComment = createAsyncThunk<
  ResponseInterface<CommentResponse>,
  PostCommentsArgs
>("comments/postComment", async ({ comment, query_id, user_id }) => {
  const { data } = await CommentService.sendComment(comment, query_id, user_id);
  return data;
});
