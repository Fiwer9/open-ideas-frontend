const STORAGE_PREFIX = "table-page:";

export const TABLE_PAGE_KEYS = {
  QUERIES: "queries-list",
  QUERIES_ADMIN: "queries-admin-list",
  RATING: "rating-list",
} as const;

export type TablePageKey = (typeof TABLE_PAGE_KEYS)[keyof typeof TABLE_PAGE_KEYS];

export const getStoredTablePage = (
  key: TablePageKey,
  defaultPage = 1
): number => {
  if (typeof window === "undefined") {
    return defaultPage;
  }

  const raw = sessionStorage.getItem(`${STORAGE_PREFIX}${key}`);
  const page = raw ? Number.parseInt(raw, 10) : defaultPage;

  return Number.isFinite(page) && page > 0 ? page : defaultPage;
};

export const setStoredTablePage = (key: TablePageKey, page: number): void => {
  if (typeof window === "undefined" || page < 1) {
    return;
  }

  sessionStorage.setItem(`${STORAGE_PREFIX}${key}`, String(page));
};
