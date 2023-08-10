import React, {useContext, useState} from "react";
import {Form, Input} from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";
import styles from "./styles/CodeConfirmation.module.scss";
import router from "next/router";
import {Context} from "../../pages/_app";
import UsersService from "../../services/UsersService";
import {UserResponse} from "../../models/response/UserResponse";

type ConfirmationProps = {
    email: string;
};

export const CodeConfirmation = ({ email }: ConfirmationProps) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<UserResponse[]>([]);
    const { store } = useContext(Context);

    const confirmEmail = async () => {
        try {
            const response = await store.confirmEmail(code);
            response&& setError(String(response))
            !response&& router.push('/auth/registration')
        } catch (error: any) {
            setError(error.response?.data?.message || 'Произошла ошибка');
        }
    };

    const verificationUser = async () => {
      try {
          const users: any = await UsersService.getUsers();
          console.log(users.data);
          setUsers(users.data);

          users.data.map((user: any) => {
              if (user.email === email) {
                  console.log(user.email)
                  console.log(users.data.email)
                  router.push('/queries')
              } else {
                  router.push('../../')
              }
          })
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
