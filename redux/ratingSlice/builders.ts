import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/src/types/types-external";

import { DetailType } from "../../models/response/ResponseInterface";
import { Status } from "../queriesSlice/types";
import { RatingSliceState } from "./types";

export const fetchRatingListBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<RatingSliceState>>,
  fetch: AsyncThunk<any, any, any>
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    state.employees = action.payload.employees;
    state.totalCount = action.payload.count;
    state.status = Status.SUCCESS;
    state.detail = {};
    state.errorMessage = action.payload.errorMessage;
  });
  builder.addCase(fetch.pending, (state) => {
    state.status = Status.LOADING;
    state.employees = [];
    state.errorMessage = null;
  });
  builder.addCase(fetch.rejected, (state, action) => {
    state.status = Status.ERROR;
    state.employees = [];
    state.detail = {};
    const message =
      action.error &&
      typeof action.error === "object" &&
      "message" in action.error &&
      typeof action.error.message === "string"
        ? action.error.message
        : "Не удалось загрузить рейтинг";
    state.errorMessage = message;
  });
};

export const fetchRatingUserDetailsBuilder = (
  builder: ActionReducerMapBuilder<WritableDraft<RatingSliceState>>,
  fetch: AsyncThunk<any, any, any>
) => {
  builder.addCase(fetch.fulfilled, (state, action) => {
    state.employees = state.employees.map((employee) =>
      employee.id === action.payload.id ? action.payload : employee
    );
  });
};
