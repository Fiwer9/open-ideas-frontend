import React, { memo } from "react";
import AdminPageLayout from "../AdminPageLayout";

import styles from './styles/DirectionCard.module.scss'
import { Col } from "antd";
import router from "next/router";

export const DirectionCard: React.FC = memo(() => {
  
    return (
      <>
        <AdminPageLayout>
            <div className={styles.content}>
                <div className={styles.nameDirection}>
                    <p className={styles.name}>Производственное</p>
                    <p className={styles.date}>Дата создания 25 ноября 2022 г. в 15:25</p>
                </div>

                <Col className={styles.column}>
                    <div className={styles.infContent}>
                        <div className={styles.row}>
                            <p className={styles.rowText}>Описание направления</p>
                            <p className={styles.rowInf}>
                                Направление занимающийся планово - экономическим обоснованием деятельности производства. 
                                Направление занимающийся планово - экономическим обоснованием деятельности производства.
                                Направление занимающийся планово - экономическим обоснованием деятельности производства.
                                Направление занимающийся планово - экономическим обоснованием деятельности производства.
                            </p>
                        </div>

                        <div className={styles.row}>
                            <p className={styles.rowText}>Прикреплённые эксперты</p>
                            <p className={styles.rowInf}>Иванов И. И., Бабушкин Б.Б., Иванов И. И., Бабушкин Б.Б.,Бабушкин Б.Б.,</p>
                        </div>
                    </div>
                </Col>
            </div>

            <div className={styles.btnContainer}>
                <button
                    className={`${styles.btnBlue} ${styles.btnFooter}`}
                    onClick={() =>
                        router.push(``)
                    }
                >
                    Редактировать данные инициативы
                </button>
                <button
                    className={`${styles.btnRed} ${styles.btnFooter}`}
                    onClick={() =>
                        router.push(``)
                    }
                >
                    Удалить инициативу
                </button>
            </div>
        </AdminPageLayout>
      </>
    );
  });