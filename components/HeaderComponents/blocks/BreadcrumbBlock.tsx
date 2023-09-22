import React from "react";
import {Breadcrumb} from "antd";
import styles from "../styles/Breadcrumb.module.scss";

export const BreadcrumbBlock = () => {
  return (
    <Breadcrumb className={styles.breadcrumb}>
      <Breadcrumb.Item>Панель администратора</Breadcrumb.Item>
      <Breadcrumb.Item>Таблица инициатив</Breadcrumb.Item>
    </Breadcrumb>
  )
}
