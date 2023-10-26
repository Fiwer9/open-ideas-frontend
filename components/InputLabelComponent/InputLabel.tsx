import React from "react";

import styles from './styles/InputLabel.module.scss';


export const InputLabel = ({title, label2}: any) => {
    return (
        <p className={`${styles.label} ${label2}`}>{title}</p>
    );
};
