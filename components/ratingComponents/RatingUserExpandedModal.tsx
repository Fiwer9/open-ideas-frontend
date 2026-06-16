import React, { memo } from "react";
import { Modal, Spin } from "antd";
import Image from "next/image";
import router from "next/router";

import InitiativeCardsPlaceholder from "../SkeletonComponents/InitiativeCardsPlaceholder";

import { EmployeeRecord } from "./ratingTypes";

import styles from "./styles/RatingUserExpandedModal.module.scss";

interface RatingUserExpandedModalProps {
  employee: EmployeeRecord | null;
  open: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

export const RatingUserExpandedModal: React.FC<RatingUserExpandedModalProps> =
  memo(({ employee, open, onClose, isLoading = false }) => {
    if (!employee) {
      return null;
    }

    return (
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={760}
        destroyOnClose
        className={styles.modal}
      >
        <div className={styles.expandedCard}>
          <div className={styles.expandedLeft}>
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
                <span className={styles.userCardValue}>
                  {employee.organization}
                </span>
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
                <span className={styles.userCardLabel}>
                  Среднее время реализации:
                </span>
                <span className={styles.userCardValue}>
                  {employee.avgImplementationTime}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.expandedDivider} />

          <div className={styles.expandedRight}>
            <p className={styles.recentTitle}>Последние 3 инициативы:</p>
            <Spin spinning={isLoading}>
              <div className={styles.initiativesList}>
                {isLoading ? (
                  <InitiativeCardsPlaceholder count={3} />
                ) : (
                  employee.recentInitiatives.map((initiative) => (
                    <div
                      key={initiative.id}
                      className={`${styles.initiativeCard} ${styles.initiativeCardClickable}`}
                      onClick={() => {
                        onClose();
                        router.push(
                          `/queries/application?queryId=${initiative.id}`
                        );
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          onClose();
                          router.push(
                            `/queries/application?queryId=${initiative.id}`
                          );
                        }
                      }}
                    >
                      <p className={styles.initiativeName}>{initiative.title}</p>
                      <p className={styles.initiativeRow}>
                        <span className={styles.initiativeLabel}>Дата:</span>{" "}
                        <span className={styles.initiativeValue}>
                          {initiative.date}
                        </span>
                      </p>
                      <p className={styles.initiativeRow}>
                        <span className={styles.initiativeLabel}>Статус:</span>{" "}
                        <span className={styles.initiativeValue}>
                          {initiative.status}
                        </span>
                      </p>
                    </div>
                  ))
                )}
              </div>
            </Spin>
          </div>
        </div>
      </Modal>
    );
  });

RatingUserExpandedModal.displayName = "RatingUserExpandedModal";
