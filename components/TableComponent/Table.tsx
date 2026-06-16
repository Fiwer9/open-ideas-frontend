import React, { memo } from "react";

import { Table } from "antd";

import type { TableProps as RcTableProps } from "rc-table/lib/Table";

import { usePersistedTablePage } from "../../hooks/usePersistedTablePage";
import { DirectionResponse } from "../../models/response/DirectionResponse";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import { UserResponse } from "../../models/response/UserResponse";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import { TablePageKey } from "../../utils/tablePaginationStorage";

import styles from "./styles/Table.module.scss";

interface DataTable {
  data:
    | DirectionResponse[]
    | QueriesResponse[]
    | UserResponse[]
    | OrganizationsResponse[];
  columns: any;
  isLoading: boolean;
  onRowClick: (element: typeof this.data) => void;
  locale: string;
  pageSize?: number;
  paginationStorageKey?: TablePageKey;
}

export const DataTable: React.FC<DataTable> = memo(
  ({
    data,
    columns,
    isLoading,
    onRowClick,
    locale,
    pageSize = 8,
    paginationStorageKey,
  }) => {
    const { currentPage, handlePageChange } = usePersistedTablePage(
      paginationStorageKey
    );

    return (
      <div
        className={`${styles.tableContainer} ${
          isLoading ? styles.tableContainerLoading : ""
        }`}
        style={{ "--table-rows": pageSize } as React.CSSProperties}
      >
        <Table
          className={styles.table}
          dataSource={data as RcTableProps<any>["data"]}
          columns={columns}
          loading={isLoading}
          onRow={(element) => ({
            onClick: () => {
              onRowClick(element);
            },
          })}
          rowKey="id"
          locale={{ emptyText: locale }}
          bordered
          pagination={{
            current: currentPage,
            pageSize,
            position: ["bottomLeft"],
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Показано ${range[0]}-${range[1]} из ${total}`,
            onChange: handlePageChange,
          }}
        />
      </div>
    );
  }
);
