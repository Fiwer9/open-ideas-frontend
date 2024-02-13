import { createAsyncThunk } from "@reduxjs/toolkit";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";
import { FetchQueriesArgs, FetchQueriesByNameArgs } from "./types";
import { ResponseInterface } from "../../models/response/ResponseInterface";

export const fetchQueries = createAsyncThunk<
  ResponseInterface<QueriesResponse[]>,
  FetchQueriesArgs
>("queries/fetchQueries", async ({ user_id }) => {
  const { data } = await QueriesService.getQueriesTableData(user_id);
  return data;
});

export const fetchQueriesByName = createAsyncThunk<
  ResponseInterface<QueriesResponse[]>,
  FetchQueriesByNameArgs
>("queries/fetchQueriesByName", async ({ value }) => {
  const { data } = await QueriesService.getQueriesTableDataByName(value);
  return data;
});
