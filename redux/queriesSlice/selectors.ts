import { RootState } from "../store";

export const selectQueriesData = (state: RootState) => state.queries.items;

export const selectStatusQueries = (state: RootState) => state.queries.status;
