import React from "react";
import {Checkbox} from "antd";
import {ApplicationCard} from "./ApplicationCard";

import styles from "./styles/ExpertApplicationCard.module.scss";

export const ExpertApplicationCard = () => {
    return (
        <ApplicationCard children={
            <div className={styles.checkboxContainer}>
                <Checkbox className={styles.checkbox}>Отклонено</Checkbox>
                <Checkbox className={styles.checkbox}>Одобрено для реализации</Checkbox>
            </div>
        }/>
    );
};
