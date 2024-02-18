import React, { memo, useEffect } from "react";
import styles from "./styles/Tabs.module.scss";
import { Tag } from "antd";
import router from "next/router";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice/selectors";
import { selectUpdateUser } from "../../redux/usersSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import { fetchCurrentUpdateUser } from "../../redux/usersSlice/asyncActions";
import { changeSelectedTag } from "../../redux/menuSlice/slice";
import { selectSelectedTag } from "../../redux/menuSlice/selectors";
const { CheckableTag } = Tag;

const tagsData = ["Инициативы", "Панель администратора"];

export const Tabs: React.FC = memo(() => {
  const selectedTags = useSelector(selectSelectedTag) as unknown as string[];
  const { user_id } = useSelector(selectCurrentUser);
  const user = useSelector(selectUpdateUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUpdateUser({ user_id }));
  }, []);

  useEffect(() => {
    dispatch(changeSelectedTag(selectedTags));
  }, [selectedTags]);

  const handleChangeTag = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [tag]
      : tagsData.filter((t) => t === tag);
    dispatch(changeSelectedTag(nextSelectedTags[0]));
    Cookies.set("selectedTag", tag);
    tag !== selectedTags[0] && router.push("/queries");
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
            tag === "Панель администратора" && !user.is_staff;

          return (
            <CheckableTag
              key={tag}
              checked={selectedTags.includes(tag)}
              onChange={(checked) => handleChangeTag(tag, checked)}
              style={{
                background: selectedTags.includes(tag)
                  ? "var(--geek-blue-1, #F0F5FF)"
                  : "none",
                pointerEvents: isAdministratorTagDisabled ? "none" : "auto",
                opacity: isAdministratorTagDisabled ? 0.5 : 1,
              }}
              className={styles.tags}
            >
              <p
                style={{
                  color: selectedTags.includes(tag) ? "#2F54EB" : "#434343",
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
