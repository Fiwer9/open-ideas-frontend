import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import styles from "../styles/Breadcrumb.module.scss";
import {useRouter} from "next/router";
import Link from "next/link";
import {getRouteTranslation} from "../../../utils/utils";
import Cookies from 'js-cookie';

interface BreadcrumbBlockProps {
  items: any;
}

export const BreadcrumbBlock = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter(Boolean);
  const [children, setChildren] = useState(<div></div>)
  const selectedTag = Cookies.get('selectedTag');

  const breadcrumbItems = [
    {
      title: selectedTag,
      link: "",
    },
    ...pathSegments.map((segment, index) => ({
      title: getRouteTranslation(segment),
      link: `/${pathSegments.slice(0, index + 1).join("/")}`,
    })),
  ];
  useEffect(() => {
    setChildren(
      <Breadcrumb className={styles.breadcrumb}>
        {breadcrumbItems.map((item) => (
          <Breadcrumb.Item key={item.link}>
            <Link href={item.link}>{item.title}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
  }, [selectedTag]);

  return (
    children
  );
};
