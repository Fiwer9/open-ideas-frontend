import React, { useState } from 'react';
import { Button, Layout, theme } from 'antd';
const { Sider } = Layout;
import { Menu } from 'antd';
import {
  BarChartOutlined,
  BulbOutlined, ReconciliationOutlined,
  UserOutlined, SettingOutlined, ProjectOutlined,
} from '@ant-design/icons';
import { ArrowBack } from './ArrowBack';
import { ArrowNext } from './ArrowNext';
import {Logo} from "../PicturesComponents/Logo";
import styles from "./styles/sider.module.scss"
import router from "next/router";
import SubMenu from "antd/lib/menu/SubMenu";

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
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
        >
          <Menu.Item key={'1'} icon={<BulbOutlined />} onClick={() => router.push('/queries')}>Инициативы</Menu.Item>
          <Menu.Item key={'2'} icon={<UserOutlined />} onClick={() => router.push('/users')}>Пользователи</Menu.Item>
          <Menu.Item key={'3'} icon={<ReconciliationOutlined />} onClick={() => router.push('/organizations')}>Организации и отделы</Menu.Item>
          <Menu.Item key={'4'} icon={<ProjectOutlined />}>Направления</Menu.Item>
          <SubMenu key={'sub1'} icon={<BarChartOutlined />} title={'Аналитика'}>
            <Menu.Item key={'5'} onClick={() => router.push('/charts')}>Графики</Menu.Item>
            <Menu.Item key={'6'}>Таблицы</Menu.Item>
          </SubMenu>
          <Menu.Item key={'7'} icon={<SettingOutlined />} onClick={() => router.push('/settings')}>Настройки</Menu.Item>
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
