import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { CommentResponse } from "../../models/response/CommentResponse";
import CommentService from "../../services/CommentService";

export const fetchComments = createAsyncThunk<
  ResponseInterface<CommentResponse[]>
>("comments/fetchComments", async () => {
  const { data } = await CommentService.getComments();
  return data;
});
