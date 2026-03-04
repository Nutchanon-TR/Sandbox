import React from "react";
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { TitleDetail } from "@/interface/common/TitleDetail";

// 1. Define Sidebar items using the TitleDetail Interface
export const SIDEBAR_MENU: TitleDetail[] = [
    {
        title: "Blog",
        urlPath: "/blog",
        icon: <DesktopOutlined />,
        key: "Blog",
    },
    {
        title: "Message",
        urlPath: "/message",
        icon: <UserOutlined />,
        key: "Message",
    },
    {
        title: "Dashboard",
        urlPath: "/dashboard",
        icon: <PieChartOutlined />,
        key: "Dashboard",
        children: [
            { title: "Supplier", urlPath: "/dashboard/supplier", key: "Supplier" },
            { title: "Profile", urlPath: "/dashboard/profile", key: "Profile" },
        ],
    },
];
