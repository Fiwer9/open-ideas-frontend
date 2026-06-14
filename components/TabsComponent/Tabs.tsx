import React, { memo, useEffect } from "react";

import { Tag } from "antd";
import router, { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../redux/authSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import { changeSelectedTag, setCurrentPage } from "../../redux/menuSlice/slice";
import {
  selectIsStaff,
  selectSelectedTag,
} from "../../redux/menuSlice/selectors";
import { fetchUserIsStaff } from "../../redux/menuSlice/asyncActions";

import styles from "./styles/Tabs.module.scss";

const { CheckableTag } = Tag;

const tagsData = ["Инициативы", "Рейтинг", "Панель администратора"];

export const Tabs: React.FC = memo(() => {
  const { pathname } = useRouter();
  const isRatingPage = pathname === "/rating";
  const selectedTags = useSelector(selectSelectedTag);
  const { user_id } = useSelector(selectCurrentUser);
  const isStaff = useSelector(selectIsStaff);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user_id) {
      return;
    }

    dispatch(fetchUserIsStaff({ user_id }));
  }, [dispatch, user_id]);

  const isTagChecked = (tag: string) => {
    if (tag === "Рейтинг") {
      return isRatingPage && selectedTags !== "Панель администратора";
    }
    if (tag === "Панель администратора") {
      return selectedTags === "Панель администратора";
    }
    return selectedTags === "Инициативы" && !isRatingPage;
  };

  const handleChangeTag = (tag: string, checked: boolean) => {
    if (!checked) {
      return;
    }

    if (tag === "Рейтинг") {
      dispatch(changeSelectedTag("Рейтинг"));
      sessionStorage.setItem("selectedTag", "Рейтинг");
      dispatch(setCurrentPage("/rating"));
      router.push("/rating");
      return;
    }

    dispatch(changeSelectedTag(tag));
    sessionStorage.setItem("selectedTag", tag);

    if (tag === "Инициативы") {
      dispatch(setCurrentPage("/queries"));
      if (!pathname.startsWith("/queries")) {
        router.push("/queries");
      }
      return;
    }

    if (tag === "Панель администратора") {
      if (isRatingPage) {
        dispatch(setCurrentPage("/rating"));
      } else {
        dispatch(setCurrentPage("/queries"));
        if (!pathname.startsWith("/queries")) {
          router.push("/queries");
        }
      }
    }
  };

  useEffect(() => {
    const savedSelectedTag = sessionStorage.getItem("selectedTag");

    if (
      savedSelectedTag === "Панель администратора" &&
      !isStaff
    ) {
      dispatch(changeSelectedTag("Инициативы"));
      sessionStorage.setItem("selectedTag", "Инициативы");
      return;
    }

    if (savedSelectedTag) {
      dispatch(changeSelectedTag(savedSelectedTag));
    }
  }, [dispatch, isStaff]);

  useEffect(() => {
    if (isStaff || selectedTags !== "Панель администратора") {
      return;
    }

    dispatch(changeSelectedTag("Инициативы"));
    sessionStorage.setItem("selectedTag", "Инициативы");
  }, [dispatch, isStaff, selectedTags]);

  const visibleTags = tagsData.filter(
    (tag) => tag !== "Панель администратора" || isStaff
  );

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {visibleTags.map((tag) => {
          const checked = isTagChecked(tag);

          return (
            <CheckableTag
              key={tag}
              checked={checked}
              onChange={(nextChecked) => handleChangeTag(tag, nextChecked)}
              style={{
                background: checked
                  ? "var(--geek-blue-1, #F0F5FF)"
                  : "none",
              }}
              className={styles.tags}
            >
              <p
                style={{
                  color: checked ? "#2F54EB" : "#434343",
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
