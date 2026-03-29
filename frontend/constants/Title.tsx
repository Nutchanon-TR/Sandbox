import React from "react";
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    HomeOutlined,
    TeamOutlined,
    MessageOutlined,
    BuildOutlined,
} from "@ant-design/icons";
import { TitleDetail } from "@/interface/common/TitleDetail";

// 1. Define Sidebar items using the TitleDetail Interface
export const TITLE: Record<string, TitleDetail> = {
    HOME: {
        title: "Home",
        urlPath: "/",
        icon: <HomeOutlined />,
    },
    B_POST: {
        title: "B-Post",
        icon: <DesktopOutlined />,
        subTitles: [
            { title: "Blog", urlPath: "/b-post/blog", key: "BLOG" },
            { title: "Message", urlPath: "/b-post/message", key: "MESSAGE" },
        ],
    },
    DINNER: {
        title: "Dinner",
        icon: <PieChartOutlined />,
        subTitles: [
            { title: "Supplier", urlPath: "/dinner/supplier", key: "SUPPLIER" },
            { title: "Profile", urlPath: "/dinner/profile", key: "PROFILE" },
        ],
    },
    CHAT_APP: {
        title: "Chat App",
        icon: <MessageOutlined />,
        subTitles: [
            { title: "Message", urlPath: "/chat-app/supplier", key: "SUPPLIER" },
            { title: "Social", urlPath: "/chat-app/profile", key: "PROFILE" },
        ],
    },
    PROFILE: {
        title: "Profile",
        urlPath: "/profile",
        icon: <UserOutlined />,
    },
}