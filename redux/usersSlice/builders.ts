import { UsersSliceState } from "./types";
import { WritableDraft } from "immer/src/types/types-external";
import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { DetailType } from "../../models/response/ResponseInterface";
import { patchLikes } from "./asyncActions";
import { Status } from "../queriesSlice/types";

export const fetchUsersBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<UsersSliceState>>,
  fetch: AsyncThunk<any, any, any>
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
      state.status = Status.ERROR;
      return;
    }
    state.users = action.payload.data;
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
    state.users = [];
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.users = [];
  });
};

export const fetchUserBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<UsersSliceState>>,
  fetch: AsyncThunk<any, any, any>
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
      state.status = Status.ERROR;
      return;
    }
    state.user = action.payload.data;
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
    state.user = undefined;
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.user = undefined;
  });
};

export const patchLikesBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<UsersSliceState>>,
  fetch: AsyncThunk<any, any, any>
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
      state.status = Status.ERROR;
      return;
    }
    state.status = Status.SUCCESS;
  });
  builder.addCase(patchLikes.pending, (state) => {
    state.status = Status.LOADING;
  });
  builder.addCase(patchLikes.rejected, (state) => {
    state.status = Status.ERROR;
  });
};
