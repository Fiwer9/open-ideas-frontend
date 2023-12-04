import React from "react";

import styles from './styles/PageDevelopment.module.scss';
import router from "next/router";

export const PageDevelopment = () => {
  return (
    <div className={styles.container}>
      <p className={styles.page}>Страница в разработке</p>
      <button className={`${styles.btnBlue} ${styles.btnPage}`} onClick={() => router.push('/queries')}>Назад</button>
    </div>
  );
};
