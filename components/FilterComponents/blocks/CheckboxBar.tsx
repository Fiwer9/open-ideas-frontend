import React from "react";
import { Checkbox } from "antd";

import styles from '../styles/CheckboxBar.module.scss'

const CheckboxBar = ({ onToggleArchive, checkboxText, hintText }: any) => {
  return (
    <div className={styles.checkboxContainer}>
      <Checkbox className='checkbox' onChange={(e) => onToggleArchive(e.target.checked)}>
        {checkboxText}
      </Checkbox>
      <span className={styles.hintText}>{hintText}</span>
    </div>
  );
};

export default CheckboxBar;
