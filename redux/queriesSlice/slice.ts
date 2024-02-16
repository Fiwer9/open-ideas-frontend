import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import { QueriesSliceState, Status } from "./types";
import {
  fetchQueries,
  fetchQueriesById,
  fetchQueriesByName,
} from "./asyncActions";
import { DetailType } from "../../models/response/ResponseInterface";
import { fetchQueriesBuilder } from "./builders";

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
    fetchQueriesBuilder(builder, fetchQueries);
    fetchQueriesBuilder(builder, fetchQueriesByName);
    fetchQueriesBuilder(builder, fetchQueriesById);
  },
});

export const { setQueries } = queriesSlice.actions;

export default queriesSlice.reducer;
