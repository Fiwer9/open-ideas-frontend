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
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
    state.items = [];
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.items = [];
  });
};
