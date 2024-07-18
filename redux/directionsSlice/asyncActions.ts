import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { DirectionResponse } from "../../models/response/DirectionResponse";
import DirectionsService from "../../services/DirectionsService";
import {PostDirectionArgs} from "./types";

export const fetchDirections = createAsyncThunk<
  ResponseInterface<DirectionResponse[]>
>("directions/fetchDirections", async () => {
  const { data } = await DirectionsService.getDirections();
  return data;
});

export const getDirectionById = createAsyncThunk<
  ResponseInterface<DirectionResponse>,
  string
>("directions/getDirectionById", async (id: string) => {
  const { data } = await DirectionsService.getDirectionById(id);
  return data;
});

export const createDirection = createAsyncThunk<
  ResponseInterface<DirectionResponse>,
  PostDirectionArgs
>("directions/createDirection", async (direction: PostDirectionArgs) => {
  const { data } = await DirectionsService.postDirection(direction);
  return data;
});
