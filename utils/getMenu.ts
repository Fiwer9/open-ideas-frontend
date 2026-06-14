import { MenuSliceState } from "../redux/menuSlice/types";

export const getMenu = (): MenuSliceState => {
  try {
    const isCollapsed = sessionStorage.getItem("is_collapsed_menu") === "true";
    const storedCurrentPage = sessionStorage.getItem("current_page_menu");
    const parsedCurrentPage = storedCurrentPage
      ? JSON.parse(storedCurrentPage)
      : ["/queries"];
    const currentPage = Array.isArray(parsedCurrentPage)
      ? parsedCurrentPage
      : [parsedCurrentPage];
    const selectedTag = sessionStorage.getItem("selectedTag") ?? "Инициативы";
    const isStaff = sessionStorage.getItem("isStaff") === "true" || false;
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
