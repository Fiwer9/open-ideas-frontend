import React from "react";
import { Form, Select } from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";
import {Button} from "../ButtonComponent/Button";
import {InputPattern} from "../InputComponent/Input";

import styles from './styles/Registration.module.scss';
export const Registration = () => {
    return (
        <div className={styles.container}>
            <Form className={styles.form}>
                <Form.Item className={styles.logo}>
                    <Logo />
                </Form.Item>
                <Form.Item className={styles.content}>
                    <InputLabel title={"Введите своё Ф. И. О."}/>
                    <div className={styles.input}>
                        <InputPattern placeholder={"Напишите фамилию, имя и отчество"}/>
                    </div>
                </Form.Item>
                <Form.Item className={styles.contentSelect}>
                    <InputLabel title={"Выберите свою организацию"}/>
                    <div className={styles.mySelectContainer}>
                        <Select
                            className={styles.select}
                            style={{ borderRadius: "2px" }}
                            defaultValue="Название организации"
                            options={[
                                { value: 'VolzhskayaHPP', label: 'Волжская ГЭС' },
                                { value: 'BureyskayaHPP', label: 'Бурейская ГЭС' },
                                { value: 'VotkinskayaHPP', label: 'Воткинская ГЭС' },
                                { value: 'ZagorskayaPSPP', label: 'Загорская ГАЭС' },
                            ]}
                        />
                    </div>
                </Form.Item>
                <div className={styles.containerBtn}>
                    <div className={styles.btnWhite}>
                        <Button type="submit" text={"Пропустить"}/>
                    </div>
                    <div className={styles.btnBlue}>
                        <Button type="submit" text={"Завершить"}/>
                    </div>
                </div>
            </Form>
        </div>
    );
};
