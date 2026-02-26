'use client'
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "@/components/SideBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <NavBar />
          <Sidebar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
