import React from "react";
import { Logo } from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";
import {Form} from "antd";

import styles from "./styles/Modal.module.scss";

const Modal = ({ active, setActive, text1, text2, textBtn1, textBtn2, onClick1, onClick2, classNameBtn1,  classNameBtn2}: any) => {
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
                              <p className={textBtn2 === 'Отправить'? styles.text : styles.textCancel}>{text1}</p>
                              <p className={styles.text2}>{text2}</p>
                          </Form.Item>
                          <div className={styles.btnContainer}>
                              <div className={classNameBtn1}>
                                  <Buttons className={styles.btnModal} text={textBtn1} onClick={onClick1}/>
                              </div>
                              <div className={classNameBtn2}>
                                  <Buttons className={styles.btnModal} text={textBtn2} onClick={onClick2}/>
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
