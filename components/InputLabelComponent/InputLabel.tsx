import React from "react";

import styles from './styles/InputLabel.module.scss';


export const InputLabel = ({title}: any) => {
    return (
        <p className={styles.label}>{title}</p>
    );
};
