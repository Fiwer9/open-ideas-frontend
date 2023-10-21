import React from "react";
import { Checkbox } from "antd";

import styles from '../styles/CheckboxBar.module.scss'

const CheckboxBar = ({ onToggleArchive, checkboxText, hintText }: any) => {
  return (
    <>
      {hintText ? (<div className={styles.checkboxContainerHint}>
        <Checkbox className='checkbox' onChange={(e) => onToggleArchive(e.target.checked)}>
          {checkboxText}
        </Checkbox>
        <span className={styles.hintText}>{hintText}</span>
      </div>) : (<div className={styles.checkboxContainer}>
        <Checkbox className='checkbox' onChange={(e) => onToggleArchive(e.target.checked)}>
          {checkboxText}
        </Checkbox>
      </div>)}
    </>
  );
};

export default CheckboxBar;
