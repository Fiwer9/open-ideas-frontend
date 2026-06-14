import React from "react";
import { Input } from "antd";

import styles from "./styles/Input.module.scss";

export const InputPattern = ({ placeholder, onChange }: any) => {
  return (
    <Input
      placeholder={placeholder}
      className={styles.input}
      onChange={onChange}
    />
  );
};
