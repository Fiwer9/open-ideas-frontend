import React, { memo } from "react";

import { Header } from "../HeaderComponents/Header";

import Logo from "../PicturesComponents/Logo";
import { Tabs } from "../TabsComponent/Tabs";

import styles from "./styles.module.scss";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.containerIdeas}>
      <div className={styles.contentIdeas}>
        <div className={styles.headerContainer}>
          <Header />
        </div>
        <div className={styles.header}>
          <div className={styles.logoHeader}>
            <Logo width={190} height={53} />
          </div>
          <div className={styles.tabs}>
            <Tabs />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default memo(PageLayout);
