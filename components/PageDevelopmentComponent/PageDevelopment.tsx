import React from "react";

import router from "next/router";

import Logo from "../PicturesComponents/Logo";

import styles from "./styles/PageDevelopment.module.scss";

export const PageDevelopment = () => {
  return (
    <>
      <div className={styles.logotip}>
        <Logo width={250} height={170} big={true} />
      </div>
      <div className={styles.container}>
        <p className={styles.page}>Страница в разработке</p>
        <button
          className={`${styles.btnBlue} ${styles.btnPage}`}
          onClick={() => router.push("/queries")}
        >
          Назад
        </button>
      </div>
    </>
  );
};
