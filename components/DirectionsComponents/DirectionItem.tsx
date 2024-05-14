import React, { memo } from "react";
import { ProjectOutlined } from "@ant-design/icons";

import styles from './styles/DirectionItem.module.scss'

interface DirectionItemProps {
    onClickCard: () => void;
    directionsInf: {
        nameDirection: string;
        titleDescr: string;
        textDescr: string;
        titleExperts: string;
        textExperts: string;
    }
}

export const DirectionItem: React.FC<DirectionItemProps> = memo(({ onClickCard, directionsInf }) => {
  
    return (
      <>
        <div className={styles.directionItem} onClick={onClickCard}>
            <div className={styles.headerDirectionItem}>
                <ProjectOutlined style={{ fontSize: "150%", color: '#434343CC' }} />
                <p className={styles.nameDirection}>{directionsInf.nameDirection}</p>
            </div>

            <div className={styles.descrDirectionItem}>
                <p className={styles.titleDescr}>{directionsInf.titleDescr}</p>
                <p className={styles.textDescr}>{directionsInf.textDescr}</p>
            </div>

            <div className={styles.expertsList}>
                <p className={styles.titleExperts}>{directionsInf.titleExperts}</p>
                <p className={styles.textExperts}>{directionsInf.textExperts}</p>
            </div>
        </div>
      </>
    );
  });