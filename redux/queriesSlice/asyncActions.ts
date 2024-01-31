import { createAsyncThunk } from "@reduxjs/toolkit";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";
import { FetchFamousArgs } from "./types";

export const fetchQueries = createAsyncThunk<
  QueriesResponse[],
  FetchFamousArgs
>("queries/fetchQueries", async ({ user_id }) => {
  const { data } = await QueriesService.getQueriesTableData(user_id);
  return data;
});
