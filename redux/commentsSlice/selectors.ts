import { RootState } from "../store";

export const selectComments = (state: RootState) => state.comments.items;

export const selectStatusComments = (state: RootState) => state.comments.status;
