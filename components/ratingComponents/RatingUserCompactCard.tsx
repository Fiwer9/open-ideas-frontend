import React, { memo } from "react";
import Image from "next/image";

import { EmployeeRecord } from "./ratingTypes";

import styles from "./styles/RatingList.module.scss";

interface RatingUserCompactCardProps {
  employee: EmployeeRecord;
}

export const RatingUserCompactCard: React.FC<RatingUserCompactCardProps> = memo(
  ({ employee }) => (
    <div className={styles.userCard}>
      <div className={styles.userCardHeader}>
        <div className={styles.userCardAvatar}>
          <Image
            src="/img/AvatarAratrum.svg"
            alt="avatar"
            width={72}
            height={84}
          />
        </div>
        <p className={styles.userCardName}>{employee.employee}</p>
      </div>

      <div className={styles.userCardDivider} />

      <div className={styles.userCardSection}>
        <div className={styles.userCardRow}>
          <span className={styles.userCardLabel}>E-mail:</span>
          <span className={styles.userCardValue}>{employee.email}</span>
        </div>
        <div className={styles.userCardRow}>
          <span className={styles.userCardLabel}>Организация:</span>
          <span className={styles.userCardValue}>{employee.organization}</span>
        </div>
        <div className={styles.userCardRow}>
          <span className={styles.userCardLabel}>Отдел:</span>
          <span className={styles.userCardValue}>{employee.department}</span>
        </div>
      </div>

      <div className={styles.userCardDivider} />

      <div className={styles.userCardSection}>
        <p className={styles.userCardStatsTitle}>Инициативы:</p>
        <div className={styles.userCardRow}>
          <span className={styles.userCardLabel}>Всего:</span>
          <span className={styles.userCardValue}>
            {employee.initiativesSummary.total}
          </span>
        </div>
        <div className={styles.userCardRow}>
          <span className={styles.userCardLabel}>Выполнено:</span>
          <span className={styles.userCardValue}>
            {employee.initiativesSummary.completed}
          </span>
        </div>
        <div className={styles.userCardRow}>
          <span className={styles.userCardLabel}>Отклонено:</span>
          <span className={styles.userCardValue}>
            {employee.initiativesSummary.rejected}
          </span>
        </div>
        <div className={styles.userCardRow}>
          <span className={styles.userCardLabel}>Среднее время реализации:</span>
          <span className={styles.userCardValue}>
            {employee.avgImplementationTime}
          </span>
        </div>
      </div>
    </div>
  )
);

RatingUserCompactCard.displayName = "RatingUserCompactCard";
