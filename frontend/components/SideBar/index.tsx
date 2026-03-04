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
    CodeSandboxOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuProps } from "antd";
import { useTheme } from "@/context/ThemeContext";
import { useLayoutContext } from "@/context/LayoutContext";
import { SIDEBAR_MENU } from "@/constants/Title";
import { TitleDetail } from "@/interface/common/TitleDetail";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const { breadCrumb } = useLayoutContext();
    const [collapsed, setCollapsed] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const { token: { colorBgContainer, borderRadiusLG } } = antdTheme.useToken();

    const mapTitleDetailToMenuItem = (item: TitleDetail): MenuItem => {
        const labelNode = item.children ? (
            item.title
        ) : (
            <Link href={item.urlPath}>{item.title}</Link>
        );
        return {
            key: item.key || item.urlPath,
            icon: item.icon,
            label: labelNode,
            children: item.children ? item.children.map(mapTitleDetailToMenuItem) : undefined,
        } as MenuItem;
    };
    const menuItems = SIDEBAR_MENU.map(mapTitleDetailToMenuItem);

    const getSelectedKeys = () => {
        let matchedKey = "";
        let maxMatchLength = 0;
        const findKey = (items: TitleDetail[]) => {
            if (!items) return;
            for (const item of items) {
                if (item.urlPath) {
                    const pathLower = pathname.toLowerCase();
                    const urlPathLower = item.urlPath.toLowerCase();
                    if (pathLower.startsWith(urlPathLower) && urlPathLower.length > maxMatchLength) {
                        matchedKey = item.key || item.urlPath;
                        maxMatchLength = urlPathLower.length;
                    }
                }
                if (item.children) {
                    findKey(item.children);
                }
            }
        };
        findKey(SIDEBAR_MENU);
        return matchedKey ? [matchedKey] : (menuItems[0]?.key ? [menuItems[0].key as string] : []);
    };

    const getOpenKeys = () => {
        let openKeys: string[] = [];
        const findOpenKey = (items: TitleDetail[], parentKey?: string) => {
            for (const item of items) {
                const pathLower = pathname.toLowerCase();
                // Check if current page is within a sub-menu
                if (item.urlPath && pathLower.includes(item.urlPath.toLowerCase())) {
                    if (parentKey) openKeys.push(parentKey);
                }
                if (item.children) {
                    findOpenKey(item.children, item.key || item.urlPath);
                }
            }
        };
        findOpenKey(SIDEBAR_MENU);
        return openKeys;
    };

    return (
        <Layout className="h-screen">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
            >
                <Header
                    className="flex items-center justify-center shadow-sm"
                    style={{ padding: 0, background: colorBgContainer }}
                >
                    <div className="flex items-center space-x-2 font-bold text-lg text-primary">
                        <CodeSandboxOutlined className="text-2xl text-blue-500" />
                        {!collapsed && <span>SandBox</span>}
                    </div>
                </Header>
                <Menu
                    theme="light"
                    selectedKeys={getSelectedKeys()}
                    defaultOpenKeys={getOpenKeys()}
                    mode="inline"
                    items={menuItems}
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
                        separator=">"
                        style={{ fontSize: '16px', fontWeight: '500' }}
                    />

                    <Button
                        type="text"
                        onClick={toggleTheme}
                        icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
                        className="mr-4 text-lg w-12 h-12 flex items-center justify-center transition-colors duration-300"
                    />
                </Header>

                <Content className="m-6 flex flex-col overflow-auto">
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