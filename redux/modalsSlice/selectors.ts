import { RootState } from "../store";

export const selectModelSubmitState = (state: RootState) =>
  state.modals.isModalSubmitActive;

export const selectModelResetState = (state: RootState) =>
  state.modals.isModalResetActive;
