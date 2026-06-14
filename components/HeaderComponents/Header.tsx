import React, { memo } from "react";

import { BreadcrumbBlock } from "./blocks/BreadcrumbBlock";
import { AccountBlock } from "./blocks/AccountBlock";
import styles from "./styles/Header.module.scss";

export const Header: React.FC = memo(() => {
  return (
    <div className={styles.header}>
      <BreadcrumbBlock />
      <AccountBlock />
    </div>
  );
});
