import React from "react";
import {BreadcrumbBlock} from "./blocks/BreadcrumbBlock";
import {AccountBlock} from "./blocks/AccountBlock";
import styles from "./styles/Header.module.scss";

interface HeaderProps {
  user_name: string;
  organization: string;
  department: string;
}

const breadcrumb_items = [
  {
    title: 'Панель администратора',
  },
  {
    title: 'Таблица инициатив'
  }
]

export const Header = (props: HeaderProps) => {
  return (
    <div className={styles.header}>
      <BreadcrumbBlock items={breadcrumb_items}/>
      <AccountBlock user_name={props.user_name} organization={props.organization} department={props.department}/>
    </div>
  )
}
