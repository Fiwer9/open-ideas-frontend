import { createAsyncThunk } from "@reduxjs/toolkit";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";
import { FetchFamousArgs } from "./types";
import { ResponseInterface } from "../../models/response/ResponseInterface";

export const fetchQueries = createAsyncThunk<
  ResponseInterface<QueriesResponse[]>,
  FetchFamousArgs
>("queries/fetchQueries", async ({ user_id }) => {
  const { data } = await QueriesService.getQueriesTableData(user_id);
  return data;
});
