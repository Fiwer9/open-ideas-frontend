import React, { memo, useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import styles from "../styles/Breadcrumb.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { getRouteTranslation } from "../../../utils/utils";
import Cookies from "js-cookie";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";
import { selectSelectedTag } from "../../../redux/menuSlice/selectors";

export const BreadcrumbBlock: React.FC = memo(() => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter(Boolean);
  const [children, setChildren] = useState(<div></div>);
  const selectedTag = useSelector(selectSelectedTag);

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      title: <Link href={""}>{selectedTag}</Link>,
    },
    ...pathSegments.map((segment, index) => ({
      title: (
        <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
          {getRouteTranslation(segment)}
        </Link>
      ),
    })),
  ];

  useEffect(() => {
    setChildren(
      <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
    );
  }, [
    selectedTag,
    Cookies.get("queryName"),
    Cookies.get("userName"),
    Cookies.get("userId"),
  ]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return children;
});
