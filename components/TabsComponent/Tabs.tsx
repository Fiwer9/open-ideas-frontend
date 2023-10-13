import React, { useEffect, useState } from "react";
import styles from "./styles/Tabs.module.scss";
import { Tag } from "antd";
import { fetchData } from "../../utils/utils";
import UsersService from "../../services/UsersService";
import { UserResponse } from "../../models/response/UserResponse";
const { CheckableTag } = Tag;

const tagsData = ['Инициативы', 'Панель администратора'];

export const Tabs = () => {
  const [isExpert, setIsExpert] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Инициативы']);
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    fetchData(setUser, UsersService.getCurrentUser, Number(sessionStorage.getItem('user_id')));
  }, []);

  useEffect(() => {
    checkExpertUser();
  }, [user]);

  const checkExpertUser = () => {
    user && user.groups.forEach((group) => {
      setIsExpert(group.name === 'Expert');
    });
  };

  const handleChangeTag = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [tag]
      : selectedTags.filter((t) => t === tag);
    setSelectedTags(nextSelectedTags);
    localStorage.setItem('selectedTag', tag);
  };

  useEffect(() => {
    const savedSelectedTag = localStorage.getItem('selectedTag');
    if (savedSelectedTag) {
      setSelectedTags([savedSelectedTag]);
    }
  }, []);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tagsData.map((tag) => {
          const isAdministratorTagDisabled = tag === 'Панель администратора' && !isExpert;

          return (
            <CheckableTag
              key={tag}
              checked={selectedTags.includes(tag)}
              onChange={(checked) => handleChangeTag(tag, checked)}
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
