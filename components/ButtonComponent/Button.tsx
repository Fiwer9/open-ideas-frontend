import React, { memo } from "react";

import styles from "./styles/Button.module.scss";

interface ButtonsProps {
  text: string;
  onClick: () => void;
  type: "button" | "submit" | "reset";
  props?: string;
}

export const Buttons: React.FC<ButtonsProps> = memo(
  ({ text, onClick, type, props }) => {
    return (
      <button
        className={
          props === "disabled" ? `${styles.disabledBtn}` : `${styles.btn}`
        }
        onClick={onClick}
        type={type}
      >
        {text}
      </button>
    );
  }
);
