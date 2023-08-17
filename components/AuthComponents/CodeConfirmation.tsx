import React, {useContext, useState} from "react";
import {Form, Input} from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";
import styles from "./styles/CodeConfirmation.module.scss";
import router from "next/router";
import {Context} from "../../pages/_app";
import AuthService from "../../services/LoginService";

type ConfirmationProps = {
    email: string;
};

export const CodeConfirmation = ({ email }: ConfirmationProps) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { store } = useContext(Context);

    const confirmEmail = async () => {
        try {
            const response = await store.confirmEmail(code);
            response&& setError(String(response))
        } catch (error: any) {
            setError(error.response?.data?.message || 'Произошла ошибка');
        }
    };

    const verificationUser = async () => {
      try {
          const users = await AuthService.confirmEmail(code);
          console.log(users.data);
          if (!users.data.is_verified) {
              router.push('/auth/registration')
          } else {
              router.push('/queries')
          }
      } catch (error: any) {
          setError(error.response?.data?.message || 'Произошла ошибка');
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
                    <Buttons onClick={() => {
                        if (code && !error) {
                            confirmEmail();
                            verificationUser();
                        }
                    }} type="submit" text={"Подтвердить"}/>
                </div>
                <div className={styles.btnRepeatCode}>
                    <Buttons text={'Отправить код повторно'} onClick={() => router.push('../../')}/>
                </div>
            </Form>
        </div>
    );
};
