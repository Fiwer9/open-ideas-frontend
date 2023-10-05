import React from "react";
import styles from "./styles/Table.module.scss";
import {Table} from "antd";

const locale = {
  emptyText: 'Тут ещё нет идей',
}

interface DataTable {
  data: any;
  columns: any;
  isLoading: boolean;
  onRowClick: any;
}

export const DataTable = ({ data, columns, isLoading, onRowClick }: DataTable) => {
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

  )
}
