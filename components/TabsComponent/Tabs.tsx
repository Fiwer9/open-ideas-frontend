import React from "react";
import styles from "./styles/Tabs.module.scss";
import { Tag } from "antd";

const { CheckableTag } = Tag;

const tagsData = ['Инициативы', 'Панель администратора'];

interface TabsProps {
  selectedTags: string[];
  handleChange: any;
  isExpert: boolean;
}

export const Tabs = ({ selectedTags, handleChange, isExpert }: TabsProps) => {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tagsData.map((tag) => {
          const isAdministratorTagDisabled = tag === 'Панель администратора' && !isExpert;

          return (
            <CheckableTag
              key={tag}
              checked={selectedTags.includes(tag)}
              onChange={(checked) => handleChange(tag, checked)}
              style={{
                background: selectedTags.includes(tag) ? 'var(--geek-blue-1, #F0F5FF)' : 'none',
                pointerEvents: isAdministratorTagDisabled ? 'none' : 'auto',
                opacity: isAdministratorTagDisabled ? 0.5 : 1,
              }}
            >
              <p style={{ color: selectedTags.includes(tag) ? '#2F54EB' : '#434343' }}>{tag}</p>
            </CheckableTag>
          );
        })}
      </div>
    </div>
  );
};
