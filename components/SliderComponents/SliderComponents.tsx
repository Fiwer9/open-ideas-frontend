import React, { memo } from "react";
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
import {
  selectCurrentPage,
  selectMenuCollapsed,
} from "../../redux/menuSlice/selectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { changeCollapsed, setCurrentPage } from "../../redux/menuSlice/slice";

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

export const Slider: React.FC = memo(() => {
  const collapsed = useSelector(selectMenuCollapsed);
  const selectedPage = useSelector(selectCurrentPage);
  const dispatch = useAppDispatch();
  const updateCollapsed = () => {
    dispatch(changeCollapsed(!collapsed));
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickItem = (item: any) => {
    dispatch(setCurrentPage(item.key));
    router.push(item.key);
  };

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
          onClick={handleClickItem}
          selectedKeys={selectedPage}
          items={items}
        ></Menu>
        <Button
          type="text"
          icon={collapsed ? <ArrowBack /> : <ArrowNext />}
          onClick={updateCollapsed}
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
});
