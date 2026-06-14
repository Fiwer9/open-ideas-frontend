export interface MenuSliceState {
  isCollapsed: boolean;
  currentPage: string[];
  selectedTag: string;
  isStaff: boolean;
  pageName?: string;
  pageId?: number;
}
