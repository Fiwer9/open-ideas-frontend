import React, {useContext, useState} from "react";
import {Form, Input} from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";
import router from "next/router";

import styles from './styles/LogIn.module.scss';
import {Context} from "../../pages/_app";

export const LogIn = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Добавляем состояние для ошибки
    const { store } = useContext(Context);

    const sendCode = async () => {
        try {
            const response = await store.sendCode(email);
            response&& setError(String(response))
            !response&& router.push({
                pathname: '/auth/code',
                query: { email: email }
            });
        } catch (error: any) {
            setError(error.response?.data?.message || 'Произошла ошибка');
        }
    };

    const handleInputChange = (evt: any) => {
        setEmail(evt.target.value);
        setError(null)
    };

    return (
        <div className={styles.container}>
            <Form className={styles.form}>
                <Form.Item className={styles.logo}>
                    <Logo width={112} height={32} />
                </Form.Item>
                <Form.Item className={styles.content}>
                    <div className={styles.title}>
                        <InputLabel title={'Войдите при помощи почты'} />
                    </div>
                    <div className={styles.input}>
                        <Input onChange={handleInputChange} status={error ? 'error' : undefined} value={!error? email : ''} placeholder={"Напишите свою почту"} required/>
                    </div>
                    {error&& (
                        <div className={styles.error}>
                            {error.substring(0, error.length - 1)}
                        </div>
                    )}
                </Form.Item>
                <div className={styles.btnBlue}>
                    <Buttons onClick={() => {
                        if (email && !error) {
                            sendCode();
                        }
                    }} type="submit" text={'Продолжить'} />
                </div>
            </Form>
        </div>
    );
};
