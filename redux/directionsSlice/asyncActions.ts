import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { DirectionResponse } from "../../models/response/DirectionResponse";
import DirectionsService from "../../services/DirectionsService";
import {PostDirectionArgs} from "./types";
import {PatchDirectionArgs} from "./types";

export const fetchDirections = createAsyncThunk<
  ResponseInterface<DirectionResponse[]>
>("directions/fetchDirections", async () => {
  const { data } = await DirectionsService.getDirections();
  return data;
});

export const getDirectionById = createAsyncThunk<
  ResponseInterface<DirectionResponse>,
  number
>("directions/getDirectionById", async (id: number) => {
  const { data } = await DirectionsService.getDirectionById(id);
  return data;
});

export const postDirection = createAsyncThunk<
  ResponseInterface<DirectionResponse>,
  PostDirectionArgs
>("directions/createDirection", async (direction: PostDirectionArgs) => {
  const { data } = await DirectionsService.postDirection(direction);
  return data;
});

export const patchDirection = createAsyncThunk<
  ResponseInterface<DirectionResponse>,
  PatchDirectionArgs
>("directions/patchDirection", async (props: PatchDirectionArgs) => {
  const { data } = await DirectionsService.patchDirection(props.id, props);
  return data;
});

export const deleteDirection = createAsyncThunk<
  ResponseInterface<null>,
  number
>("direction/deleteDirection", async (id: number) => {
  const { data } = await DirectionsService.deleteDirection(id);
  return data;
})
