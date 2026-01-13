import React, { memo, ReactNode } from "react";

import { Slider } from "../SliderComponents/SliderComponents";
import { Tabs } from "../TabsComponent/Tabs";
import { Header } from "../HeaderComponents/Header";

import { SliderSmall } from "../SliderComponents/SliderSmall";

import styles from "./styles.module.scss";

interface AdminPageLayoutProps {
  children: ReactNode;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <Slider />
      </div>
      <div className={styles.content}>
        <div className={styles.headerContainer}>
          <Header />
        </div>
        <Tabs />
        {children}
      </div>
      <div className={styles.sliderSmall}>
        <SliderSmall />
      </div>
    </div>
  );
};

export default memo(AdminPageLayout);
