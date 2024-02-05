import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import {
  BarChartOutlined,
  BulbOutlined,
  ReconciliationOutlined,
  UserOutlined,
  SettingOutlined,
  PullRequestOutlined,
} from "@ant-design/icons";
import { ArrowBack } from "./ArrowBack";
import { ArrowNext } from "./ArrowNext";
import { Logo } from "../PicturesComponents/Logo";
import { Button, Layout, theme } from "antd";
import router from "next/router";
const { Sider } = Layout;

import styles from "./styles/sider.module.scss";

const menuList = [
  { url: "/queries" },
  { url: "/users" },
  { url: "/organizations" },
  { url: "/directions" },
  { url: "/charts" },
  { url: "/tables" },
  { url: "/settings" },
];

const items: MenuProps["items"] = [
  {
    label: "Инициативы",
    key: "/queries",
    icon: <BulbOutlined style={{ fontSize: "120%" }} />,
  },
  {
    label: "Пользователи",
    key: "/users",
    icon: <UserOutlined style={{ fontSize: "120%" }} />,
  },
  {
    label: "Организации и отделы",
    key: "/organizations",
    icon: <ReconciliationOutlined style={{ fontSize: "120%" }} />,
  },
  {
    label: "Направления",
    key: "/directions",
    icon: <PullRequestOutlined style={{ fontSize: "120%" }} />,
  },
  {
    label: "Аналитика",
    key: "sub1",
    icon: <BarChartOutlined style={{ fontSize: "120%" }} />,
    children: [
      {
        label: "Графики",
        key: "/charts",
      },
      {
        label: "Таблицы",
        key: "/tables",
      },
    ],
  },
  {
    label: "Настройки",
    key: "/settings",
    icon: <SettingOutlined style={{ fontSize: "120%" }} />,
  },
];

export const Slider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className={styles.layout}>
      <Sider
        className={styles.sider}
        width={256}
        style={{
          background: colorBgContainer,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={94}
      >
        {collapsed ? (
          <div className={styles.logoMin}>
            <Logo width={50} height={50} min={collapsed} />
          </div>
        ) : (
          <div className={styles.logo}>
            <Logo width={193} height={50} min={collapsed} />
          </div>
        )}

        <Menu
          mode="inline"
          defaultOpenKeys={["sub1"]}
          onClick={(item) => router.push(item.key)}
          selectedKeys={
            typeof window !== "undefined"
              ? menuList
                  .map((el) => el.url)
                  .filter((el) =>
                    el === "/"
                      ? router.asPath === "/"
                      : router.asPath.includes(el)
                  )
              : ["/queries"]
          }
          items={items}
        ></Menu>
        <Button
          type="text"
          icon={collapsed ? <ArrowBack /> : <ArrowNext />}
          onClick={() => setCollapsed(!collapsed)}
          className={styles.button}
          style={{
            width: 24,
            height: 24,
            position: "absolute",
            top: 37,
            right: -12,
            zIndex: 12,
          }}
        />
      </Sider>
    </Layout>
  );
};
