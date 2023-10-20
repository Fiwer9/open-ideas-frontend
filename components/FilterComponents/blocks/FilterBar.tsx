import React from "react";
import { Button } from "antd";
import styles from '../styles/FilterBar.module.scss'

const FilterBar = ({ filterText, icon }: any) => {
  return (
    <div className={styles.btnContainer}>
      <Button icon={icon}>{filterText}</Button>
    </div>
  );
};

export default FilterBar;
