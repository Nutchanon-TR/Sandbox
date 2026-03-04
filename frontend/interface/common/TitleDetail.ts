import React from "react";

export interface TitleDetail {
    title: string;
    urlPath: string;
    description?: string;
    icon?: React.ReactNode;
    key?: string; // Used for Antd Menu Key
    children?: TitleDetail[]; // For nested sub-menus
}