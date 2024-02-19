import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import { QueriesSliceState, Status } from "./types";
import {
  fetchQueriesByUser,
  fetchQueriesById,
  fetchQueriesByName,
  patchQuery,
  fetchQueries,
  postQuery,
} from "./asyncActions";
import { fetchQueriesBuilder, patchQueryBuilder } from "./builders";

const initialState: QueriesSliceState = {
  items: [],
  status: Status.WAITING,
  detail: {},
};

export const queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    setStatusQueries: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setQueries: (state, action: PayloadAction<QueriesResponse[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    fetchQueriesBuilder(builder, fetchQueriesByUser);
    fetchQueriesBuilder(builder, fetchQueriesByName);
    fetchQueriesBuilder(builder, fetchQueriesById);
    fetchQueriesBuilder(builder, fetchQueries);
    patchQueryBuilder(builder, patchQuery);
    patchQueryBuilder(builder, postQuery);
  },
});

export const { setQueries, setStatusQueries } = queriesSlice.actions;

export default queriesSlice.reducer;
