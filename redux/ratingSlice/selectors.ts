import { RootState } from "../store";

export const selectRatingEmployees = (state: RootState) =>
  state.rating.employees;

export const selectRatingStatus = (state: RootState) => state.rating.status;

export const selectRatingTotalCount = (state: RootState) =>
  state.rating.totalCount;

export const selectRatingErrorMessage = (state: RootState) =>
  state.rating.errorMessage;
