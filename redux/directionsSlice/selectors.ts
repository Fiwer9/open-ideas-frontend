import { RootState } from "../store";

export const selectDirections = (state: RootState) => state.directions.items;

export const selectDirection = (state: RootState) => state.directions.item;

export const selectStatusDirections = (state: RootState) =>
  state.directions.status;
