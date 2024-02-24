import { createSlice } from "@reduxjs/toolkit";
import { MenuSliceState } from "./types";
import { getMenu } from "../../utils/getMenu";
import Cookies from "js-cookie";
import { fetchUserHeader } from "../headerSlice/asyncActions";
import { DetailType } from "../../models/response/ResponseInterface";
import { Status } from "../queriesSlice/types";
import { fetchUserIsStaff } from "./asyncActions";

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
  extraReducers: (builder) => {
    builder.addCase(fetchUserIsStaff.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        return;
      }
      state.isStaff = action.payload.data.is_staff;
      sessionStorage.setItem("isStaff", `${action.payload.data.is_staff}`);
    });
    builder.addCase(fetchUserIsStaff.pending, (state) => {
      state.isStaff = false;
    });
    builder.addCase(fetchUserIsStaff.rejected, (state) => {
      state.isStaff = false;
    });
  },
});

export const { changeCollapsed, setCurrentPage, changeSelectedTag } =
  menuSlice.actions;
export default menuSlice.reducer;
