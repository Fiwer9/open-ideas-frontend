import React from "react";
import { Logo } from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";
import {Form} from "antd";

import styles from "./styles/Modal.module.scss";

const Modal = ({ active, setActive, text, textBtnWhite, textBtnBlue, onClickWhite, onClickBlue }: any) => {
    return (
        <>
            {active ?
              <div className={styles.modal} onClick={() => setActive(false)}>
                  <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                      <Form className={styles.modalForm}>
                          <Form.Item className={styles.logo}>
                              <Logo width={126.82} height={36} />
                          </Form.Item>
                          <Form.Item className={styles.modelText}>
                              <p className={textBtnBlue === 'Отправить'? styles.text : styles.textCancel}>{text}</p>
                          </Form.Item>
                          <div className={styles.btnContainer}>
                              <div className={styles.btnWhite}>
                                  <Buttons text={textBtnWhite} onClick={onClickWhite}/>
                              </div>
                              <div className={styles.btnBlue}>
                                  <Buttons text={textBtnBlue} onClick={onClickBlue}/>
                              </div>
                          </div>
                      </Form>
                  </div>
              </div>
            : <></>}
        </>
    );
}

export default Modal;
