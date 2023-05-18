import React from "react";
import { Input } from "antd";

import styles from "../TextAreaComponent/styles/TextArea.module.scss";

const { TextArea } = Input;
export const TextAreas = ({placeholder}: any) => {
    return (
        <TextArea rows={6} placeholder={placeholder} className={styles.textArea}/>
    );
};
