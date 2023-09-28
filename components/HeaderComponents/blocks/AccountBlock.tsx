import React from "react";
import styles from "../styles/Account.module.scss";
import {Button} from "antd";

interface AccountBlockProps {
  user_name: string;
  department: string;
  organization: string;
}

export const AccountBlock = (props: AccountBlockProps) => {
  return (
    <div className={styles.account}>
      <Button type={"text"} className={styles.buttonTop}>{props.user_name}</Button> <span>|</span>
      <Button type={"text"} className={styles.aratrum}>{props.organization}</Button>  <span>|</span>
      <Button type={"text"} className={styles.buttonTop}>{props.department}</Button>
    </div>
  )
}
