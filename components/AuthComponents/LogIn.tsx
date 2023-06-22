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
    const { store } = useContext(Context);

    const sendCode = async () => {
        try {
            await store.sendCode(email);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
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
                        <Input onChange={(evt: any) => setEmail(evt.target.value)} value={email} placeholder="Напишите свою почту"/>
                    </div>
                </Form.Item>
                <div className={styles.btnBlue}>
                    <Buttons onClick={() => {
                        sendCode();
                        router.push('/auth/code');
                    }} type="submit" text={'Продолжить'} />
                </div>
            </Form>
        </div>
    );
};
