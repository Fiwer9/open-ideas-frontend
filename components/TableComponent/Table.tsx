import React, { memo } from "react";
import styles from "./styles/Table.module.scss";
import { Table } from "antd";
import { DirectionResponse } from "../../models/response/DirectionResponse";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import { UserResponse } from "../../models/response/UserResponse";
import { UsersUpdateResponse } from "../../models/response/UsersUpdateResponse";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";

const locale = {
  emptyText: "Тут ещё нет идей",
};

interface DataTable {
  data:
    | DirectionResponse[]
    | QueriesResponse[]
    | UserResponse[]
    | UsersUpdateResponse[]
    | OrganizationsResponse[];
  columns: any;
  isLoading: boolean;
  onRowClick: (element: typeof this.data) => void;
}

export const DataTable: React.FC<DataTable> = memo(
  ({ data, columns, isLoading, onRowClick }) => {
    return (
      <div className={styles.tableContainer}>
        <Table
          className={styles.table}
          dataSource={data}
          columns={columns}
          loading={isLoading}
          onRow={(element) => ({
            onClick: () => {
              onRowClick(element);
            },
          })}
          rowKey="id"
          locale={locale}
          bordered
        />
      </div>
    );
  }
);
