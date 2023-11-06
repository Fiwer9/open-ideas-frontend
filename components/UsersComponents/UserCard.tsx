import React from "react";
import { Slider } from "../SliderComponents/SliderComponents";
import { Tabs } from "../TabsComponent/Tabs";
import { Header } from "../HeaderComponents/Header";
import Image from "next/image";
import avatar from "../../public/img/AvatarAratrum.svg";

import styles from "./styles/UserCard.module.scss";
import { Button, Col } from "antd";
import router from "next/router";


export const UserCard = () => {

  return (
    <>
      <div className={styles.container}>
        <Slider/>
        <div className={styles.content}>
          <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
          <Tabs />
          <div className={styles.userContainer}>
            <Image src={avatar} alt={'Аватар'} width={190} height={190}/>

            <div className={styles.infUser}>
              <p className={styles.nameUser}>Иванов Иван Иванович</p>

              <Col className={styles.column}>
                <div className={styles.row}>
                  <p className={styles.rowField}>E-mail:</p>
                  <p className={styles.rowField}>Эксперт по инициативам:</p>
                  <p className={`${styles.rowField} ${styles.orgUser}`}>Организация:</p>
                  <p className={styles.rowField}>Отдел:</p>
                </div>

                <div className={styles.row}>
                  <p className={styles.rowInf}>example@mail.ru</p>
                  <p className={styles.rowInf}>№1, №123, №98453</p>
                  <p className={`${styles.rowInf} ${styles.orgUser}`}>Aratrum</p>
                  <p className={styles.rowInf}>IT-отдел</p>
                </div>
              </Col>

              <Button className={styles.btnFooter} type="primary" onClick={() => router.push('/users/editingUser')}>
                <span>Редактировать профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
