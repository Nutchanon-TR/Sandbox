"use client";
import React, { useState, useEffect } from "react";
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
import { TITLE } from "@/constants/Title";
import { TitleDetail } from "@/interface/common/TitleDetail";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const { breadCrumb, currentTitle } = useLayoutContext();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const savedCollapsed = sessionStorage.getItem("sidebar-collapsed");
        if (savedCollapsed !== null) {
            setCollapsed(JSON.parse(savedCollapsed));
        }
    }, []);

    const handleToggleCollapse = () => {
        setCollapsed((prev) => {
            const newState = !prev;
            sessionStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
            return newState;
        });
    };

    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const { setCurrentTitle } = useLayoutContext();
    const { token: { colorBgContainer, borderRadiusLG } } = antdTheme.useToken();

    const mapTitleDetailToMenuItem = (item: TitleDetail): MenuItem => {
        const labelNode = item.urlPath ? (
            <Link href={item.urlPath} onClick={() => setCurrentTitle([item])}>{item.title}</Link>
        ) : (
            item.title
        );
        return {
            key: item.key || item.urlPath || item.title,
            icon: item.icon,
            label: labelNode,
            children: item.subTitles ? item.subTitles.map(mapTitleDetailToMenuItem) : undefined,
        } as MenuItem;
    };
    const menuItems = Object.values(TITLE).map(mapTitleDetailToMenuItem);

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
                        matchedKey = item.key || item.urlPath || item.title;
                        maxMatchLength = urlPathLower.length;
                    }
                }
                if (item.subTitles) {
                    findKey(item.subTitles);
                }
            }
        };
        findKey(Object.values(TITLE));
        return matchedKey ? [matchedKey] : (menuItems[0]?.key ? [String(menuItems[0].key)] : []);
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
                if (item.subTitles) {
                    findOpenKey(item.subTitles, item.key || item.urlPath || item.title);
                }
            }
        };
        findOpenKey(Object.values(TITLE));
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
                    className="flex items-center justify-center relative"
                    style={{ padding: 0, background: colorBgContainer }}
                >
                    <a href="/">
                        <div className={`flex items-center space-x-2 font-bold text-lg transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            <CodeSandboxOutlined className="text-2xl" />
                            {!collapsed && <span>SandBox</span>}
                        </div>
                    </a>
                    <button
                        onClick={handleToggleCollapse}
                        className={`transition-all duration-300 ease-in-out transform z-50 flex items-center justify-center cursor-pointer absolute ${collapsed
                            ? `-right-5 w-10 h-10 rounded-sm text-sm shadow-md border-none ${theme === 'dark' ? 'bg-[#141414] text-white' : 'bg-white text-black'}`
                            : "right-0 text-sm w-12 h-12 border-none"
                            }`}
                        style={{
                            border: 'none',
                            boxShadow: 'none',
                        }}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </button>
                </Header>
                <Menu
                    theme="light"
                    selectedKeys={getSelectedKeys()}
                    defaultOpenKeys={getOpenKeys()}
                    mode="inline"
                    items={menuItems}
                    onClick={() => {
                        if (collapsed) {
                            setCollapsed(false);
                            sessionStorage.setItem("sidebar-collapsed", JSON.stringify(false));
                        }
                    }}
                />
            </Sider>

            <Layout>
                <Header
                    className={`${collapsed ? 'ml-10' : 'ml-6'} shadow-sm flex items-center justify-between transition-colors duration-300`}
                    style={{ padding: '45px 0', background: colorBgContainer, borderRadius: '10px' }}
                >
                    <div className="ml-6 items-center">
                        <Breadcrumb
                            items={breadCrumb}
                            separator="/"
                            style={{ fontSize: '15px', fontWeight: '500', padding: '0 0 7px 0' }}
                        />
                        <h2 className=" text-xl font-bold uppercase m-0 leading-none">
                            {currentTitle.length > 0 ? currentTitle[currentTitle.length - 1].title : ""}
                        </h2>
                    </div>

                    <Button
                        type="text"
                        onClick={toggleTheme}
                        icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
                        className="mr-4 text-lg w-12 h-12 flex transition-colors duration-300"
                    />
                </Header>
                <Content className={`${collapsed ? 'ml-10' : 'ml-6'} my-6 flex flex-col overflow-auto`}>

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