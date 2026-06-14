import { RootState } from "../store";

export const selectFilters = (state: RootState) => state.filter;

export const selectSearchValue = (state: RootState) => state.filter.searchValue;
