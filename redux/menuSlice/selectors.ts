import { RootState } from "../store";

export const selectMenuIsCollapsed = (state: RootState) =>
  state.menu.isCollapsed;
export const selectCurrentPage = (state: RootState) => state.menu.currentPage;

export const selectSelectedTag = (state: RootState) => state.menu.selectedTag;

export const selectIsStaff = (state: RootState) => state.menu.isStaff;

export const selectMenu = (state: RootState) => state.menu;
