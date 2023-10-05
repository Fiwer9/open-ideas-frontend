import React, {useState} from "react";
import styles from "./styles/Tabs.module.scss";
import {Tag} from "antd";

const { CheckableTag } = Tag;

const tagsData = ['Инициативы', 'Панель администратора'];

export const Tabs = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['Панель администратора']);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [tag]
      : selectedTags.filter((t) => t === tag);
    setSelectedTags(nextSelectedTags);
  };
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tagsData.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
            style={{background: selectedTags.includes(tag)? 'var(--geek-blue-1, #F0F5FF)' : 'none'}}
          >
            <p style={{color: selectedTags.includes(tag)? '#2F54EB' : '#434343'}}>{tag}</p>
          </CheckableTag>
        ))}
      </div>
    </div>
  )
}
