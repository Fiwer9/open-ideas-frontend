import React from "react";
import styles from "../styles/Account.module.scss";
import {Button} from "antd";

export const AccountBlock = () => {
  return (
    <div className={styles.account}>
      <Button type={"text"} className={styles.buttonTop}>Иванов Иван Иванович</Button> <span>|</span>
      <Button type={"text"} className={styles.aratrum}>Aratrum</Button>  <span>|</span>
      <Button type={"text"} className={styles.buttonTop}>Отдел</Button>
    </div>
  )
}
