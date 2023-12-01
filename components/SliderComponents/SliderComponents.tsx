import React, { useState } from "react";
import { Menu } from 'antd';
import {
  BarChartOutlined,
  BulbOutlined, ReconciliationOutlined,
  UserOutlined, SettingOutlined, ProjectOutlined,
} from '@ant-design/icons';
import { ArrowBack } from './ArrowBack';
import { ArrowNext } from './ArrowNext';
import {Logo} from "../PicturesComponents/Logo";
import { Button, Layout, theme } from 'antd';
import SubMenu from "antd/lib/menu/SubMenu";
import {
  BarChartOutlined,
  BulbOutlined,
  ReconciliationOutlined,
  UserOutlined,
  SettingOutlined,
  PullRequestOutlined,
} from '@ant-design/icons';
import router from "next/router";
const { Sider } = Layout;

import styles from "./styles/sider.module.scss"


const menuList = [
  { url: "/queries", },
  { url: "/users", },
  { url: "/organizations", },
  { url: "/directions", },
  { url: "/charts", },
  { url: "/tables", },
  { url: "/settings", },
];

export const Slider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}
             width={256}
             style={{
               background: colorBgContainer
             }}
             trigger={null}
             collapsible
             collapsed={collapsed}
             collapsedWidth={94}
      >
        {collapsed? (
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
          defaultOpenKeys={['sub1']}
          onClick={(item) => router.push(item.key)}
          selectedKeys={typeof window !== 'undefined' ? menuList
            .map((el) => el.url)
            .filter((el) =>
              el === "/" ? router.asPath === "/" : router.asPath.includes(el))
            : ['/queries']
        }
        >
          <Menu.Item key={'/queries'} icon={<BulbOutlined style={{ fontSize: '120%' }} />}>Инициативы</Menu.Item>
          <Menu.Item key={'/users'} icon={<UserOutlined style={{ fontSize: '120%' }} />}>Пользователи</Menu.Item>
          <Menu.Item key={'/organizations'} icon={<ReconciliationOutlined style={{ fontSize: '120%' }} />}>Организации и отделы</Menu.Item>
          <Menu.Item key={'/directions'} icon={<PullRequestOutlined style={{ fontSize: '120%' }} />}>Направления</Menu.Item>
          <SubMenu key={'sub1'} icon={<BarChartOutlined style={{ fontSize: '120%' }} />} title={'Аналитика'}>
            <Menu.Item key={'/charts'}>Графики</Menu.Item>
            <Menu.Item key={'/tables'}>Таблицы</Menu.Item>
          </SubMenu>
          <Menu.Item key={'/settings'} icon={<SettingOutlined style={{ fontSize: '120%' }} />}>Настройки</Menu.Item>
        </Menu>
        <Button
          type="text"
          icon={collapsed ? <ArrowBack /> : <ArrowNext />}
          onClick={() => setCollapsed(!collapsed)}
          className={styles.button}
          style={{
            width: 24,
            height: 24,
            position: 'absolute',
            top: 37,
            right: -12,
            zIndex: 12,
          }}
        />
      </Sider>
    </Layout>
  );
};
