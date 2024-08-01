import { RootState } from "../store";

export const selectQueriesData = (state: RootState) => state.queries.items;
export const selectQueryData = (state: RootState) => state.queries.item;
export const selectQueryFilter = (state: RootState) => state.queries.queryFilter;

export const selectStatusQueries = (state: RootState) => state.queries.status;
