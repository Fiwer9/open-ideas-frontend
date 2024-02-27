import { RootState } from "../store";

export const selectDirections = (state: RootState) => state.directions.items;

export const selectStatusDirections = (state: RootState) =>
  state.directions.status;
