import React from "react";

import styles from './styles/Button.module.scss';

export const Buttons = ({text, onClick, type, props}: any) => {
    return (
      <button className={props=="disabled" ? `${styles.disabledBtn}` : `${styles.btn}`} onClick={onClick} type={type}>{text}</button>
    );
};
