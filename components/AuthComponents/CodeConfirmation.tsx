import React, {useContext, useState} from "react";
import {Button, Form, Input} from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";
import styles from "./styles/CodeConfirmation.module.scss";
import router from "next/router";
import {Context} from "../../pages/_app";

type ConfirmationProps = {
    email: string;
};

export const CodeConfirmation = ({ email }: ConfirmationProps) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { store } = useContext(Context)
    const [loading, setLoading] = useState(false);


    const isVerified = (response: any) => {
        if (!response.is_verified) {
            router.push('/auth/registration')
        } else {
            router.push('/queries')
        }
    }

    const confirmEmail = async () => {
        try {
            setLoading(true)
            const response = await store.confirmEmail(code);
            if (typeof response === 'string') {
                setError(response);
            } else {
                !error && isVerified(response);
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Произошла ошибка');
        } finally {
            setLoading(false)
        }
    };

    const handleInputChange = (evt: any) => {
        setCode(evt.target.value)
        setError(null)
    };

    return (
        <div className={styles.container}>
            <Form className={styles.form}>
                <Form.Item className={styles.logo}>
                    <Logo width={112} height={32}/>
                </Form.Item>
                <Form.Item className={styles.content}>
                    <div className={styles.title}>
                        <InputLabel title={"Подтверждение через почту"}/>
                    </div>
                    <p className={styles.text}>Введите код отправленный на почту {email}</p>
                    <div className={styles.input}>
                        <Input onChange={handleInputChange} status={error ? 'error' : undefined} value={!error? code : ''} placeholder={"Код подтверждения с Email"} required/>
                    </div>
                    {error&& (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}
                </Form.Item>
                <div className={styles.btnBlue}>
                    <Button loading={loading} onClick={() => {
                        if (code && !error) {
                            confirmEmail();
                        }
                    }} type="primary" htmlType='submit'>
                        Подтвердить
                    </Button>
                </div>
                <div className={styles.btnRepeatCode}>
                    <Button type='link' onClick={() => router.push('../../')}>Отправить код повторно </Button>
                </div>
            </Form>
        </div>
    );
};
