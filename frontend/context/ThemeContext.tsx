"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ConfigProvider, theme as antdTheme } from "antd"; // Import ConfigProvider และ theme จาก antd

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* ใช้ ConfigProvider ควบคุม Theme ของ Ant Design ทั้งหมด */}
      <ConfigProvider
        theme={{
          // สลับ Algorithm ระหว่างโหมดมืดและสว่าง
          algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }}
      >
        {/* เรายังสามารถคุมคลาสของ Tailwind ควบคู่ไปด้วยได้ เพื่อจัดการสีพื้นหลังของ Layout หลัก */}
        <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "dark bg-black" : "bg-gray-50"}`}>
          {children}
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};