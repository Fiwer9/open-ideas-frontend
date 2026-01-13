import { Form } from "antd";

import React, { memo } from "react";
import { DeleteOutlined } from "@ant-design/icons";

import Logo from "../PicturesComponents/Logo";
import { Buttons } from "../ButtonComponent/Button";
import DraftItem from "../DraftsComponents/DraftItem";
import CheckboxBlock from "../FilterComponents/blocks/CheckboxBlock";

import styles from "./styles/Modal.module.scss";

interface ModalProps {
  active: any;
  setActive: any;
  text: string;
  textBtn: string;
  onClick: any;
  classNameBtn: any;
}

const ModalDrafts = ({
  active,
  setActive,
  text,
  textBtn,
  onClick,
  classNameBtn,
}: ModalProps) => {
  if (!active) {
    return;
  }

  return (
    <>
      <div className={styles.modal} onClick={() => setActive(false)}>
        <div
          className={styles.modalContentDrafts}
          onClick={(e) => e.stopPropagation()}
        >
          <Form className={styles.modalForm}>
            <div className={styles.logo}>
              <Logo width={126.82} height={36} />
            </div>

            <div className={styles.modelText}>
              <p className={styles.text}>{text}</p>
            </div>

            <div className={styles.content}>
              <div className={styles.nameModal}>
                <p className={styles.textDrafts}>
                  Черновики сохраняются 30 дней. <br /> После этого времени они
                  будут удалены.
                </p>
              </div>

              <Form.Item className={styles.contentHeader}>
                <div className={styles.btnDrafts}>
                  <button className={styles.deleteDrafts}>
                    <DeleteOutlined
                      style={{ color: "#EC0B4E", fontSize: 21 }}
                    />
                  </button>
                  <CheckboxBlock
                    name={"drafts"}
                    checkboxText={"Выбрать все черновики"}
                    paddings={0}
                  />
                </div>
              </Form.Item>
            </div>

            <Form.Item className={styles.draftItem}>
              <DraftItem />
            </Form.Item>

            <Form.Item className={styles.darftItem}>
              <DraftItem />
            </Form.Item>

            <div className={styles.btnContainer}>
              <div className={classNameBtn}>
                <Buttons
                  className={styles.btnModal}
                  type={"reset"}
                  text={textBtn}
                  onClick={onClick}
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default memo(ModalDrafts);
