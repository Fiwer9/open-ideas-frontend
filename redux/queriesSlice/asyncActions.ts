import { createAsyncThunk } from "@reduxjs/toolkit";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";
import {
  DeleteQueryArgs,
  FetchQueriesArgs,
  FetchQueriesByIdArgs,
  FetchQueriesByNameArgs,
  PatchQueryArgs,
  PostQueryArgs,
} from "./types";
import { ResponseInterface } from "../../models/response/ResponseInterface";

export const fetchQueriesByUser = createAsyncThunk<
  ResponseInterface<QueriesResponse[]>,
  FetchQueriesArgs
>("queries/fetchQueriesByUser", async ({ user_id }) => {
  const { data } = await QueriesService.getQueriesTableData(user_id);
  return data;
});

export const fetchQueries = createAsyncThunk<
  ResponseInterface<QueriesResponse[]>
>("queries/fetchQueries", async () => {
  const { data } = await QueriesService.getQueriesTableData();
  return data;
});

export const fetchQueriesByName = createAsyncThunk<
  ResponseInterface<QueriesResponse[]>,
  FetchQueriesByNameArgs
>("queries/fetchQueriesByName", async ({ value }) => {
  const { data } = await QueriesService.getQueriesTableDataByName(value);
  return data;
});

export const fetchQueriesById = createAsyncThunk<
  ResponseInterface<QueriesResponse>,
  FetchQueriesByIdArgs
>("queries/fetchQueriesById", async ({ id }) => {
  const { data } = await QueriesService.getQueriesTableDataById(Number(id));
  return data;
});

export const patchQuery = createAsyncThunk<
  ResponseInterface<QueriesResponse>,
  PatchQueryArgs
>("queries/patchQuery", async (props) => {
  if (props.expert_users) {
    console.log(props);
    const { data } = await QueriesService.patchQuery(props.id, props);
    return data;
  }
  const { data } = await QueriesService.patchQuery(props.id, props);
  return data;
});

export const postQuery = createAsyncThunk<
  ResponseInterface<QueriesResponse>,
  PostQueryArgs
>("queries/postQuery", async (props) => {
  const { data } = await QueriesService.postQuery(props);
  return data;
});

export const deleteQuery = createAsyncThunk<
  ResponseInterface<null>,
  DeleteQueryArgs
>("queries/deleteQuery", async ({ queryId }) => {
  const { data } = await QueriesService.deleteQuery(Number(queryId));
  return data;
});
