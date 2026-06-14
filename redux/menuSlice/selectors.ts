import { RootState } from "../store";

export const selectMenuIsCollapsed = (state: RootState) =>
  state.menu.isCollapsed;
export const selectCurrentPage = (state: RootState) => {
  const currentPage = state.menu.currentPage;

  if (Array.isArray(currentPage)) {
    return currentPage;
  }

  return currentPage ? [currentPage] : ["/queries"];
};

export const selectSelectedTag = (state: RootState) => state.menu.selectedTag;

export const selectIsStaff = (state: RootState) => state.menu.isStaff;

export const selectMenu = (state: RootState) => state.menu;
