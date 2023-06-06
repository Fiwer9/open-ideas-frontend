import React from "react";
import { Input } from "antd";

import styles from './styles/Input.module.scss';

export const InputPattern = ({placeholder}: any) => {
    return (
      <Input placeholder={placeholder} className={styles.input}/>
    );
};
