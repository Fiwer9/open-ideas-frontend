import React, {useContext, useState} from "react";
import { Switch } from "antd";

import styles from '../styles/SwitchBar.module.scss'
import Cookies from "js-cookie";
import {Context} from "../../../pages/_app";

const SwitchBar = ({ checkboxText, hintText, layout, isChecked, type }: any) => {
  const { store } = useContext(Context);

  const handleChange = (e: boolean) => {
    type === 'anon' ? store.isAnonymous = e : store.isFilesAttachment = e;
  }

  return (
    <>
      <div className={styles.switchContainerHint}>
        <div className={styles.switchContainer}>
          <Switch size="small" defaultValue={isChecked} onChange={handleChange}/>
          <p className={styles.switch}>{checkboxText}</p>
        </div>
        <span className={styles.hintText}>{hintText}</span>
        <div>
          {layout}
        </div>
      </div>
    </>
  );
};

export default SwitchBar;
