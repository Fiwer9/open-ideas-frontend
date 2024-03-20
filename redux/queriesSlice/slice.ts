import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import { QueriesSliceState, Status } from "./types";
import {
  deleteQuery,
  fetchQueries,
  fetchQueriesById,
  fetchQueriesByName,
  patchQuery,
  postQuery,
} from "./asyncActions";
import {
  fetchQueriesBuilder,
  fetchQueryBuilder,
  postQueryBuilder,
} from "./builders";

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
    fetchQueriesBuilder(builder, fetchQueriesByName);
    fetchQueryBuilder(builder, fetchQueriesById);
    fetchQueriesBuilder(builder, fetchQueries);
    fetchQueryBuilder(builder, patchQuery);
    postQueryBuilder(builder, postQuery);
    postQueryBuilder(builder, deleteQuery);
  },
});

export const { setQueries, setStatusQueries } = queriesSlice.actions;

export default queriesSlice.reducer;
