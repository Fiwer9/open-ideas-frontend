import React from "react";
import { Checkbox } from "antd";
import styles from '../styles/FilterBar.module.scss'

const CheckboxBar = ({ onToggleArchive, checkboxText }: any) => {
  return (
    <div className={styles.btnContainer}>
      <Checkbox className={styles.checkbox} onChange={(e) => onToggleArchive(e.target.checked)}>{checkboxText}</Checkbox>
    </div>
  );
};

export default CheckboxBar;
