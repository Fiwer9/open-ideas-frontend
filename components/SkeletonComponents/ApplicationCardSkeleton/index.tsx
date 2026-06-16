import React from "react";

import cardStyles from "../../QueryComponents/styles/ApplicationCard.module.scss";
import sk from "../shared/skeleton.module.scss";

import styles from "./ApplicationCardSkeleton.module.scss";

const FORM_ROWS = 6;

const ApplicationCardSkeleton = () => (
  <div className={cardStyles.form} aria-hidden>
    <div className={styles.header}>
      <div className={`${styles.logo} ${sk.block} ${sk.pulse}`} />
      <div className={styles.headerActions}>
        <div className={`${styles.like} ${sk.block} ${sk.pulse}`} />
        <div className={`${styles.status} ${sk.block} ${sk.pulse}`} />
      </div>
    </div>

    <div className={cardStyles.col}>
      {Array.from({ length: FORM_ROWS }).map((_, index) => (
        <div key={index} className={cardStyles.row}>
          <div className={`${styles.rowLabel} ${sk.block} ${sk.pulse}`} />
          <div className={`${styles.rowValue} ${sk.block} ${sk.pulse}`} />
        </div>
      ))}

      <div className={`${styles.commentsTitle} ${sk.block} ${sk.pulse}`} />
    </div>

    <div className={styles.textAreaBlock}>
      <div className={`${styles.textAreaTitle} ${sk.block} ${sk.pulse}`} />
      <div className={`${styles.textArea} ${sk.block} ${sk.pulse}`} />
    </div>
  </div>
);

export default ApplicationCardSkeleton;
