import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import { QueriesSliceState, Status } from "./types";
import { fetchQueries } from "./asyncActions";

const initialState: QueriesSliceState = {
  queries: [],
  status: Status.LOADING,
};

export const queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    setQueries: (state, action: PayloadAction<QueriesResponse[]>) => {
      state.queries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQueries.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.queries = action.payload;
    });
    builder.addCase(fetchQueries.pending, (state) => {
      state.status = Status.LOADING;
      state.queries = [];
    });
    builder.addCase(fetchQueries.rejected, (state) => {
      state.status = Status.ERROR;
      state.queries = [];
    });
  },
});

export const { setQueries } = queriesSlice.actions;

export default queriesSlice.reducer;
