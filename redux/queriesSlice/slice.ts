import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import { QueriesSliceState, Status } from "./types";
import { fetchQueries } from "./asyncActions";
import { DetailType } from "../../models/response/ResponseInterface";

const initialState: QueriesSliceState = {
  items: [],
  status: Status.WAITING,
  detail: {},
};

export const queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    setQueries: (state, action: PayloadAction<QueriesResponse[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQueries.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
      }
      state.items = action.payload.data;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchQueries.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchQueries.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setQueries } = queriesSlice.actions;

export default queriesSlice.reducer;
