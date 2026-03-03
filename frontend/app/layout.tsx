'use client'
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "@/components/SideBar";
import LoadingWrapper from "@/context/LoadingContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <LoadingWrapper>
            <Sidebar>{children}</Sidebar>
          </LoadingWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
