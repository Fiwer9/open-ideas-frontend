import React from "react";
import {BreadcrumbBlock} from "./blocks/BreadcrumbBlock";
import {AccountBlock} from "./blocks/AccountBlock";
import styles from "./styles/index.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <BreadcrumbBlock />
      <AccountBlock />
    </div>
  )
}
