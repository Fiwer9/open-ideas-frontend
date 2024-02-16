import { Status } from "../queriesSlice/types";
import { CommentsSliceState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentResponse } from "../../models/response/CommentResponse";
import { DetailType } from "../../models/response/ResponseInterface";
import { fetchComments } from "./asyncActions";

const initialState: CommentsSliceState = {
  items: [],
  status: Status.WAITING,
  detail: {},
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<CommentResponse[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.items = action.payload.data;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchComments.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
