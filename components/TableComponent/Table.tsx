import React, { memo } from "react";

import { Table } from "antd";

import type { TableProps as RcTableProps } from "rc-table/lib/Table";

import { DirectionResponse } from "../../models/response/DirectionResponse";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import { UserResponse } from "../../models/response/UserResponse";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";

import TableListSkeleton from "../SkeletonComponents/TableListSkeleton";

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
}

export const DataTable: React.FC<DataTable> = memo(
  ({ data, columns, isLoading, onRowClick, locale }) => {
    if (isLoading) {
      return (
        <div className={styles.tableContainer}>
          <TableListSkeleton />
        </div>
      );
    }

    return (
      <div className={styles.tableContainer}>
        <Table
          className={styles.table}
          dataSource={data as RcTableProps<any>["data"]}
          columns={columns}
          onRow={(element) => ({
            onClick: () => {
              onRowClick(element);
            },
          })}
          rowKey="id"
          locale={{ emptyText: locale }}
          bordered
          pagination={{
            pageSize: 8,
            position: ["bottomLeft"],
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Показано ${range[0]}-${range[1]} из ${total}`,
          }}
        />
      </div>
    );
  }
);
