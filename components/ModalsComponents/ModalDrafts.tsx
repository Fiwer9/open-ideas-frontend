import { Form } from "antd";
import { Buttons } from '../ButtonComponent/Button'
import { Logo } from '../PicturesComponents/Logo'

import styles from './styles/Modal.module.scss'
import React from "react";
import FilterCheckboxBar from "../FilterComponents/blocks/FilterCheckboxBar";
import { DeleteOutlined } from "@ant-design/icons";
import { DraftItem } from "../DraftsComponents/DraftItem";

interface ModalProps {
  active: any
  setActive: any
  text: string
  textBtn: string
  onClick: any
  classNameBtn: any
}

const ModalDrafts = ({
                 active,
                 setActive,
                 text,
                 textBtn,
                 onClick,
                 classNameBtn,
               }: ModalProps) => {
  return (
    <>
      {active ? (
        <div className={styles.modal} onClick={() => setActive(false)}>
          <div
            className={styles.modalContentDrafts}
            onClick={e => e.stopPropagation()}
          >
            <Form className={styles.modalForm}>
              <Form.Item className={styles.logo}>
                <Logo width={126.82} height={36} />
              </Form.Item>

              <Form.Item className={styles.modelText}>
                <p className={styles.text}>{text}</p>
              </Form.Item>

              <div className={styles.content}>
                <Form.Item className={styles.nameModal}>
                  <p className={styles.textDrafts}>Черновики сохраняются хх часов. После <br/> этого времени они будут удалены.</p>
                </Form.Item>

                <Form.Item className={styles.contentHeader}>
                  <div className={styles.btnDrafts}>
                    <button className={styles.deleteDrafts}><DeleteOutlined style={{color: '#EC0B4E', fontSize: 21}} /></button>
                    <FilterCheckboxBar checkboxText={"Выбрать все черновики"} />
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
                    type={'reset'}
                    text={textBtn}
                    onClick={onClick}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default ModalDrafts
