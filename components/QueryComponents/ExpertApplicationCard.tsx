import React, {useEffect, useState} from "react";
import {Checkbox} from "antd";
import {ApplicationCard} from "./ApplicationCard";

import styles from "./styles/ExpertApplicationCard.module.scss";

export const ExpertApplicationCard = ({queryId}: { queryId: string }) => {
    const [status, setStatus] = useState('')
    useEffect(() => {
        console.log(status)
    }, [status])
    return (
        <ApplicationCard status={status} queryId={queryId} children={
            <div className={styles.checkboxContainer}>
                <Checkbox className={styles.checkbox} onChange={(e) => setStatus(e.target.value)} value={status}>Отклонено</Checkbox>
                <Checkbox className={styles.checkbox} onChange={(e) => setStatus(e.target.value)} value={status}>Одобрено для реализации</Checkbox>
            </div>
        }/>
    );
};
