import React, {useState} from "react";
import {Form, Input, Select} from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";

import styles from './styles/Registration.module.scss';
import router from "next/router";

export const Registration = () => {
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Добавляем состояние для ошибки

    const handleInputChange = (evt: any) => {
        setName(evt.target.value);
        setError(null)
    };

    return (
        <div className={styles.container}>
            <Form className={styles.form}>
                <Form.Item className={styles.logo}>
                    <Logo />
                </Form.Item>
                <Form.Item className={styles.content}>
                    <InputLabel className={styles.title} title={"Введите своё Ф. И. О."}/>
                    <div className={styles.input}>
                        <Input onChange={handleInputChange} placeholder={"Напишите фамилию, имя и отчество"} required/>
                    </div>
                </Form.Item>
                <Form.Item className={styles.contentSelect} rules={[{required: true}]}>
                    <InputLabel className={styles.contentSelectTitle} title={"Выберите свою организацию"}/>
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
                <Form.Item className={styles.contentSelect} rules={[{required: true}]}>
                    <InputLabel className={styles.contentSelectTitle} title={"Выберите свой отдел"}/>
                    <div className={styles.mySelectContainer}>
                        <Select
                            className={styles.select}
                            style={{ borderRadius: "2px" }}
                            defaultValue="Название отдела"
                            options={[
                                { value: 'IT', label: 'Отдел IT' },
                                { value: 'economic', label: 'Экономический отдел' },
                                { value: 'juridical', label: 'Юридический отдел' },
                                { value: 'safety', label: 'Отдел безопасности' },
                            ]}
                        />
                    </div>
                </Form.Item>
                <div className={styles.containerBtn}>
                    <div className={styles.btnWhite}>
                        <Buttons
                            type="submit"
                            text={"Назад"}
                            onClick={() => router.push('/auth/code')}/>
                    </div>
                    <div className={styles.btnBlue}>
                        <Buttons
                            type="submit"
                            text={"Завершить"}
                            onClick={() => {
                            if (name && !error) {
                                router.push('/queries')
                            }
                        }}/>
                    </div>
                </div>
            </Form>
        </div>
    );
};
