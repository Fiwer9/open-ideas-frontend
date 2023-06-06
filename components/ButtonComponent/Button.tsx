import React from "react";

import styles from './styles/Button.module.scss';

export const Button = ({text}: any) => {
    return (
      <button className={styles.btn}>{text}</button>
    );
};
