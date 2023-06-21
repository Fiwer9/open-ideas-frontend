import React, {useState} from "react";
import {Form} from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";
import {InputPattern} from "../InputComponent/Input";
import router from "next/router";

import styles from './styles/LogIn.module.scss';
import {useDispatch} from "react-redux";
import {loginUser} from "../../services/getLoginService/LoginSlice";

export const LogIn = () => {
    const [email, setEmail] = useState<string>('');

    const dispatch = useDispatch();

    const handleLogin = () => {
        // @ts-ignore
        dispatch(loginUser(email))
    }
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
                        <InputPattern onChange={(evt: any) => setEmail(evt.target.value)} value={email} placeholder="Напишите свою почту"/>
                    </div>
                </Form.Item>
                <div className={styles.btnBlue}>
                    <Buttons onClick={() => {
                        handleLogin();
                        router.push('/auth/code');
                    }} type="submit" text={'Продолжить'} />
                </div>
            </Form>
        </div>
    );
};
