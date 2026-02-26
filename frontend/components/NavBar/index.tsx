"use client";
import { useTheme }  from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <nav style={{ background: theme === "dark" ? "#333" : "#eee" }}>
      <button onClick={toggleTheme}>
        Theme Mode: {theme === "light" ? "Dark" : "Light"}
      </button>
    </nav>
  );
}