import React, { useEffect, useState } from "react";
import styles from "./styles/NewLogin.module.scss";
import { Button, Card, Form, Input, Tag } from "antd";
import { Logo } from "../PicturesComponents/Logo";
import { InputLabel } from "../InputLabelComponent/InputLabel";
import Link from "next/link";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectStatus } from "../../redux/authSlice/selectors";
import {
  postAuthorization,
  postRegistration,
} from "../../redux/authSlice/asyncActions";
import { Status } from "../../redux/queriesSlice/types";
import { setStatus } from "../../redux/authSlice/slice";
import router from "next/router";

const { CheckableTag } = Tag;

function NewLogin() {
  const [selectedTag, setSelectedTag] = useState<string>("Вход");
  const [email, setEmail] = useState<string>("");
  const status = useSelector(selectStatus);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const dispatch = useAppDispatch();
  const handleChange = (tag: string) => {
    setSelectedTag(tag);
  };

  const postAuth = async () => {
    dispatch(
      postAuthorization({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (status !== Status.SUCCESS) {
      return;
    }
    dispatch(setStatus(Status.WAITING));
    selectedTag === "Вход" && router.push("/queries");
    selectedTag === "Регистрация" &&
      router.push({ pathname: "/auth/code", query: { email } });
  }, [status]);

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    setData: (value: string) => void
  ) => {
    setData(evt.target.value);
    evt.target.value.length === 1 && dispatch(setStatus(Status.WAITING));
  };

  const sendCode = async () => {
    if (password === passwordRepeat) {
      dispatch(
        postRegistration({
          email,
          password,
        })
      );
    }
  };

  useEffect(() => {
    if (status === Status.ERROR) {
      setEmail("");
      setPassword("");
      setPasswordRepeat("");
    }
  }, [status]);

  return (
    <div className={styles.container}>
      <Card
        className={selectedTag === "Вход" ? styles.cardLog : styles.cardReg}
      >
        <div className={styles.logo}>
          <Logo width={200} height={50} />
        </div>
        <div className={styles.tags}>
          <CheckableTag
            className={styles.tag}
            key={0}
            checked={selectedTag.includes("Регистрация")}
            onChange={() => handleChange("Регистрация")}
          >
            Регистрация
          </CheckableTag>
          <em></em>
          <CheckableTag
            key={1}
            className={styles.tag}
            checked={selectedTag.includes("Вход")}
            onChange={() => handleChange("Вход")}
          >
            Вход
          </CheckableTag>
        </div>
        <Form>
          <Form.Item>
            <div className={styles.title}>
              <InputLabel title={"Почта"} />
            </div>
            <Input
              onChange={(evt) => handleInputChange(evt, setEmail)}
              status={status === Status.ERROR ? "error" : undefined}
              value={status !== Status.ERROR ? email : ""}
              placeholder={"Введите почту"}
              required
            />
          </Form.Item>
          <Form.Item className={selectedTag === "Вход" ? styles.content : ""}>
            <div className={styles.title}>
              <InputLabel title={"Пароль"} />
            </div>
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(evt) => handleInputChange(evt, setPassword)}
              status={status === Status.ERROR ? "error" : undefined}
              value={status !== Status.ERROR ? password : ""}
              placeholder={"Введите пароль"}
              required
            />
            {status === Status.ERROR && selectedTag === "Вход" && (
              <div className={styles.error}>
                Не правильный логин или пароль!
              </div>
            )}
          </Form.Item>
          {selectedTag === "Регистрация" && (
            <Form.Item className={styles.content}>
              <div className={styles.title}>
                <InputLabel title={"Повторите пароль"} />
              </div>
              <div className={styles.input}>
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={(evt) => handleInputChange(evt, setPasswordRepeat)}
                  status={status === Status.ERROR ? "error" : undefined}
                  value={status !== Status.ERROR ? passwordRepeat : ""}
                  placeholder={"Введите пароль"}
                  required
                />
                {passwordRepeat !== password && passwordRepeat && (
                  <div className={styles.error}>Пароли не совпадают!</div>
                )}
                {status === Status.ERROR && (
                  <div className={styles.error}>
                    Вход с этим доменом невозможен или такой пользователь уже
                    есть!
                  </div>
                )}
              </div>
            </Form.Item>
          )}
          {selectedTag === "Вход" && (
            <Form.Item className={styles.content}>
              <Link className={styles.link} href={""}>
                Забыли пароль?
              </Link>
            </Form.Item>
          )}
          <div className={styles.buttonContainer}>
            {selectedTag === "Вход" ? (
              <Button
                className={styles.button}
                type="primary"
                htmlType="submit"
                loading={status === Status.LOADING}
                onClick={() => {
                  if (email && password) {
                    postAuth();
                  }
                }}
              >
                Вход
              </Button>
            ) : (
              <Button
                className={styles.button}
                type="primary"
                htmlType="submit"
                loading={status === Status.LOADING}
                onClick={() => {
                  if (email && password && passwordRepeat) {
                    sendCode();
                  }
                }}
              >
                Вход
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default NewLogin;
