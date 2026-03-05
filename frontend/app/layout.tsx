'use client'
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "@/components/SideBar";
import LoadingWrapper from "@/context/LoadingContext";
import { LayoutProvider } from "@/context/LayoutContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LayoutProvider>
          <ThemeProvider>
            <LoadingWrapper>
              <Sidebar>
                {children}
              </Sidebar>
            </LoadingWrapper>
          </ThemeProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
