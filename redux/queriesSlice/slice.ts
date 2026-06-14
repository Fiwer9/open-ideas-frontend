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
  item: {} as QueriesResponse,
  status: Status.WAITING,
  detail: {},
  filterItems: [],
  queryFilter: {} as { startDate: string; endDate: string },
};

export const queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    setStatusQueries: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setQueries: (state, action: PayloadAction<QueriesResponse[]>) => {
      state.filterItems = action.payload;
    },
    setFilter: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      state.queryFilter = action.payload;
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

export const { setQueries, setStatusQueries, setFilter } = queriesSlice.actions;

export default queriesSlice.reducer;
