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
  deleteQuery,
} from "./asyncActions";
import { fetchQueriesBuilder, postQueryBuilder } from "./builders";

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
    fetchQueriesBuilder(builder, patchQuery);
    postQueryBuilder(builder, postQuery);
    postQueryBuilder(builder, deleteQuery);
  },
});

export const { setQueries, setStatusQueries } = queriesSlice.actions;

export default queriesSlice.reducer;
