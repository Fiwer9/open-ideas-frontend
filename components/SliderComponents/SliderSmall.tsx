import React, { memo } from "react";
import { Menu, MenuProps } from "antd";
import {
  BulbOutlined,
  ReconciliationOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, theme } from "antd";
import router from "next/router";

const { Sider } = Layout;
import { useSelector } from "react-redux";

import {
  selectCurrentPage,
  selectMenuIsCollapsed,
} from "../../redux/menuSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import { changeCollapsed, setCurrentPage } from "../../redux/menuSlice/slice";

import styles from "./styles/siderSmall.module.scss";

const items: MenuProps["items"] = [
  {
    label: "Инициативы",
    key: "/queries",
    icon: <BulbOutlined style={{ fontSize: "150%" }} />,
  },
  {
    label: "Пользователи",
    key: "/users",
    icon: <UserOutlined style={{ fontSize: "150%" }} />,
  },
  {
    label: "Организации",
    key: "/organizations",
    icon: <ReconciliationOutlined style={{ fontSize: "150%" }} />,
  },
  {
    label: "Настройки",
    key: "/settings",
    icon: <SettingOutlined style={{ fontSize: "150%" }} />,
  },
];

export const SliderSmall: React.FC = memo(() => {
  const selectedPage = useSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

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
        style={{ background: colorBgContainer }}
        collapsedWidth={"100%"}
        trigger={null}
      >
        <Menu
          mode="horizontal"
          onClick={handleClickItem}
          selectedKeys={selectedPage}
          items={items}
          className="menuSmall"
        ></Menu>
      </Sider>
    </Layout>
  );
});
