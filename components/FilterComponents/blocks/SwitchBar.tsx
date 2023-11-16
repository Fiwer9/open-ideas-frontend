import React from "react";
import { Switch } from "antd";

import styles from '../styles/SwitchBar.module.scss'

const SwitchBar = ({ checkboxText, hintText }: any) => {
  return (
    <>
      <div className={styles.switchContainerHint}>
        <div className={styles.switchContainer}>
          <Switch size="small" />
          <p className={styles.switch}>{checkboxText}</p>
        </div>
        <span className={styles.hintText}>{hintText}</span>
      </div>
    </>
  );
};

export default SwitchBar;
