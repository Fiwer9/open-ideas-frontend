import React, { memo, useEffect, useState } from "react";
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

export const BreadcrumbBlock: React.FC = memo(() => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathSegments = router?.asPath?.split("/")?.filter(Boolean);
  const [children, setChildren] = useState(<></>);
  const selectedTag = useSelector(selectSelectedTag);
  const { pageName, pageId } = useSelector(selectMenu);

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      title: <Link href={""}>{selectedTag}</Link>,
    },
    ...(pathSegments
      ? pathSegments?.map((segment, index) => ({
        title: (
          <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
            {getRouteTranslation(segment, pageName, pageId)}
          </Link>
        ),
      }))
      : []),
  ];

  useEffect(() => {
    setChildren(
      <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
    );
  }, [selectedTag, pageName, pageId]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return children;
});
