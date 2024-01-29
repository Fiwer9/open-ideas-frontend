import React, {useContext, useState} from 'react';
import styles from './styles/NewLogin.module.scss'
import {Button, Card, Form, Input} from "antd";
import {Logo} from "../PicturesComponents/Logo";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Tag} from 'antd'
import Link from "next/link";
import {Context} from "../../pages/_app";
import router from "next/router";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
const {CheckableTag } = Tag

function NewLogin() {
  const [selectedTag, setSelectedTag] = useState<string>('Вход');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const { store } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const handleChange = (tag: string) => {
    setSelectedTag(tag);
  };

  const postAuthorization = async () => {
    try {
      setLoading(true)
      const response = await store.postAuthorization(email, password);
      response&& setError(String(response))
      !response&& router.push('/queries');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Произошла ошибка');
    } finally {
      setLoading(false)
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>, setData: (value: string) => void) => {
    setData(evt.target.value);
    setError(null)
  };

  const sendCode = async () => {
    try {
      setLoading(true)
      if (password === passwordRepeat) {
        const response = await store.postRegistration(email, password);
        console.log(response)
        response&& setError(String(response))
        !response&& router.push({pathname: '/auth/code', query: {email}});
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Произошла ошибка');
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className={styles.container}>
      <Card className={selectedTag === 'Вход' ? styles.cardLog : styles.cardReg}>
        <div className={styles.logo}>
          <Logo width={200} height={50} />
        </div>
        <div className={styles.tags}>
          <CheckableTag className={styles.tag}
            key={0}
            checked={selectedTag.includes('Регистрация')}
            onChange={() => handleChange('Регистрация')}
          >
            Регистрация
          </CheckableTag>
          <em></em>
          <CheckableTag
            key={1}
            className={styles.tag}
            checked={selectedTag.includes('Вход')}
            onChange={() => handleChange('Вход')}
          >
            Вход
          </CheckableTag>
        </div>
        <Form>
          <Form.Item>
            <div className={styles.title}>
              <InputLabel title={'Почта'} />
            </div>
            <Input onChange={(evt) => handleInputChange(evt, setEmail)} status={error ? 'error' : undefined} value={!error? email : ''} placeholder={"Введите почту"} required/>
            {(error?.includes('username') || error?.includes('exists') || error?.includes('почты'))&& (
              <div className={styles.error}>
                {error}
              </div>
            )}
          </Form.Item>
          <Form.Item className={selectedTag === 'Вход' ? styles.content : ''}>
            <div className={styles.title}>
              <InputLabel title={'Пароль'} />
            </div>
            <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} onChange={(evt) => handleInputChange(evt, setPassword)} status={error ? 'error' : undefined} value={!error? password : ''}  placeholder={"Введите пароль"} required/>
            {error?.includes('password')&& (
              <div className={styles.error}>
                {error}
              </div>
            )}
          </Form.Item>
          {selectedTag === "Регистрация" && (
            <Form.Item className={styles.content}>
              <div className={styles.title}>
                <InputLabel title={'Повторите пароль'} />
              </div>
              <div className={styles.input}>
                <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} onChange={(evt) => handleInputChange(evt, setPasswordRepeat)} status={error ? 'error' : undefined} value={!error? passwordRepeat : ''}  placeholder={"Введите пароль"} required/>
                {passwordRepeat !== password && passwordRepeat && (
                  <div className={styles.error}>
                    Пароли не совпадают!
                  </div>
                )}
              </div>
            </Form.Item>
          )}
          {selectedTag === 'Вход' &&
            <Form.Item className={styles.content}>
              <Link className={styles.link} href={''}>Забыли пароль?</Link>
            </Form.Item>
          }
          <div className={styles.buttonContainer}>
            {
              selectedTag === 'Вход' ? (
                  <Button className={styles.button} type="primary" htmlType='submit' loading={loading} onClick={() => {
                    if (email && !error) {
                      postAuthorization();
                    }
                  }}>
                    Вход
                  </Button>
                ) : (
                <Button className={styles.button} type="primary" htmlType='submit' loading={loading} onClick={() => {
                  if (email && !error) {
                    sendCode();
                  }
                }}>
                  Вход
                </Button>
                )
            }
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default NewLogin;