import React from "react";
import logout from "../../public/img/logout.svg";
import Image from "next/image";
import styles from "./styles/Logout.module.scss";
import { Button } from "antd";

export const LogOut = () => {
  const handleLogout = () => {
    // try {
    //   store.logout();
    //
    //   router.push("/");
    // } catch (error: any) {
    //   console.error(error.response?.data?.message);
    // }
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
