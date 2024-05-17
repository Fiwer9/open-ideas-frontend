import React, { memo, useState } from "react";
import AdminPageLayout from "../AdminPageLayout";
import { Button } from "antd";
import router from "next/router";
import { changeIsModalSubmitActive } from "../../redux/modalsSlice/slice";
import { useAppDispatch } from "../../redux/store";
import ModalAdditionalText from "../ModalsComponents/ModalAdditionalText";

import styles from './styles/DirectionCard.module.scss'

const DirectionCard: React.FC = memo(() => {
    const dispatch = useAppDispatch();

    const handleDeleteDirection = async () => {
        dispatch(changeIsModalSubmitActive(false));
        await router.push("/directions");
    };
  
    return (
      <>
        <AdminPageLayout>
            <div className={styles.content}>
                <div className={styles.nameDirection}>
                    <p className={styles.name}>Производственное</p>
                    <p className={styles.date}>Дата создания 25 ноября 2022 г. в 15:25</p>
                </div>

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
            </div>

            <div className={styles.btnContainer}>
                <Button
                    type="primary"
                    className={styles.btnBlue}
                    onClick={() => {router.push(`/directions/editingDirection`)}}
                >
                    Редактировать данные инициативы
                </Button>
                <Button
                    danger
                    className={styles.btnRed}
                    onClick={() => {dispatch(changeIsModalSubmitActive(true))}}
                >
                    Удалить инициативу
                </Button>
            </div>
        </AdminPageLayout>

        <ModalAdditionalText
            text={"Удалить направление?"}
            additionalText={"Восстановить будет невозможно"}
            handleOk={handleDeleteDirection}
        />
      </>
    );
  });

export default DirectionCard;