import React, { memo } from "react";
import styles from "./styles/Table.module.scss";
import { Table } from "antd";
import { DirectionResponse } from "../../models/response/DirectionResponse";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import { UserResponse } from "../../models/response/UserResponse";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import type { TableProps as RcTableProps } from "rc-table/lib/Table";

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
    return (
      <div className={styles.tableContainer}>
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
          pagination={{ pageSize: 8 }}
        />
      </div>
    );
  },
);
