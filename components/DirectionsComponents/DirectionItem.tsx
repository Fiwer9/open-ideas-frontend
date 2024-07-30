import React, { memo } from "react";
import { ProjectOutlined } from "@ant-design/icons";

import styles from './styles/DirectionItem.module.scss'
import {DirectionResponse} from "../../models/response/DirectionResponse";
import {UserResponse} from "../../models/response/UserResponse";

interface DirectionItemProps {
    onClickCard: () => void;
    direction: DirectionResponse;
    users: UserResponse[];
}

const DirectionItem: React.FC<DirectionItemProps> = memo(({ onClickCard, direction, users }) => {
    const experts = users.filter((user) => direction.experts.indexOf(user.id) !== -1)
  
    return (
      <>
        <div className={styles.directionItem} onClick={onClickCard}>
            <div className={styles.headerDirectionItem}>
                <ProjectOutlined style={{ fontSize: "150%", color: '#434343CC' }} />
                <p className={styles.nameDirection}>{direction.name}</p>
            </div>

            <div className={styles.descrDirectionItem}>
                <p className={styles.titleDescr}>Описание направления</p>
                <p className={styles.textDescr}>{direction.description}</p>
            </div>

            <div className={styles.expertsList}>
                <p className={styles.titleExperts}>Прикреплённые эксперты</p>
                <p className={styles.textExperts}>{experts && experts.map((expert) => expert.name).join(', ')}</p>
            </div>
        </div>
      </>
    );
  });

  export default DirectionItem;