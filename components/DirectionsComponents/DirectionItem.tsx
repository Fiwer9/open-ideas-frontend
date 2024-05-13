import React, { memo } from "react";
import { ProjectOutlined } from "@ant-design/icons";

import styles from './styles/DirectionItem.module.scss'

interface DirectionItemProps {
    nameDirection: string;
    titleDescr: string;
    textDescr: string;
    titleExperts: string;
    textExperts: string;
    onClickCard: () => void;
}

export default const DirectionItem: React.FC<DirectionItemProps> = memo(({ nameDirection, titleDescr, textDescr, titleExperts, textExperts, onClickCard }) => {
  
    return (
      <>
        <div className={styles.directionItem} onClick={onClickCard}>
            <div className={styles.headerDirectionItem}>
                <ProjectOutlined style={{ fontSize: "150%", color: '#434343CC' }} />
                <p className={styles.nameDirection}>{nameDirection}</p>
            </div>

            <div className={styles.descrDirectionItem}>
                <p className={styles.titleDescr}>{titleDescr}</p>
                <p className={styles.textDescr}>{textDescr}</p>
            </div>

            <div className={styles.expertsList}>
                <p className={styles.titleExperts}>{titleExperts}</p>
                <p className={styles.textExperts}>{textExperts}</p>
            </div>
        </div>
      </>
    );
  });