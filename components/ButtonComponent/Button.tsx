import React, { memo } from "react";

import styles from "./styles/Button.module.scss";

interface ButtonsProps {
  text: string;
  onClick: () => void;
  type: "button" | "submit" | "reset";
  props?: string;
  className?: string;
  form?: string;
}

export const Buttons: React.FC<ButtonsProps> = memo(
  ({ text, onClick, type, props, className, form }) => {
    return (
      <button
        form={form}
        className={
          props === "disabled"
            ? `${styles.disabledBtn}`
            : `${styles.btn}` + ` ${className ? className : ""} `
        }
        onClick={onClick}
        type={type}
      >
        {text}
      </button>
    );
  }
);
