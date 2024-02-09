import { Slider } from "../SliderComponents/SliderComponents";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import { Col, Form, Input } from "antd";

import styles from "./styles/OrganizationCard.module.scss";
import router from "next/router";
import Modal from "../ModalsComponents/Modal";
import React, { useState } from "react";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import { PlusCircleOutlined } from "@ant-design/icons";

function ContentModal() {
  return (
    <div className={styles.contentMod}>
      <Form.Item>
        <Input
          placeholder={"Напишите название организации"}
          className={styles.inp}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder={"Напишите название отдела"}
          className={styles.inp}
        />
      </Form.Item>
      <Form.Item>
        <FilterBar
          icon={<PlusCircleOutlined />}
          filterText={"Добавить отдел"}
        />
      </Form.Item>
    </div>
  );
}

export const OrganizationCard = () => {
  const [modalActive, setModalActive] = useState(false);
  const [secondModalActive, setSecondModalActive] = useState(false);
  const layout = <ContentModal />;

  const closeModal = () => {
    setModalActive(false);
    setSecondModalActive(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Slider />
        <div className={styles.content}>
          <Header
            userName={"Иванов Иван Иванович"}
            organization={"Aratrum"}
            department={"Отдел"}
          />
          <Tabs />
          <MainText text={"Aratreum"} />

          <Col className={styles.column}>
            <div className={styles.row}>
              <p className={styles.rowText}>Отделы</p>
            </div>
            <div className={styles.row}>
              <p className={styles.rowInf}>Отдел 1, Отдел 2</p>
            </div>
          </Col>

          <div className={styles.btnContainer}>
            <button
              className={`${styles.btnBlue} ${styles.btnFooter}`}
              onClick={() => {
                setModalActive(true);
              }}
            >
              Редактировать данные организации
            </button>
            <button
              className={`${styles.btnRed} ${styles.btnFooter}`}
              onClick={() => {
                setSecondModalActive(true);
              }}
            >
              Удалить организацию
            </button>
          </div>
        </div>
      </div>

      <Modal
        active={modalActive}
        setActive={setModalActive}
        text1={"Редактирование организации"}
        classNameBtn1={styles.btnWhite}
        textBtn1={"Назад"}
        classNameBtn2={styles.btnBlue}
        textBtn2={"Редактировать"}
        onClick1={closeModal}
        onClick2={() => router.push("/organizations/orgCard")}
        stylesContentModal={styles.contentModal}
        layout={layout}
      />

      <Modal
        active={secondModalActive}
        setActive={setSecondModalActive}
        text1={"Удалить организацию?"}
        text2={"Восстановить будет невозможно"}
        classNameBtn1={styles.btnWhite}
        textBtn1={"Назад"}
        classNameBtn2={styles.btnRed}
        textBtn2={"Удалить организацию"}
        onClick1={closeModal}
        onClick2={() => router.push("/organizations")}
        stylesContentModal={styles.contentModalDel}
      />
    </>
  );
};
