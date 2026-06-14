import React from "react";

import Image from "next/image";

import { Button } from "antd";

import { useRouter } from "next/router";

import AuthService from "../../services/LoginService";
import logout from "../../public/img/logout.svg";

import styles from "./styles/Logout.module.scss";

export const LogOut = () => {
  const router = useRouter();
  const handleLogout = () => {
    try {
      AuthService.logout();

      router.push("/");
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(error.response?.data?.message);
    }
  };
  return (
    <div className={styles.linkContainer} onClick={handleLogout}>
      <Button className={styles.link} type="link">
        <Image
          className={styles.logout}
          src={logout}
          width={30}
          alt={"Выход"}
        ></Image>
        ВЫХОД
      </Button>
    </div>
  );
};
