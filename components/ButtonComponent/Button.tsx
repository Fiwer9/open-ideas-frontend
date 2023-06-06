import React from "react";

import styles from './styles/Button.module.scss';

export const Buttons = ({text, onClick}: any) => {
    return (
      <button className={styles.btn} onClick={onClick}>{text}</button>
    );
};
