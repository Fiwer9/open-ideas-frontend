import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/src/types/types-external";
import { DirectionsSliceState } from "./types";
import { DetailType } from "../../models/response/ResponseInterface";
import { Status } from "../queriesSlice/types";
import { DirectionResponse } from "../../models/response/DirectionResponse";

export const fetchDirectionsBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<DirectionsSliceState>>,
  fetch: AsyncThunk<any, any, any>
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
      state.status = Status.ERROR;
      return;
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

export const fetchDirectionBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<DirectionsSliceState>>,
  fetch: AsyncThunk<any, any, any>
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
      state.status = Status.ERROR;
      return;
    }
    state.item = action.payload.data;
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
    state.item = {} as DirectionResponse;
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.item = {} as DirectionResponse;
  });
};

export const deleteDirectionBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<DirectionsSliceState>>,
  delDirection: AsyncThunk<any, any, any>
) => {
  builder.addCase(delDirection.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
      state.status = Status.ERROR;
      return;
    }
    state.status = Status.SUCCESS;
  });
  builder.addCase(delDirection.pending, (state) => {
    state.status = Status.LOADING;
  });
  builder.addCase(delDirection.rejected, (state) => {
    state.status = Status.ERROR;
  });
};
