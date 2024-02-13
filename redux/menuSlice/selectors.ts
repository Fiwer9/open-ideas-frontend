import { RootState } from "../store";

export const selectMenuCollapsed = (state: RootState) => state.menu.collapsed;
export const selectCurrentPage = (state: RootState) => state.menu.currentPage;
