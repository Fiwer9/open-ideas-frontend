import { createSlice } from "@reduxjs/toolkit";
import { MenuSliceState } from "./types";

const initialState: MenuSliceState = {
  collapsed: false,
  currentPage: ["/queries"],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { changeCollapsed, setCurrentPage } = menuSlice.actions;
export default menuSlice.reducer;
