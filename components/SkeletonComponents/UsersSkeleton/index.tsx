import React from "react";

import userStyles from "../../UsersComponents/styles/UserCard.module.scss";
import sk from "../shared/skeleton.module.scss";

import styles from "./UsersSkeleton.module.scss";

const UsersSkeleton = () => (
  <div className={userStyles.userContainer} aria-hidden>
    <div className={`${styles.avatar} ${sk.block} ${sk.pulse}`} />

    <div className={userStyles.infUser}>
      <div className={`${styles.name} ${sk.block} ${sk.pulse}`} />

      <div className={userStyles.column}>
        <div className={styles.rows}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={userStyles.row}>
              <div className={`${styles.label} ${sk.block} ${sk.pulse}`} />
              <div className={`${styles.value} ${sk.block} ${sk.pulse}`} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.button} ${sk.block} ${sk.pulse}`} />
    </div>
  </div>
);

export default UsersSkeleton;
