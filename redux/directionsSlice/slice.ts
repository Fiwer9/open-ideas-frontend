import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../queriesSlice/types";
import { DirectionResponse } from "../../models/response/DirectionResponse";
import { DetailType } from "../../models/response/ResponseInterface";
import {createDirection, fetchDirections, getDirectionById} from "./asyncActions";
import { DirectionsSliceState } from "./types";

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
    builder.addCase(fetchDirections.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.items = action.payload.data;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchDirections.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchDirections.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(getDirectionById.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.item = action.payload.data;
      state.status = Status.SUCCESS;
    });
    builder.addCase(getDirectionById.pending, (state) => {
      state.status = Status.LOADING;
      state.item = {} as DirectionResponse;
    });
    builder.addCase(getDirectionById.rejected, (state) => {
      state.status = Status.ERROR;
      state.item = {} as DirectionResponse;
    });
    builder.addCase(createDirection.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.detail = action.payload.error.detail as DetailType;
        state.status = Status.ERROR;
        return;
      }
      state.item = action.payload.data;
      state.status = Status.SUCCESS;
    });
    builder.addCase(createDirection.pending, (state) => {
      state.status = Status.LOADING;
      state.item = {} as DirectionResponse;
    });
    builder.addCase(createDirection.rejected, (state) => {
      state.status = Status.ERROR;
      state.item = {} as DirectionResponse;
    });
  },
});

export const { setDirections, setStatusDirections } = directionsSlice.actions;

export default directionsSlice.reducer;
