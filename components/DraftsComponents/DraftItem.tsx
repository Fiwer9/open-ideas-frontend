import React from "react";
import styles from './styles/DraftItem.module.scss'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";

export const DraftItem = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headerDraft}>
            <p className={styles.nameDraft}>Подача идеи</p>
            <p className={styles.dateDraft}>06.02.2024</p>
          </div>

          <div className={styles.infDraft}>
            <p className={styles.textDraft}>Сделать так, чтобы не скрипела дверь в кабинете 203</p>
            <div className={styles.btnContainer}>
              <button className={styles.btnDraft}><EditOutlined style={{color: '#00A71B'}} /></button>
              <button className={styles.btnDraft}><DeleteOutlined style={{color: '#EC0B4E'}} /></button>
              <Checkbox className={styles.btnDraft} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
