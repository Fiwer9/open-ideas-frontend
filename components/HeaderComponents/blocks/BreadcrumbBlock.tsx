import React from "react";
import {Breadcrumb} from "antd";
import styles from "../styles/Breadcrumb.module.scss";

interface BreadcrumbBlockProps {
  items: any;
}

export const BreadcrumbBlock = (props: BreadcrumbBlockProps) => {
  return (
    <Breadcrumb className={styles.breadcrumb} items={props.items} />
  )
}
