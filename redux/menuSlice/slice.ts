import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuSliceState } from "./types";
import { getMenu } from "../../utils/getMenu";
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
    setCurrentPage: (state, action: PayloadAction<string | string[]>) => {
      const nextPage = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      state.currentPage = nextPage;
      sessionStorage.setItem("current_page_menu", JSON.stringify(nextPage));
    },
    changeSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
      sessionStorage.setItem("selectedTag", action.payload);
    },
    setPageName: (state, action: PayloadAction<string>) => {
      state.pageName = action.payload;
    },
    setPageId: (state, action: PayloadAction<number>) => {
      state.pageId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserIsStaff.fulfilled, (state, action) => {
      if (action.payload.error.is_error) {
        state.isStaff = false;
        sessionStorage.setItem("isStaff", "false");
        return;
      }

      state.isStaff = action.payload.data.is_staff;
      sessionStorage.setItem("isStaff", `${action.payload.data.is_staff}`);
    });
    builder.addCase(fetchUserIsStaff.rejected, (state) => {
      state.isStaff = false;
      sessionStorage.setItem("isStaff", "false");
    });
  },
});

export const {
  changeCollapsed,
  setCurrentPage,
  setPageName,
  setPageId,
  changeSelectedTag,
} = menuSlice.actions;
export default menuSlice.reducer;
