import { createSlice } from "@reduxjs/toolkit";
import { MenuSliceState } from "./types";
import { getMenu } from "../../utils/getMenu";
import Cookies from "js-cookie";

const initialState: MenuSliceState = getMenu();

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
      sessionStorage.setItem("is_collapsed_menu", action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      sessionStorage.setItem("current_page_menu", action.payload);
    },
    changeSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
      sessionStorage.setItem("selectedTag", action.payload);
    },
  },
});

export const { changeCollapsed, setCurrentPage, changeSelectedTag } =
  menuSlice.actions;
export default menuSlice.reducer;
