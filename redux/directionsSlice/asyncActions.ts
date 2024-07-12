import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { DirectionResponse } from "../../models/response/DirectionResponse";
import DirectionsService from "../../services/DirectionsService";

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
