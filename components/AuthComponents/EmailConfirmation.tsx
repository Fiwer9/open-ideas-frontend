import React from "react";
import { Form } from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";

import styles from "./styles/EmailConfirmation.module.scss";

export const EmailConfirmation = () => {
    return (
        <div className={styles.container}>
            <Form className={styles.form}>
                <Form.Item className={styles.logo}>
                    <Logo width={50} height={50}/>
                </Form.Item>
                <Form.Item className={styles.content}>
                    <div className={styles.inputlabel}>
                        <InputLabel title={"Подтверждение через почту"}/>
                    </div>
                    <p className={styles.text}>Перейдите по ссылке, отправленной <br/> на почту example@mail.ru</p>
                </Form.Item>
            </Form>
        </div>
    );
};
