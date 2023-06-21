import React from "react";
import {Form} from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";
import {InputPattern} from "../InputComponent/Input";
import router from "next/router";

import styles from './styles/LogIn.module.scss';

export const LogIn = () => {
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
                        <InputPattern placeholder="Напишите свою почту"/>
                    </div>
                </Form.Item>
                <div className={styles.btnBlue}>
                    <Buttons onClick={() => router.push('/auth/code')} type="submit" text={'Продолжить'} />
                </div>
            </Form>
        </div>
    );
};
