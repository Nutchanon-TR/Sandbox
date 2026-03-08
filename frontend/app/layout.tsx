'use client'
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "@/components/SideBar";
import LoadingWrapper from "@/context/LoadingContext";
import { LayoutProvider } from "@/context/LayoutContext";
import NavigateGuardProvider from "@/context/NavigateGuardProvider";
import { NotificationProvider } from "@/context/NotificationContext";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SessionProvider>
          <LayoutProvider>
            <ThemeProvider>
              <NotificationProvider>
                <LoadingWrapper>
                  <Sidebar>
                    <NavigateGuardProvider>
                      {children}
                    </NavigateGuardProvider>
                  </Sidebar>
                </LoadingWrapper>
              </NotificationProvider>
            </ThemeProvider>
          </LayoutProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
