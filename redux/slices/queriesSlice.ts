import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";

export type FetchFamousArgs = {
  user_id?: number;
};

export const fetchQueries = createAsyncThunk<
  QueriesResponse[],
  FetchFamousArgs
>("queries/fetchQueries", async ({ user_id }) => {
  const { data } = await QueriesService.getQueriesTableData(user_id);
  return data;
});

export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

interface QueriesSliceState {
  queries: QueriesResponse[];
  status: Status;
}

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

export const selectQueriesData = (state: RootState) => state.queries;

export const { setQueries } = queriesSlice.actions;

export default queriesSlice.reducer;
