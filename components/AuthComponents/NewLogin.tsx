import React, { useState } from "react";
import styles from "./styles/NewLogin.module.scss";
import { Button, Card, Form, Input, Tag } from "antd";
import { Logo } from "../PicturesComponents/Logo";
import { InputLabel } from "../InputLabelComponent/InputLabel";
import Link from "next/link";
import router from "next/router";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectStatus } from "../../redux/authSlice/selectors";
import {
  postAuthorization,
  postRegistration,
} from "../../redux/authSlice/asyncActions";
import { Status } from "../../redux/queriesSlice/types";

const { CheckableTag } = Tag;

function NewLogin() {
  const [selectedTag, setSelectedTag] = useState<string>("Вход");
  const [email, setEmail] = useState<string>("");
  const status = useSelector(selectStatus);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const dispatch = useAppDispatch();
  const handleChange = (tag: string) => {
    setSelectedTag(tag);
  };

  const postAuth = async () => {
    console.log(email, password);
    dispatch(
      postAuthorization({
        email,
        password,
      })
    );
    status === Status.SUCCESS && router.push("/queries");
  };

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    setData: (value: string) => void
  ) => {
    setData(evt.target.value);
    setError(null);
  };

  const sendCode = async () => {
    if (password === passwordRepeat) {
      dispatch(
        postRegistration({
          email,
          password,
        })
      );
      router.push({ pathname: "/auth/code", query: { email } });
    }
  };
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
              status={error ? "error" : undefined}
              value={!error ? email : ""}
              placeholder={"Введите почту"}
              required
            />
            {(error?.includes("username") ||
              error?.includes("exists") ||
              error?.includes("почты")) && (
              <div className={styles.error}>{error}</div>
            )}
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
              status={error ? "error" : undefined}
              value={!error ? password : ""}
              placeholder={"Введите пароль"}
              required
            />
            {error?.includes("password") && (
              <div className={styles.error}>{error}</div>
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
                  status={error ? "error" : undefined}
                  value={!error ? passwordRepeat : ""}
                  placeholder={"Введите пароль"}
                  required
                />
                {passwordRepeat !== password && passwordRepeat && (
                  <div className={styles.error}>Пароли не совпадают!</div>
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
                  if (email) {
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
                  if (email && !error) {
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
