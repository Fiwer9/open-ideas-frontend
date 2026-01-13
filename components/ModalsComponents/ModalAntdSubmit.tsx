import React, { memo } from "react";
import { Modal } from "antd";

import { useSelector } from "react-redux";

import { Buttons } from "../ButtonComponent/Button";
import Logo from "../PicturesComponents/Logo";
import { useAppDispatch } from "../../redux/store";
import { selectModelSubmitState } from "../../redux/modalsSlice/selectors";
import { changeIsModalSubmitActive } from "../../redux/modalsSlice/slice";

import styles from "./styles/Modal.module.scss";

interface ModalAntdProps {
  form: string;
  text: string;
}

const ModalAntdSubmit: React.FC<ModalAntdProps> = memo(({ form, text }) => {
  const isModalActive = useSelector(selectModelSubmitState);
  const dispatch = useAppDispatch();

  const handleOk = () => {
    dispatch(changeIsModalSubmitActive(false));
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
            dataTestId="submit2"
            className={styles.btnBlue}
            key={2}
            form={form}
            type={"submit"}
            text={"Отправить"}
            onClick={handleOk}
          />
        </div>,
      ]}
    ></Modal>
  );
});

export default ModalAntdSubmit;
