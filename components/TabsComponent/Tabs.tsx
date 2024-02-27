import React, { memo, useEffect } from "react";
import styles from "./styles/Tabs.module.scss";
import { Tag } from "antd";
import router from "next/router";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import { changeSelectedTag } from "../../redux/menuSlice/slice";
import {
  selectIsStaff,
  selectSelectedTag,
} from "../../redux/menuSlice/selectors";
import { fetchUserIsStaff } from "../../redux/menuSlice/asyncActions";
const { CheckableTag } = Tag;

const tagsData = ["Инициативы", "Панель администратора"];

export const Tabs: React.FC = memo(() => {
  const selectedTags = useSelector(selectSelectedTag);
  const { user_id } = useSelector(selectCurrentUser);
  const isStaff = useSelector(selectIsStaff);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserIsStaff({ user_id }));
  }, []);

  const handleChangeTag = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [tag]
      : tagsData.filter((t) => t === tag);
    dispatch(changeSelectedTag(nextSelectedTags[0]));
    sessionStorage.setItem("selectedTag", tag);
    tag !== selectedTags && router.push("/queries");
  };

  useEffect(() => {
    const savedSelectedTag = sessionStorage.getItem("selectedTag");
    if (savedSelectedTag) {
      dispatch(changeSelectedTag(savedSelectedTag));
    }
  }, []);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tagsData.map((tag) => {
          const isAdministratorTagDisabled =
            tag === "Панель администратора" && !isStaff;

          return (
            <CheckableTag
              key={tag}
              checked={tag.includes(selectedTags)}
              onChange={(checked) => handleChangeTag(tag, checked)}
              style={{
                background: tag.includes(selectedTags)
                  ? "var(--geek-blue-1, #F0F5FF)"
                  : "none",
                pointerEvents: isAdministratorTagDisabled ? "none" : "auto",
                opacity: isAdministratorTagDisabled ? 0.5 : 1,
              }}
              className={styles.tags}
            >
              <p
                style={{
                  color: tag.includes(selectedTags) ? "#2F54EB" : "#434343",
                }}
              >
                {tag}
              </p>
            </CheckableTag>
          );
        })}
      </div>
    </div>
  );
});
