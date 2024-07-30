import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../queriesSlice/types";
import { DirectionResponse } from "../../models/response/DirectionResponse";
import { postDirection, fetchDirections, getDirectionById, patchDirection, deleteDirection } from "./asyncActions";
import { DirectionsSliceState } from "./types";
import { deleteDirectionBuilder, fetchDirectionBuilder, fetchDirectionsBuilder } from "./builders";

const initialState: DirectionsSliceState = {
  items: [],
  item: {} as DirectionResponse,
  status: Status.WAITING,
  detail: {},
};

export const directionsSlice = createSlice({
  name: "directions",
  initialState,
  reducers: {
    setDirections: (state, action: PayloadAction<DirectionResponse[]>) => {
      state.items = action.payload;
    },
    setStatusDirections: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    fetchDirectionsBuilder(builder, fetchDirections);
    fetchDirectionBuilder(builder, getDirectionById);
    fetchDirectionBuilder(builder, postDirection);
    fetchDirectionBuilder(builder, patchDirection);
    deleteDirectionBuilder(builder, deleteDirection);
  },
});

export const { setDirections, setStatusDirections } = directionsSlice.actions;

export default directionsSlice.reducer;
