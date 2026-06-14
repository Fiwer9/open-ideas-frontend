import React, { memo } from "react";

import styles from "./styles/InputLabel.module.scss";

interface InputLabelProps {
  title: string;
  className?: any;
}

export const InputLabel: React.FC<InputLabelProps> = memo(
  ({ title, className }) => {
    return <p className={`${styles.label} ${className}`}>{title}</p>;
  }
);
