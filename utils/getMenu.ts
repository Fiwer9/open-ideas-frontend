import { MenuSliceState } from "../redux/menuSlice/types";

export const getMenu = (): MenuSliceState => {
  try {
    const isCollapsed = sessionStorage.getItem("is_collapsed_menu") === "true";
    const currentPage = sessionStorage.getItem("current_page_menu")
      ? [sessionStorage.getItem("current_page_menu")]
      : ["/queries"];
    const selectedTag = sessionStorage.getItem("selectedTag") || "Инициативы";
    return {
      isCollapsed,
      currentPage,
      selectedTag,
    };
  } catch (e) {
    return {
      isCollapsed: false,
      currentPage: ["/queries"],
      selectedTag: "Инициативы",
    };
  }
};
