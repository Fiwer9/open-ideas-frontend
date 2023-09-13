import React, { useState } from 'react';
import { Button, Layout, theme } from 'antd';
const { Sider } = Layout;
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {
    BarChartOutlined,
    BulbOutlined, ReconciliationOutlined,
    UserOutlined, SettingOutlined,
} from '@ant-design/icons';
import { ArrowBack } from './ArrowBack';
import { ArrowNext } from './ArrowNext';
import {Logo} from "../PicturesComponents/Logo";
import styles from "./styles/sider.module.scss"
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items = [
    getItem('Инициативы', '1', <BulbOutlined />),
    getItem('Пользователи', '2', <UserOutlined />),
    getItem('Организации и отделы', '3', <ReconciliationOutlined />),
    getItem('Аналитика', 'sub1', <BarChartOutlined />, [getItem('Графики', '4'), getItem('Таблицы', '5')]),
    getItem('Настройки', '6', <SettingOutlined />)

];

export const Slider = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{borderRight: '1px solid #F0F0F0', maxHeight: '100%'}}>
            <Sider
                width={256}
                style={{
                    background: colorBgContainer,
                    position: 'relative',
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
                    items={items}
                />
                <Button
                    type="text"
                    icon={collapsed ? <ArrowBack /> : <ArrowNext />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        width: 24,
                        height: 24,
                        position: 'absolute', 
                        top: 37,
                        right: -12,
                    }}
                />
            </Sider>
        </Layout>
    );
};
