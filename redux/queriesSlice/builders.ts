import { QueriesSliceState, Status } from "./types";
import { WritableDraft } from "immer/src/types/types-external";
import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { DetailType } from "../../models/response/ResponseInterface";

export const fetchQueriesBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<QueriesSliceState>>,
  fetch: AsyncThunk<any, any, any>
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
    }
    state.items = action.payload.data;
    state.filterItems = action.payload.data;
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.filterItems = [];
    state.items = [];
  });
};

export const fetchQueryBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<QueriesSliceState>>,
  fetch: AsyncThunk<any, any, any>
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
    }
    state.item = action.payload.data;
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
    state.item = undefined;
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.item = undefined;
  });
};

export const postQueryBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<QueriesSliceState>>,
  patch: AsyncThunk<any, any, any>
) => {
  builder.addCase(patch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
    }
    state.item = action.payload.data;
    state.status = Status.SUCCESS;
  });
  builder.addCase(patch.pending, (state) => {
    state.status = Status.LOADING;
  });
  builder.addCase(patch.rejected, (state) => {
    state.status = Status.ERROR;
  });
};
