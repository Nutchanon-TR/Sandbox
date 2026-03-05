'use client'
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "@/components/SideBar";
import LoadingWrapper from "@/context/LoadingContext";
import { LayoutProvider } from "@/context/LayoutContext";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SessionProvider>
          <LayoutProvider>
            <ThemeProvider>
              <LoadingWrapper>
                <Sidebar>
                  {children}
                </Sidebar>
              </LoadingWrapper>
            </ThemeProvider>
          </LayoutProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
