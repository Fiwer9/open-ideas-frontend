import { FilterSliceState } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FilterSliceState = {
  isArchive: false,
  isExpert: false,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    changeIsArchive: (state, action) => {
      state.isArchive = action.payload;
    },
    changeIsExpert: (state, action) => {
      state.isExpert = action.payload;
    },
  },
});

export const { setSearchValue, changeIsArchive, changeIsExpert } =
  filterSlice.actions;
export default filterSlice.reducer;
