import React from "react";
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import { TitleDetail } from "@/interface/common/TitleDetail";

// 1. Define Sidebar items using the TitleDetail Interface
export const TITLE: Record<string, TitleDetail> = {
    HOME: {
        title: "Home",
        urlPath: "/",
        icon: <HomeOutlined />,
    },
    BLOG: {
        title: "Blog",
        urlPath: "/blog",
        icon: <DesktopOutlined />,
    },
    DASHBOARD: {
        title: "Dashboard",
        icon: <PieChartOutlined />,
        subTitles: [
            { title: "Supplier", urlPath: "/dashboard/supplier", key: "SUPPLIER" },
            { title: "Profile", urlPath: "/dashboard/profile", key: "PROFILE" },
        ],
    },
    MESSAGE: {
        title: "Message",
        urlPath: "/message",
        icon: <UserOutlined />,
    },
    PROFILE: {
        title: "Profile",
        urlPath: "/profile",
        icon: <UserOutlined />,
    },
}