import React from "react";
import { Switch } from "antd";

import styles from "../styles/SwitchBar.module.scss";

const SwitchBar = ({
  checkboxText,
  hintText,
  layout,
  isChecked,
  onChangeSwitch,
}: any) => {
  return (
    <>
      <div className={styles.switchContainerHint}>
        <div className={styles.switchContainer}>
          <Switch
            size="small"
            defaultChecked={isChecked}
            checked={isChecked}
            onChange={onChangeSwitch}
          />
          <p className={styles.switch}>{checkboxText}</p>
        </div>
        <span className={styles.hintText}>{hintText}</span>
        <div>{layout}</div>
      </div>
    </>
  );
};

export default SwitchBar;
