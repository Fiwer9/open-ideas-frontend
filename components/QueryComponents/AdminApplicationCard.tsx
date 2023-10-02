import { Slider } from "../SliderComponents/SliderComponents";
import styles from "./styles/AdminApplicationCard.module.scss";
import { HeartOutlined } from "@ant-design/icons";
import { Col, Select } from "antd";
import avatar from "../../public/img/AvatarAratrum.svg";
import Image from "next/image";
import router from "next/router";
import Modal from "../ModalsComponents/Modal";
import React, { useState } from "react";


export const AdminApplicationCard = () => {
  const [modalActive, setModalActive] = useState(false);

  const closeModal = () => {
    setModalActive(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Slider/>
        <div className={styles.content}>
          <div>
            <div>
              <div className={styles.headerContainer}>
                <p className={styles.nameInitiative}>Инициатива №1</p>
                <div className={styles.btnHeader}>
                  <div className={styles.likesContainer}>
                    <button className={styles.btnLike}>
                      <HeartOutlined />
                    </button>
                    <p className={styles.numberLikes}>123</p>
                  </div>

                  <Select
                    className={styles.select}
                    style={{color: '#BFBFBF'}}
                    defaultValue="В процессе"
                    options={[
                      { value: 'value1', label: 'В процессе' },
                      { value: 'value2', label: 'Отклонена' },
                      { value: 'value3', label: 'Выполнена' },
                    ]}
                  />
                </div>
              </div>
              <p className={styles.data}>Дата создания 25 ноября 2022 г. в 15:25</p>
            </div>

            <Col className={styles.column}>
              <div className={styles.row}>
                <p className={styles.rowText}>Получено от:</p>
                <p className={styles.rowText}>Инициатива (Идея):</p>
                <p className={styles.rowText}>Описание инициативы:</p>
                <p className={styles.rowText}>Эффект от доработки:</p>
                <p className={styles.rowText}>Направление:</p>
                <p className={styles.rowText}>Организация:</p>
                <p className={styles.rowText}>Отдел:</p>
                <p className={styles.rowText}>Назначенный эксперт:</p>
              </div>
              <div className={styles.row}>
                <p className={styles.rowInf}>Иванов Виктор Анатольевич</p>
                <p className={styles.rowInf}>Сделать так, чтобы не дуло в кабинете 303</p>
                <p className={styles.rowInf}>Сделать так, чтобы не дуло в кабинете 303</p>
                <p className={styles.rowInf}>Сделать так, чтобы не дуло в кабинете 303</p>
                <p className={styles.rowInf}>Рабочее пространство</p>
                <p className={styles.rowInf}>Волжская ГЭС</p>
                <p className={styles.rowInf}>Отдел</p>
                <p className={styles.rowInf}>Иванов Олег</p>
              </div>
            </Col>

            <div className={styles.commentContainer}>
              <p className={styles.comment}>Комментарии:</p>
            </div>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                <div className={styles.userImg}>
                  <Image src={avatar} alt={"Avatar"}/>
                </div>
                <div className={styles.infComment}>
                  <p className={styles.name}>Иванов Олег (Эксперт)</p>
                  <p className={styles.date}>19.04.2023</p>
                  <p className={styles.commentText}>Согласен с данной идеей!</p>
                </div>
              </div>
              <div className={styles.avatar}>
                <div className={styles.userImg}>
                  <Image src={avatar} alt={"Avatar"}/>
                </div>
                <div className={styles.infComment}>
                  <p className={styles.name}>Иванов Олег</p>
                  <p className={styles.date}>19.04.2023</p>
                  <p className={styles.commentText}>Согласен с данной идеей!</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button className={`${styles.btnBlue} ${styles.btnFooter}`} onClick={() => router.push('/queries/editingApplication')}>Редактировать данные инициативы</button>
            <button className={`${styles.btnRed} ${styles.btnFooter}`}
                    onClick={() => {
                      setModalActive(true);
                    }}>Удалить инициативу</button>
          </div>
        </div>
      </div>

      <Modal
        className={styles.models} active={modalActive} setActive={setModalActive}
        text1={"Удалить инициативу?"}
        text2={"Восстановить будет невозможно"}
        classNameBtn1={styles.btnBlue}
        textBtn1={"Назад"}
        classNameBtn2={styles.btnRed}
        textBtn2={"Удалить инициативу"}
        onClick1={closeModal}
        onClick2={() => router.push('/queries')}
      />
    </>
  );
};
