import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { InputLabel } from "../InputLabelComponent/InputLabel";
import { Logo } from "../PicturesComponents/Logo";
import styles from "./styles/CodeConfirmation.module.scss";
import router from "next/router";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  selectDetail,
  selectAuthStatus,
} from "../../redux/authSlice/selectors";
import { postCodeConfirmation } from "../../redux/authSlice/asyncActions";
import { Status } from "../../redux/queriesSlice/types";
import { setStatus } from "../../redux/authSlice/slice";

type ConfirmationProps = {
  email: string;
};

export const CodeConfirmation = ({ email }: ConfirmationProps) => {
  const [code, setCode] = useState("");
  const dispatch = useAppDispatch();
  const status = useSelector(selectAuthStatus);
  const detail = useSelector(selectDetail);

  const refreshCode = () => {
    sessionStorage.clear();
    router.push("../../");
  };

  const confirmEmail = async () => {
    dispatch(
      postCodeConfirmation({
        code,
      })
    );
  };

  useEffect(() => {
    if (status !== Status.SUCCESS) {
      return;
    }
    dispatch(setStatus(Status.WAITING));
    router.push("/auth/registration/");
  }, [status]);

  const handleInputChange = (evt: any) => {
    setCode(evt.target.value);
    evt.target.value.length === 1 && dispatch(setStatus(Status.WAITING));
  };

  return (
    <div className={styles.container}>
      <Form className={styles.form}>
        <Form.Item className={styles.logo}>
          <Logo width={112} height={32} />
        </Form.Item>
        <Form.Item className={styles.content}>
          <div className={styles.title}>
            <InputLabel title={"Подтверждение через почту"} />
          </div>
          <p className={styles.text}>
            Введите код отправленный на почту {email}
          </p>
          <div className={styles.input}>
            <Input
              onChange={handleInputChange}
              status={status === Status.ERROR ? "error" : undefined}
              value={status === Status.WAITING ? code : ""}
              placeholder={"Код подтверждения с Email"}
              required
            />
          </div>
          {status === Status.ERROR && (
            <div className={styles.error}>{detail.detail}</div>
          )}
        </Form.Item>
        <div className={styles.btnBlue}>
          <Button
            loading={status === Status.LOADING}
            onClick={() => {
              if (code) {
                confirmEmail();
              }
            }}
            type="primary"
            htmlType="submit"
          >
            Подтвердить
          </Button>
        </div>
        <div className={styles.btnRepeatCode}>
          <Button type="link" onClick={refreshCode}>
            Отправить код повторно
          </Button>
        </div>
      </Form>
    </div>
  );
};
