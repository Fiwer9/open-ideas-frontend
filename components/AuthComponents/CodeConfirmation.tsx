import React from "react";
import { Form } from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";
import {InputPattern} from "../InputComponent/Input";
import styles from "./styles/CodeConfirmation.module.scss";
import router from "next/router";

export const CodeConfirmation = () => {
    return (
        <div className={styles.container}>
            <Form className={styles.form}>
                <Form.Item className={styles.logo}>
                    <Logo />
                </Form.Item>
                <Form.Item className={styles.content}>
                    <div className={styles.title}>
                        <InputLabel title={"Подтверждение через почту"}/>
                    </div>
                    <p className={styles.text}>Введите код отправленный на почту example@mail.ru</p>
                    <div className={styles.input}>
                        <InputPattern placeholder={"Код подтверждения с Email"}/>
                    </div>
                </Form.Item>
                <div className={styles.btnBlue}>
                    <Buttons onClick={() => router.push('/queries')} type="submit" text={"Подтвердить"}/>
                </div>
                <div className={styles.btnRepeatCode}>
                    <Buttons onClick={() => router.push('../../')}  text={'Отправить код повторно'}/>
                </div>
            </Form>
        </div>
    );
};
