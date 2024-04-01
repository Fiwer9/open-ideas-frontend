import { WritableDraft } from "immer/src/types/types-external";
import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { DetailType } from "../../models/response/ResponseInterface";
import { SettingsSliceState } from "./types";
import { Status } from "../queriesSlice/types";

export const fetchDomainsBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<SettingsSliceState>>,
  fetch: AsyncThunk<any, any, any>,
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
    }
    state.domains = action.payload.data;
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
    state.domains = [];
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.domains = [];
  });
};

export const postDomainBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<SettingsSliceState>>,
  fetch: AsyncThunk<any, any, any>,
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
    }
    state.domains = [...state.domains, action.payload.data];
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.domains = [];
  });
};

export const patchDomainBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<SettingsSliceState>>,
  fetch: AsyncThunk<any, any, any>,
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
    }
    state.domains = [
      ...state.domains.filter((domain) => domain.id !== action.payload.data.id),
      action.payload.data,
    ];
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.domains = [];
  });
};

export const deleteDomainBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<SettingsSliceState>>,
  fetch: AsyncThunk<any, any, any>,
) => {
  builder.addCase(fetch.fulfilled, (state) => {
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.domains = [];
  });
};

export const fetchSettingsBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<SettingsSliceState>>,
  fetch: AsyncThunk<any, any, any>,
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    if (action.payload.error.is_error) {
      state.detail = action.payload.error.detail as DetailType;
    }
    state.settings = action.payload.data;
    state.status = Status.SUCCESS;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
    state.settings = [];
  });
  builder.addCase(fetch.rejected, (state) => {
    state.status = Status.ERROR;
    state.settings = [];
  });
};
