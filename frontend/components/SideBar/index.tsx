"use client";
import React, { useState } from "react";
import { Layout, Menu, Button, theme as antdTheme, Breadcrumb } from "antd"; // Import theme จาก antd
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SunOutlined,
    MoonOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useTheme } from "@/context/ThemeContext";
import { useLayoutContext } from "@/context/LayoutContext";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Settings", "2", <DesktopOutlined />),
    getItem("Users", "sub1", <UserOutlined />, [
        getItem("Admin", "3"),
        getItem("Member", "4"),
    ]),
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const { breadCrumb } = useLayoutContext();
    const [collapsed, setCollapsed] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = antdTheme.useToken();

    return (
        <Layout className="min-h-screen">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme={theme}
            >
                <Header
                    className="flex items-center justify-center shadow-sm"
                    style={{ padding: 0, background: colorBgContainer }}
                >
                    <div className="flex items-center space-x-2 font-bold text-lg">
                        <PieChartOutlined />
                        <span>SandBox</span>
                    </div>
                </Header>
                <Menu
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                />
            </Sider>

            <Layout>
                <Header
                    className="px-4 shadow-sm flex items-center justify-between transition-colors duration-300"
                    style={{ padding: 0, background: colorBgContainer }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-lg w-12 h-12 flex items-center justify-center transition-colors duration-300"
                    />

                    <Breadcrumb
                        items={breadCrumb}
                        separator=">" // เปลี่ยนตัวคั่น
                        style={{ fontSize: '16px', fontWeight: '500' }} // แต่ง Style พื้นฐาน
                    />

                    <Button
                        type="text"
                        onClick={toggleTheme}
                        icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
                        className="mr-4 text-lg w-12 h-12 flex items-center justify-center transition-colors duration-300"
                    />
                </Header>

                <Content className="m-6 flex flex-col">
                    <div
                        className="p-6 flex-1 shadow-sm transition-colors duration-300"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}