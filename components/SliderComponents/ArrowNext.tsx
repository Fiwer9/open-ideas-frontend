import React from "react";

import styles from "./styles/arrows.module.scss";

export const ArrowNext = () => {
  return (
    <div className={styles.circle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M10.25 3.5L5.75 8L10.25 12.5"
          stroke="#222222"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
