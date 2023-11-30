import React from "react";
import { Checkbox } from "antd";

import styles from '../styles/CheckboxBar.module.scss'

const CheckboxBar = ({ onToggleArchive, checkboxText, hintText, defaultChecked }: any) => {
  return (
    <>
      {hintText ? (<div className={styles.checkboxContainerHint}>
        <Checkbox defaultChecked={defaultChecked? defaultChecked : false} className='checkbox' onChange={(e) => onToggleArchive(e.target.checked)}>
          {checkboxText}
        </Checkbox>
        <span className={styles.hintText}>{hintText}</span>
      </div>) : (<div className={styles.checkboxContainer}>
        <Checkbox defaultChecked={defaultChecked? defaultChecked : false} className='checkbox' onChange={(e) => onToggleArchive(e.target.checked)}>
          {checkboxText}
        </Checkbox>
      </div>)}
    </>
  );
};

export default CheckboxBar;
