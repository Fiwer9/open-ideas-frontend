import { useCallback, useState } from "react";

import {
  getStoredTablePage,
  setStoredTablePage,
  TablePageKey,
} from "../utils/tablePaginationStorage";

export const usePersistedTablePage = (
  storageKey?: TablePageKey,
  defaultPage = 1
) => {
  const [currentPage, setCurrentPage] = useState(() =>
    storageKey ? getStoredTablePage(storageKey, defaultPage) : defaultPage
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      if (storageKey) {
        setStoredTablePage(storageKey, page);
      }
    },
    [storageKey]
  );

  return { currentPage, handlePageChange };
};
