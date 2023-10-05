import React from "react";
import { Button } from "antd";
import { FilterOutlined } from '@ant-design/icons';
import styles from '../styles/FilterBar.module.scss'

const FilterBar = ({ filterText }: any) => {
  return (
    <div className={styles.btnContainer}>
      <Button icon={<FilterOutlined />}>{filterText}</Button>
    </div>
  );
};

export default FilterBar;
