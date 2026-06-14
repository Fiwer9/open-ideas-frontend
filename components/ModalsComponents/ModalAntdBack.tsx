import React, { memo } from "react";
import { Modal } from "antd";

import { useSelector } from "react-redux";

import Logo from "../PicturesComponents/Logo";
import { Buttons } from "../ButtonComponent/Button";
import { useAppDispatch } from "../../redux/store";
import { selectModelResetState } from "../../redux/modalsSlice/selectors";
import { changeIsModalResetActive } from "../../redux/modalsSlice/slice";

import styles from "./styles/Modal.module.scss";

interface ModalAntdProps {
  form: string;
  text: string;
}

const ModalAntdBack: React.FC<ModalAntdProps> = memo(({ form, text }) => {
  const isModalActive = useSelector(selectModelResetState);
  const dispatch = useAppDispatch();

  const handleOk = () => {
    dispatch(changeIsModalResetActive(false));
  };

  return (
    <Modal
      className={styles.modalForm}
      open={isModalActive}
      title={
        <>
          <div className={styles.logo}>
            <Logo width={126.82} height={36} />
          </div>
          <div className={`${styles.modelText}`}>
            <p>{text}</p>
          </div>
        </>
      }
      onOk={handleOk}
      onCancel={handleOk}
      footer={[
        <div className={styles.btnContainer} key={0}>
          <Buttons
            className={styles.btnWhite}
            key={1}
            form={form}
            type={"button"}
            text={"Назад"}
            onClick={handleOk}
          />
          <Buttons
            className={styles.btnBlue}
            key={2}
            form={form}
            type={"reset"}
            text={"Выйти"}
            onClick={handleOk}
          />
        </div>,
      ]}
    ></Modal>
  );
});

export default ModalAntdBack;
