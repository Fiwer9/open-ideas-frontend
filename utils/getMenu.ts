import { MenuSliceState } from "../redux/menuSlice/types";

export const getMenu = (): MenuSliceState => {
  try {
    const isCollapsed = sessionStorage.getItem("is_collapsed_menu") === "true";
    const currentPage = sessionStorage.getItem("current_page_menu")
      ? [sessionStorage.getItem("current_page_menu")]
      : ["/queries"];
    const selectedTag = sessionStorage.getItem("selectedTag")
      ? sessionStorage.getItem("selectedTag")
      : "Инициативы";
    const isStaff = sessionStorage.getItem("is_staff") === "true" || false;
    return {
      isCollapsed,
      currentPage,
      selectedTag,
      isStaff,
    };
  } catch (e) {
    return {
      isCollapsed: false,
      currentPage: ["/queries"],
      selectedTag: "Инициативы",
      isStaff: false,
    };
  }
};
