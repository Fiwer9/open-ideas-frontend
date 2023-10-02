import React from "react";
import { Button, Checkbox } from "antd";
import { FilterOutlined } from '@ant-design/icons';
import styles from '../styles/FilterBar.module.scss'

const FilterBar = ({ onToggleArchive, filterText, checkboxText }: any) => {
  return (
    <div className={styles.btnContainer}>
      <Button icon={<FilterOutlined />}>{filterText}</Button>
      <Checkbox className={styles.checkbox} onChange={(e) => onToggleArchive(e.target.checked)}>{checkboxText}</Checkbox>
    </div>
  );
};

export default FilterBar;
