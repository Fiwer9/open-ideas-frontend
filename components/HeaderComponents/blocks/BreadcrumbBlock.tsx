import React, { memo, useMemo } from "react";
import { Breadcrumb } from "antd";

import { useRouter } from "next/router";
import Link from "next/link";

import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";

import { getRouteTranslation } from "../../../utils/utils";
import styles from "../styles/Breadcrumb.module.scss";
import {
  selectMenu,
  selectSelectedTag,
} from "../../../redux/menuSlice/selectors";

const getRootHref = (selectedTag: string) => {
  if (selectedTag === "Рейтинг") {
    return "/rating";
  }

  if (selectedTag === "Панель администратора") {
    return "/queries";
  }

  return "/queries";
};

const isQueryDetailPath = (pathname: string) =>
  pathname === "/queries/application" ||
  pathname === "/queries/adminApplication" ||
  pathname === "/queries/editingApplication";

export const BreadcrumbBlock: React.FC = memo(() => {
  const router = useRouter();
  const selectedTag = useSelector(selectSelectedTag);
  const { pageName, pageId } = useSelector(selectMenu);
  const isRatingPage = router.pathname === "/rating";
  const isAdminRatingPage =
    isRatingPage && selectedTag === "Панель администратора";

  const breadcrumbItems: BreadcrumbItemType[] = useMemo(() => {
    if (isRatingPage) {
      return [
        {
          title: (
            <Link href={isAdminRatingPage ? "/queries" : "/rating"}>
              {isAdminRatingPage ? "Панель администратора" : "Рейтинг"}
            </Link>
          ),
        },
        {
          title: "Таблица рейтинга",
        },
      ];
    }

    if (isQueryDetailPath(router.pathname)) {
      return [
        {
          title: <Link href={getRootHref(selectedTag)}>{selectedTag}</Link>,
        },
        {
          title: <Link href="/queries">Таблица инициатив</Link>,
        },
        {
          title: pageName || "Инициатива",
        },
      ];
    }

    const pathSegments = router.asPath.split("/").filter(Boolean);

    return [
      {
        title: <Link href={getRootHref(selectedTag)}>{selectedTag}</Link>,
      },
      ...pathSegments
        .map((segment, index) => {
          const segmentPath = segment.split("?")[0];
          const label = getRouteTranslation(segmentPath, pageName, pageId);

          if (!label) {
            return null;
          }

          const href = `/${pathSegments
            .slice(0, index + 1)
            .join("/")
            .split("?")[0]}`;

          return {
            title: <Link href={href}>{label}</Link>,
          };
        })
        .filter(Boolean) as BreadcrumbItemType[],
    ];
  }, [
    isAdminRatingPage,
    isRatingPage,
    pageId,
    pageName,
    router.asPath,
    router.pathname,
    selectedTag,
  ]);

  if (!router.isReady) {
    return null;
  }

  return (
    <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
  );
});
