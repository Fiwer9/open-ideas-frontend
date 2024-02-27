import { RootState } from "../store";
import { WritableDraft } from "immer/src/types/types-external";
import { QueriesResponse } from "../../models/response/QueriesResponse";

export const selectQueriesData = (state: RootState) =>
  state.queries.items as WritableDraft<QueriesResponse[]>;
export const selectQueryData = (state: RootState) =>
  state.queries.items as WritableDraft<QueriesResponse>;

export const selectStatusQueries = (state: RootState) => state.queries.status;
