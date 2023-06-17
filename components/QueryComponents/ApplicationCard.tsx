import React from "react";
import {Card, Form} from "antd";
import {HeartOutlined} from "@ant-design/icons";
import {Row, Col} from "antd";
import {Logo} from "../PicturesComponents/Logo";
import {TextAreas} from "../TextAreaComponent/TextArea";
import {Buttons} from "../ButtonComponent/Button";

import styles from "./styles/ApplicationCard.module.scss";
import router from "next/router";

export const ApplicationCard = ({children}: any) => {
  return (
      <Card className={styles.card}>
          <Form className={styles.form}>
              <Form.Item className={styles.logo}>
                  <div className={styles.headerContainer}>
                      <div className={styles.logo}>
                        <Logo width={147} height={42} />
                      </div>
                      <div className={styles.headerContent}>
                          <div className={styles.iconContainer}>
                              <HeartOutlined className={styles.likes}/>
                              <p className={styles.numberLikes}>123</p>
                          </div>
                          <p className={styles.statusQuery}>Заявка отклонена</p>
                      </div>
                  </div>
              </Form.Item>
              <Col className={styles.col}>
                  <Row className={styles.row}>
                      <p className={styles.rowText}>Номер заявки:</p>
                      <p className={styles.rowInf}>1</p>
                  </Row>
                  <Row className={styles.row}>
                      <p className={styles.rowText}>Инициатива (Идея):</p>
                      <p className={styles.rowInf}>Сделать так, чтобы не дуло в кабинете 303</p>
                  </Row>
                  <Row className={styles.row}>
                      <p className={styles.rowText}>Описание инициативы:</p>
                      <p className={styles.rowInf}>Сделать так, чтобы не дуло в кабинете 303</p>
                  </Row>
                  <Row className={styles.row}>
                      <p className={styles.rowText}>Направление:</p>
                      <p className={styles.rowInf}>Рабочее пространство</p>
                  </Row>
                  <Row className={styles.row}>
                      <p className={styles.rowText}>Организация:</p>
                      <p className={styles.rowInf}>Волжская ГЭС</p>
                  </Row>
                  <Row className={styles.row}>
                      <p className={`${styles.rowText} ${styles.comments}`}>Комментарии:</p>
                  </Row>
                  <Row className={styles.row}>
                      <div className={styles.userContainer}>
                          <div className={styles.userAvatar}></div>
                          <div className={styles.user}>
                              <div className={styles.userName}>
                                  <p className={styles.name}>Иванов Олег</p>
                                  <p className={styles.status}>(Эксперт)</p>
                              </div>
                              <p className={styles.data}>19.04.2023</p>
                              <p className={styles.comment}>Согласен с данной идеей!</p>
                          </div>
                      </div>
                  </Row>
                  <Row className={styles.row}>
                      <div className={styles.userContainer}>
                          <div className={styles.userAvatar}></div>
                          <div className={styles.user}>
                              <div className={styles.userName}>
                                  <p className={styles.name}>Иванов Иван</p>
                              </div>
                              <p className={styles.data}>19.04.2023</p>
                              <p className={styles.comment}>Согласен с данной идеей!</p>
                          </div>
                      </div>
                  </Row>
              </Col>
              <Form.Item className={styles.textAreaContainer}>
                  <p className={styles.textAreaTitle}>Оставьте свой комментарий по инициативе здесь:</p>
                  <div className={styles.textArea}>
                      <TextAreas placeholder={"Напишите комментарий по этой инициативе"}/>
                  </div>
              </Form.Item>
              {children? (
                <div className={styles.footerContainerChild}>
                    <div className={styles.buttonsContainer}>
                        {children}
                    </div>
                    <div className={styles.submitBtns}>
                        <div className={styles.btnWhite}>
                          <Buttons onClick={() => router.push("/queries")} text={"Отменить"} />
                        </div>
                        <div className={`${styles.btnBlue} ${styles.btnForm}`}>
                            <Buttons onClick={() => router.push('/queries')} text={"Отправить"}/>
                        </div>
                    </div>
              </div>
                  ) : (
                  <div className={styles.footerContainer}>
                      <div className={styles.btnWhite}>
                          <Buttons onClick={() => router.push("/queries")} text={"Отменить"} />
                      </div>
                      <div className={`${styles.btnBlue} ${styles.btnForm}`}>
                          <Buttons onClick={() => router.push('/queries')} text={"Отправить"}/>
                      </div>
                  </div>
                  )}

          </Form>
      </Card>
  );
};
