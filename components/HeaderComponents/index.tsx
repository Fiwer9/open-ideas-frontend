import React from "react";
import {BreadcrumbBlock} from "./blocks/BreadcrumbBlock";
import {AccountBlock} from "./blocks/AccountBlock";
import styles from "./styles/index.module.scss";

interface HeaderProps {
  user_name: string;
  organization: string;
  department: string;
  breadcrumb_items: any;
}

export const Header = (props: HeaderProps) => {
  return (
    <div className={styles.header}>
      <BreadcrumbBlock items={props.breadcrumb_items}/>
      <AccountBlock user_name={props.user_name} organization={props.organization} department={props.department}/>
    </div>
  )
}
