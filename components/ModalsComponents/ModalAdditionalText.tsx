import React, { memo } from "react";
import { useSelector } from "react-redux";

import { Button, Modal } from "antd";

import { selectModelSubmitState } from "../../redux/modalsSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import { changeIsModalSubmitActive } from "../../redux/modalsSlice/slice";

import Logo from "../PicturesComponents/Logo";
import { Buttons } from "../ButtonComponent/Button";

import styles from "./styles/Modal.module.scss";

interface ModalAdditionalText {
  text: string;
  additionalText: string;
  buttonText: string;
  handleOk: () => void;
}

const ModalAdditionalText: React.FC<ModalAdditionalText> = memo(
  ({ text, additionalText, handleOk, buttonText }) => {
    const isModalActive = useSelector(selectModelSubmitState);
    const dispatch = useAppDispatch();

    const handleCancel = () => {
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
              <p className={styles.text2}>{additionalText}</p>
            </div>
          </>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className={styles.btnContainer} key={0}>
            <Buttons
              className={styles.btnWhite}
              key={1}
              type={"button"}
              text={"Назад"}
              onClick={handleOk}
            />
            <Button
              className={styles.btnRed}
              key={2}
              htmlType={"submit"}
              onClick={handleOk}
              danger
            >
              {buttonText}
            </Button>
          </div>,
        ]}
      ></Modal>
    );
  }
);

export default ModalAdditionalText;
