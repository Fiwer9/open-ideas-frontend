import React from "react";
import styles from "./styles/index.module.scss";

interface MainTextProps {
  text: string
}

export const MainText = ({text} : MainTextProps) => {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>{text}</h1>
    </div>
  )
}
